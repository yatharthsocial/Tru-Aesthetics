export type PortraitView = {
  zoom: number;
  focusX: number;
  focusY: number;
  panX: number;
  panY: number;
  yaw: number;
  pitch: number;
};

export type PortraitRenderer = {
  resize: (width: number, height: number) => void;
  render: (view: PortraitView) => void;
  project: (
    point: { x: number; y: number; depth: number },
    view: PortraitView,
  ) => { x: number; y: number };
  destroy: () => void;
};

const IMAGE_RATIO = 1500 / 1872;
const DEPTH_ORIGIN = 0.45;
const YAW_STRENGTH = 0.13;
const PITCH_STRENGTH = 0.08;
const MAX_PIXEL_RATIO = 2;

const VERTEX_SHADER = `#version 300 es
void main() {
  vec2 corner = vec2(gl_VertexID == 1 ? 3.0 : -1.0, gl_VertexID == 2 ? 3.0 : -1.0);
  gl_Position = vec4(corner, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform sampler2D uColor;
uniform sampler2D uDepth;
uniform vec2 uResolution;
uniform vec2 uOrigin;
uniform vec2 uSize;
uniform vec2 uOffset;
out vec4 fragColor;

void main() {
  vec2 pixel = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y);
  vec2 target = (pixel - uOrigin) / uSize;

  // Take the mip level from the smooth screen mapping. Derivatives of uv jump at
  // the image border, which makes Safari sample a coarse mip there and draw a seam.
  vec2 gradientX = dFdx(target);
  vec2 gradientY = dFdy(target);

  // Solve for the texel that lands on this pixel once pushed along its depth.
  vec2 uv = target;
  for (int i = 0; i < 10; i++) {
    float depth = textureLod(uDepth, uv, 0.0).r;
    uv = mix(uv, target - uOffset * (depth - ${DEPTH_ORIGIN}), 0.65);
  }

  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    fragColor = vec4(0.0);
    return;
  }

  vec4 color = textureGrad(uColor, uv, gradientX, gradientY);

  // Surfaces facing away from the turn fall slightly into shade.
  vec2 step = vec2(0.012);
  vec2 slope = vec2(
    textureLod(uDepth, uv + vec2(step.x, 0.0), 0.0).r - textureLod(uDepth, uv - vec2(step.x, 0.0), 0.0).r,
    textureLod(uDepth, uv + vec2(0.0, step.y), 0.0).r - textureLod(uDepth, uv - vec2(0.0, step.y), 0.0).r
  );
  color.rgb *= 1.0 + dot(slope, uOffset) * 11.0;
  fragColor = color;
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

function loadImage(url: string) {
  const image = new Image();
  image.src = url;
  return image.decode().then(() => image);
}

function createTexture(
  gl: WebGL2RenderingContext,
  unit: number,
  image: HTMLImageElement,
) {
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
}

/** Matches the resting layout of the portrait <Image> in Hero.tsx. */
function restingBox(width: number, height: number) {
  const isDesktop = width >= 1024;
  const imageHeight = height * (isDesktop ? 1.16 : 0.84);
  const imageWidth = imageHeight * IMAGE_RATIO;
  return {
    imageWidth,
    imageHeight,
    left: (width - imageWidth) / 2,
    top: height * (isDesktop ? 0.09 : 0.36),
  };
}

function layout(view: PortraitView, width: number, height: number) {
  const box = restingBox(width, height);
  const sizeX = box.imageWidth * view.zoom;
  const sizeY = box.imageHeight * view.zoom;
  const anchorX = box.left + box.imageWidth * 0.5 + view.panX * width;
  const anchorY = box.top + box.imageHeight * 0.4 + view.panY * height;
  return {
    sizeX,
    sizeY,
    originX: anchorX - view.focusX * sizeX,
    originY: anchorY - view.focusY * sizeY,
    offsetX: view.yaw * YAW_STRENGTH,
    offsetY: view.pitch * PITCH_STRENGTH,
  };
}

export async function createPortraitRenderer(
  canvas: HTMLCanvasElement,
  colorUrl: string,
  depthUrl: string,
): Promise<PortraitRenderer | null> {
  const gl = canvas.getContext("webgl2", { alpha: true, antialias: false });
  if (!gl) return null;

  const [color, depth] = await Promise.all([
    loadImage(colorUrl),
    loadImage(depthUrl),
  ]);

  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);
  gl.bindVertexArray(gl.createVertexArray());

  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  createTexture(gl, 0, color);
  createTexture(gl, 1, depth);

  const uniform = (name: string) => gl.getUniformLocation(program, name);
  gl.uniform1i(uniform("uColor"), 0);
  gl.uniform1i(uniform("uDepth"), 1);
  const uResolution = uniform("uResolution");
  const uOrigin = uniform("uOrigin");
  const uSize = uniform("uSize");
  const uOffset = uniform("uOffset");

  let width = 0;
  let height = 0;
  let pixelRatio = 1;

  return {
    resize(nextWidth, nextHeight) {
      width = nextWidth;
      height = nextHeight;
      pixelRatio = Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      gl.useProgram(program);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    },
    render(view) {
      // Two renderers can share one context (React mounts twice in development), so select ours.
      gl.useProgram(program);
      const { sizeX, sizeY, originX, originY, offsetX, offsetY } = layout(
        view,
        width,
        height,
      );
      gl.uniform2f(uOrigin, originX * pixelRatio, originY * pixelRatio);
      gl.uniform2f(uSize, sizeX * pixelRatio, sizeY * pixelRatio);
      gl.uniform2f(uOffset, offsetX, offsetY);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    project(point, view) {
      const { sizeX, sizeY, originX, originY, offsetX, offsetY } = layout(
        view,
        width,
        height,
      );
      const push = point.depth - DEPTH_ORIGIN;
      return {
        x: originX + (point.x + offsetX * push) * sizeX,
        y: originY + (point.y + offsetY * push) * sizeY,
      };
    },
    destroy() {
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}

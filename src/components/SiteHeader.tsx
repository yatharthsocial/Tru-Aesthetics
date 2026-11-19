import Image from "next/image";
import Link from "next/link";
import SiteMenu from "@/components/SiteMenu";
import logo from "@/logo-true-aesthetics.webp";

/** The logo, and a menu button that opens every section. `base` points the menu's section links back at the home page from other pages. */
export default function SiteHeader({ base = "" }: { base?: string }) {
  return (
    <header className="hero-anim hero-drop absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 pt-5 lg:px-[6%] lg:pt-6">
      <Link href="/">
        <Image
          src={logo}
          alt="Tru Aesthetics"
          priority
          sizes="52px"
          className="h-10 w-auto lg:h-11 xl:h-[52px]"
        />
      </Link>
      <SiteMenu base={base} />
    </header>
  );
}

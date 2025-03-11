import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import AnimatedButton from "../DinoLayout/AnimatedButton";

const Header = () => {
  return (
    <header className="w-full border-b border-[#6d4c41] bg-[#1a120b] shadow-lg shadow-[#8b5e3c]/50">
      <div className="wrapper flex items-center justify-between py-4 px-6">
        <Link href="/" className="w-36">
          <Image 
            src="/assets/images/RexOrg.png" 
            width={90} 
            height={15}
            alt="REX" 
            className="filter brightness-125 sepia-[30%] contrast-125 drop-shadow-[0_0_8px_rgba(255,186,59,0.7)]"
          />
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs text-white">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <MobileNav />
          <SignedOut>
            <AnimatedButton
              width="80px"
              height="35px"
              borderColor="#c99a5b"
              textColor="#e0c28a"
              borderRadius="12px"
              transparent={false}
            >              
              <Link href="/sign-in">LOG IN</Link>
            </AnimatedButton>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header;

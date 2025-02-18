import {   SignInButton,SignedIn,SignedOut,UserButton} from "@clerk/nextjs"
import { Button } from "../ui/button"
import Image from "next/image"
import Link from "next/link"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"

const Header = () => {
    return (
<header className="w-full border-b">
<div className="wrapper flex items-center justify-between">
    <Link href="/" className="w-36">
    <Image src="/assets/images/RexOrg.png"width={90} height={15}
    alt="REX" />
    </Link>

    <SignedIn>
    <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
          </SignedIn>

    <div className="flex w-32 justify-end gap-3">
    <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <MobileNav />
    <SignedOut>
            <Button asChild className="rounded-full" size="sm">
              <Link href="/sign-in">LOG-IN</Link>
              </Button>
            </SignedOut> 
    </div>
</div>
    </header>
     )
}
export default Header
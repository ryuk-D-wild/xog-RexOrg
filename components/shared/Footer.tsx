import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
    <footer className="border-t">
        <div className="flex-center wrapper flex-between flex flex-col text-center sm:flex-row">
            <Link href='/'>
            <Image 
            src="/assets/images/RexOrg.png"
            alt="logo"
            width={80}
            height={10}
            />
            </Link>
            <p style={{ fontSize: "12px", marginTop: "10px" }}>
          © {new Date().getFullYear()} RexOrg. All rights reserved.
        </p>
        </div>
    </footer>
     )
}
export default Footer
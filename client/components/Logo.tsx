import LogoSVG from "@/public/logo.svg"
import Image from "next/image";

const Logo = () => {
  return (
    <Image src={LogoSVG} height={100} width={100} alt="Y" className="bg-white p-4" />
  )
}

export default Logo
import LogoSVG from "@/public/logo.svg"
import Image from "next/image";

const Logo = ({ size }: { size: number }) => {
  return (
    <Image src={LogoSVG} height={10 * size} width={10 * size} alt="Y" className="bg-white p-2" />
  )
}

export default Logo
import Image from "next/image";
import { CustomConnectButton } from "./connect-button";
import ethLogo from '../../assets/header/eth-logo.png'
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-center">
        <div className="flex justify-center items-center bg-customDeepBlue w-[10%] h-[120px] rounded-2xl shadow-sm shadow-customLightBlue mt-2  mr-[1%]">
            <Image src={ethLogo} alt="" width={40} height={40} className="animate-pulse"/>
        </div>
        <div className="h-[120px] w-[35%] bg-customDeepBlue rounded-2xl shadow-sm shadow-customLightBlue mt-2  ">
            <ul className="flex w-[100%] h-[100%] justify-around items-center text-xl font-semibold ">
                <Link href={`/home`} className="hover:text-customSkyBlue transition duration-300">Home</Link>
                <Link href={`/swap`} className="hover:text-customSkyBlue transition duration-300">Contract</Link>
                <Link href={`/dashboard`} className="hover:text-customSkyBlue transition duration-300">Dashboard</Link>
            </ul>
    
        </div>
        <div className="flex flex-row w-[10%] h-[120px] justify-center items-center bg-customDeepBlue rounded-xl shadow-sm shadow-customLightBlue mt-2 ml-[1%]">
            <CustomConnectButton/>
        </div>
    </div>

  );
}

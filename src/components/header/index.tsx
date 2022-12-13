import Image from "next/image";
import { CustomConnectButton } from "./connect-button";
import zroLogo from "../../assets/header/logo.png";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex justify-center items-center bg-gray-200 w-[10%] h-[120px] rounded-2xl shadow-sm shadow-customLightBlue mt-2  mr-[1%] max-sm:hidden">
          <Image
            src={zroLogo}
            alt=""
            width={150}
            height={150}
            className="animate-pulse"
          />
        </div>
        <div className="h-[120px] w-[35%] bg-gray-200 rounded-2xl shadow-sm shadow-customLightBlue mt-2  max-sm:w-[95%] max-sm:mt-0">
          <ul className="flex w-[100%] h-[100%] justify-around items-center text-xl font-semibold max-sm:text-sm max-sm:items-start max-sm:pt-2  max-sm:h-[35%]">
            <Link
              href={`/home`}
              className="hover:text-customGreen transition duration-300 text-slate-800"
            >
              Home
            </Link>
            <Link
              href={`/swap`}
              className="hover:text-customGreen transition duration-300 max-sm:ml-6 text-slate-800"
            >
              Swap
            </Link>
            <Link
              href={`/dashboard`}
              className="hover:text-customGreen transition duration-300 text-slate-800"
            >
              Dashboard
            </Link>          
          </ul>
          <div className="max-sm:flex flex-row sm:hidden  max-sm:items-center  max-sm:justify-center">
            <CustomConnectButton />
          </div>
        </div>

        <div className="flex flex-row w-[10%] h-[120px] justify-center items-center bg-gray-200 rounded-xl shadow-sm shadow-customLightBlue mt-2 ml-[1%] max-sm:hidden">
          <CustomConnectButton />
        </div>
      </div>
    </div>
  );
}

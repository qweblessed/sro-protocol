import Image from "next/image";
import ethLogo from '../../assets/header/eth-logo.png'
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex justify-center ">
        <div className="h-[120px] w-[57%] bg-customDeepBlue rounded-2xl shadow-sm shadow-customLightBlue mt-2 mb-2 ">
            <div className="flex items-center justify-center text-sm mt-[6rem]">
                created by  @qweblessed
            </div>    
        </div>
    </div>

  );
}

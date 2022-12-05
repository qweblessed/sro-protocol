import Head from "next/head";
import Image from "next/image";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function Home() {
  return (
    
      <div className='flex justify-center mt-2 mb-2'>
        <div className='items-center w-[57%] p-5 h-[40rem] bg-customDeepBlue rounded-2xl shadow-sm shadow-customLightBlue mt-2 '>
          <h1 className='text-center text-6xl mt-20'>
            Welcome to <span className="text-customRed">Dapp</span> template
          </h1>    
          <div className='w-[100%]'>
            <ul className='flex flex-row items-center justify-center mt-20'>
              <li className='pt-2 text-2xl text-center bg-customSkyBlue text-slate-900 rounded-tl-2xl rounded-bl-2xl m-2 h-[120px] w-[20%] shadow-lg shadow-slate-600 mt-2 hover:shadow-slate-500 transition durtation-500'>
                Next.js 
                <p className='pt-2 text-xl'>For server-side rendering</p>
              </li>
              <li className='pt-2 text-2xl text-center bg-customSkyBlue text-slate-900 m-2 h-[120px] w-[20%] shadow-lg shadow-slate-600 mt-2 hover:shadow-slate-500 transition durtation-500'>
                Wagmi & Ethers
                <p className='pt-2 text-xl'>For contract interactions</p>
              </li>
              <li className='pt-2 text-2xl text-center bg-customSkyBlue text-slate-900 m-2 h-[120px] w-[20%] shadow-md shadow-slate-600 mt-2 hover:shadow-slate-500 transition durtation-500'>
                Rainbow Kit 
                <p className='pt-2 text-xl'>For connect wallet handling</p>
              </li>
              <li className='pt-2 text-2xl text-center bg-customSkyBlue text-slate-900 rounded-tr-2xl rounded-br-2xl m-2 h-[120px] w-[20%] shadow-lg shadow-slate-600 mt-2 hover:shadow-slate-500 transition durtation-500'>
                Tailwind 
                <p className='pt-2 text-xl'>For styles & animations</p>
              </li>
            </ul>
          </div>
        </div>
    </div>
  );
}

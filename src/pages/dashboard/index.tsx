import Head from "next/head";
import Image from "next/image";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function Dashboard() {
  return (
 
      <div className='flex justify-center mt-2 mb-2 '>
        <div className='items-center w-[57%] p-5 h-[40rem] bg-customDeepBlue rounded-2xl shadow-xl shadow-slate-900 mt-2 hover:shadow-fuchsia-200 transition duration-500 '>
          <h1 className='text-center text-6xl'>
            Welcome to <span className="text-customRed">Dashboard</span> Page
          </h1>        
        </div>
      </div>
    
  );
}

export default function Home() {
  return (
    
      <div className='flex justify-center mt-2 mb-2'>
        <div className='items-center w-[57%] p-5 h-[40rem] bg-gray-200	rounded-2xl shadow-sm shadow-customLightBlue mt-2 max-sm:w-[95%]'>
          <h1 className='text-center text-6xl mt-20 text-slate-900  max-sm:text-4xl max-sm: mt-10'>
            Welcome to <span className="text-customGreen underline">Protocol ZERO</span>
          </h1>     
          <p className="text-center mt-10 pl-[20%] pr-[20%] text-slate-800 font-semibold max-sm:pl-[2%] max-sm:pr-[2%] max-sm:text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium aperiam eum impedit perspiciatis quas facere dolores suscipit perferendis, odit quod?</p>
          <div className='w-[100%]'>
            <ul className='flex flex-row items-center justify-center mt-10 max-sm:mt-10'>
              <li className='pt-2 text-2xl text-center bg-slate-800 text-customGreen rounded-tl-2xl rounded-bl-2xl m-2 h-[120px] w-[20%] shadow-lg shadow-slate-600 mt-2 hover:shadow-slate-500 transition durtation-500 max-sm:text-sm'>
                Lorem, ipsum.
                <p className='pt-2 text-xl  max-sm:text-xs max-sm:pt-0'>Lorem, ipsum dolor.</p>
              </li>
              <li className='pt-2 text-2xl text-center bg-slate-800 text-customGreen m-2 h-[120px] w-[20%] shadow-lg shadow-slate-600 mt-2 hover:shadow-slate-500 transition durtation-500  max-sm:text-sm'>
               Lorem, ipsum.
                <p className='pt-2 text-xl max-sm:text-xs max-sm:pt-0'>Lorem, ipsum dolor.</p>
              </li>
              <li className='pt-2 text-2xl text-center bg-slate-800 text-customGreen m-2 h-[120px] w-[20%] shadow-md shadow-slate-600 mt-2 hover:shadow-slate-500 transition durtation-500  max-sm:text-sm'>
              Lorem, ipsum.
                <p className='pt-2 text-xl max-sm:text-xs max-sm:pt-0'>Lorem, ipsum dolor.</p>
              </li>
              <li className='pt-2 text-2xl text-center bg-slate-800 text-customGreen rounded-tr-2xl rounded-br-2xl m-2 h-[120px] w-[20%] shadow-lg shadow-slate-600 mt-2 hover:shadow-slate-500 transition durtation-500  max-sm:text-sm'>
              Lorem, ipsum.
                <p className='pt-2 text-xl max-sm:text-xs max-sm:pt-0'>Lorem, ipsum dolor.</p>
              </li>
            </ul>
          </div>
        </div>
    </div>
  );
}

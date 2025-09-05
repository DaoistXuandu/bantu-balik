'use client'
import { useEffect, useState } from "react";
import { lato, noto_sans, nunito, poppins } from "../lib/utilities/font";
import { apps_name } from "@/config/data";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div>
      <div className="fixed h-24 w-full z-999 text-black p-6 mt-6 pl-12 pr-12 flex flex-row">
        <div className="h-full w-full flex flex-row justify-center md:justify-between items-center">
          <div className="h-full flex flex-row items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-10 aspect-square" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            <p className={`${poppins.className} text-2xl text-green-800`}>
              {apps_name}
            </p>
          </div>
          <div className={`hidden md:flex ${nunito.className} text-gray-500 flex-row md:gap-10 lg:gap-18 md:text-lg lg:text-xl items-center pr-12 cursor-pointer`}>
            <a href="/about" className="relative inline-block after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full hover:text-green-600 after:bg-green-200 hover:scale-105 transition-all">Tentang Kami</a>
            <a href="/merchants" className="relative inline-block after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full hover:text-green-600 after:bg-green-200 hover:scale-105 transition-all">Cek Toko</a>
            <a href="/login" className="relative inline-block after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full hover:text-green-600 after:bg-green-200 hover:scale-105 transition-all">Login</a>
          </div>
        </div>
      </div >
      <div className="relative min-h-screen max-h-screen bg-white text-black flex flex-row items-center overflow-hidden">
        <div className="hidden md:flex absolute z-10 w-2/3 items-center justify-center">
          <img className="w-full aspect-square" src="./assets/security-bw.svg" alt="Description of the SVG">
          </img>
        </div>
        <div className={`absolute w-full justify-center md:w-2/4 flex flex-col p-10 md:pl-0 md:pr-24 gap-10 right-0 ${noto_sans.className}`}>
          <div className={`relative z-50 flex flex-col gap-6 ${loaded ? '' : 'opacity-0'} transition duration-1000 ease-in-out`}>
            <div className="flex flex-col text-3xl md:text-4xl lg:text-6xl font-bold">
              <div>Mau <b className="text-white bg-green-950 pr-2 pl-2">Refund?</b></div>
              <div className="mt-3"><b className="text-white bg-green-950 pr-2 pl-2">{apps_name}</b> Aja!</div>
            </div>
            <p className="text-xl text-gray-600">
              Proses refund jadi lebih cepat, mudah, dan aman bersama {apps_name}.
              Tinggal lapor, kami yang urus sampai tuntas!
            </p>
          </div>
          <a href="/merchants" className={`${lato.className} relative md:z-999 lg:z-0 overflow-hidden transition-all duration-400 hover:scale-95 cursor-pointer p-6 md:text-xl lg:text-2xl font-bold text-white gap-5 ${loaded ? 'shadow-2xl' : ''}`}>
            <div className="relative z-999 flex flex-row justify-between items-center">
              <p>Coba Gratis - Masuk Toko!</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </div>
            <span
              className={`absolute z-0 left-0 top-0 h-full bg-green-500 duration-1000 ease-in-out ${loaded ? 'w-full' : 'w-0'
                }`}
            ></span>
          </a>
        </div>
      </div>
    </div >
  )
}
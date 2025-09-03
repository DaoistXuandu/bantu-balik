'use client'

import { poppins } from "@/lib/font"

export default function ItemNavbar({ profile }: { profile: boolean }) {
    return (
        <div className="relative h-24 w-full h-fit z-999 text-black pb-3 pt-6 pl-12 pr-12 flex flex-row items-center border border-b-1 border-gray-300">
            <div className="h-full w-full flex flex-row justify-between items-center gap-10">
                <a href="/" className="h-full flex flex-row items-center gap-2 w-1/4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-10 h-full aspect-square" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                    <p className={`${poppins.className} text-xl text-green-800`}>
                        BantuBalik.ai
                    </p>
                </a>
                <div className="w-3/4 flex flex-row gap-5 items-center">
                    <div className="w-full flex justify-end">
                        <a href="/profile" className="h-fit w-fit rounded-full p-3 bg-green-700 hover:scale-105 cursor-pointer">
                            {
                                profile ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="white" className={`size-6`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                            }
                        </a>
                    </div>
                </div>
            </div>
        </div >
    )
}
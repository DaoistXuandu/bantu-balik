'use client'

import { apps_name } from "@/config/data"
import { poppins } from "@/lib/utilities/font"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie';

export default function ItemNavbar({ profile }: { profile: boolean }) {
    const router = useRouter()
    function handleOut() {
        Cookies.remove("username")
        Cookies.remove("status")
        router.push("/login")
    }

    return (
        <div className="relative h-24 w-full h-fit z-999 text-black pb-3 pt-6 pl-12 pr-12 flex flex-row items-center border border-b-1 border-gray-300">
            <div className="h-full w-full flex flex-row justify-between items-center gap-10">
                <a href="/" className="h-full flex flex-row items-center gap-2 w-1/4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-10 h-full aspect-square" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                    <p className={`${poppins.className} text-xl text-green-800`}>
                        {apps_name}
                    </p>
                </a>
                <div className="flex flex-row gap-5 items-center justify-end">
                    <div className="flex flex-row justify-end w-1/6 gap-5">
                        <div onClick={handleOut} className="cursor-pointer h-fit w-fit rounded-full p-3 bg-green-700 hover:scale-105 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="white" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                            </svg>
                        </div>
                        <a href="/profile" className="flex justify-end">
                            <div className="h-fit w-fit rounded-full p-3 bg-green-700 hover:scale-105 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div >
    )
}
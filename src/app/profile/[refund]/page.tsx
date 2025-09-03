'use client'
import Chat from "@/components/chat";
import ItemNavbar from "@/components/item-navbar";
import Refund from "@/components/refund";
import { refund_data } from "@/config/data";
import { noto_sans, nunito } from "@/lib/font";
import { useState } from "react";

export default function RefundItem() {
    const [process, setProcess] = useState(true)
    const [valid, setValid] = useState(true)

    return (
        <div className="min-h-screen max-h-fit bg-gray-100">
            <ItemNavbar profile={true} />
            <div className="relative text-black flex flex-row pl-24 pr-24 mt-10 gap-5">
                <div className={`w-3/12 bg-white p-5 shadow-lg rounded-md flex flex-col gap-3 ${nunito.className}`}>
                    <img src={refund_data[0].image_main} className="rounded-md" alt="" />
                    <div className="text-sm">{refund_data[0].caption}</div>
                </div>
                <div className="relative w-9/12 relative flex flex-col gap-2">
                    <img className="ml-12 max-w-32 rounded-md" src={refund_data[0].image_refund} alt="" />
                    <Chat left={true} desc={refund_data[0].description} />
                    <Chat left={false} desc={refund_data[0].description} />
                    <Chat left={true} desc={refund_data[0].description} />
                </div>
            </div>
            <div className="text-black absolute bottom-10 flex flex-row pl-24 pr-24 flex flex-row w-full gap-5">
                <div className="w-3/12 flex flex-row gap-5 items-center">
                    <div className="border-2 bg-white border-red-500 p-3 shadow-lg pl-4 pr-4 font-thin text-red-500 rounded-full">Tolak Refund</div>
                    <div className="font-bold text-white bg-green-700 p-3 shadow-lg pl-4 pr-4 rounded-full">Refund Selesai</div>
                </div>
                <div className="w-9/12 flex flex-row justify-between p-3 bg-white rounded-full pl-8 gap-5 items-center shadow-xl">
                    <input type="text" placeholder="Ketik pesan anda disini!" className="w-full focus:outline-none" />
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </div>
                </div>
            </div>
        </div >
    )
}
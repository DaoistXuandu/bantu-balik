'use client'

import { noto_sans } from "@/lib/font"

export default function Merchant({ image, name, city, id }: MerchantProps) {
    return (
        <div className="flex h-full flex-row p-6 rounded-lg border border-1 border-gray-300 shadow-lg w-fit gap-6 min-w-100">
            <img src={image} className="h-32 aspect-square rounded-full"></img>
            <div className={`${noto_sans.className} flex flex-col text-black justify-center`}>
                <div className="flex flex-row items-center justify-between">
                    <div className="font-bold text-xl">{name}</div>
                </div>
                <div className="font-semibold text-gray-400 text-sm">{city}</div>
                <a href={`/merchants/${id}`} className="flex flex-row mt-4 w-full">
                    <div className="w-full bg-green-600 text-white font-bold p-2 pl-12 pr-12 hover:scale-105 cursor-pointer text-md rounded-lg text-center">Cek Toko</div>
                </a>
            </div>
        </div>
    )
}
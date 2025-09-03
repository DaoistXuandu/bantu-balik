'use client'

import { noto_sans } from "@/lib/font"

export default function StoreBanner({ name, place, total_of_refund, image }: { name: string, place: string, total_of_refund: number, image: string }) {
    return (
        <div className="w-full bg-white text-black inset-shadow-xs p-5 shadow-md rounded-lg flex flex-row gap-5">
            <img src={image} className="h-32 aspect-square rounded-full"></img>
            <div className={`w-full flex flex-row items-center justify-between ${noto_sans.className}`}>
                <div className="flex flex-col">
                    <div className="font-bold text-3xl text-green-700">{name}</div>
                    <div className="text-md">{place}</div>
                </div>
                <div className="flex flex-row h-full items-center justify-center gap-5">
                    <div className="text-4xl text-gray-300">|</div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="font-bold text-2xl">{total_of_refund}</div>
                        <div className="font-thin text-sm">Total Refund</div>
                    </div>
                </div>
            </div>
        </div >
    )
}
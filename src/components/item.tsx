'use client'

import { noto_sans } from "@/lib/font"
import { useParams } from "next/navigation"
import { useEffect } from "react"

export default function Item({ status, image, description, price, id }:
    {
        status: string,
        image: string,
        description: string,
        price: string,
        id: string
    }) {

    const params = useParams()

    return (
        <a href={`./${params.id}/${id}`} className="hover:scale-95 w-44 inset-shadow-sm shadow-md text-black rounded-md overflow-hidden">
            <img src={image} className="w-full aspect-square" alt="" />
            <div className={`${noto_sans.className} p-3 flex flex-col gap-2 `}>
                <div className="line-clamp-2 text-sm">{description}</div>
                <div>
                    <div className="font-bold">Rp {price}</div>
                    <div className={`${status == "false" ? 'hidden' : ''} w-full mt-3 text-center text-sm bg-green-700 rounded-md font-bold text-white p-1`}>Refund</div>
                </div>
            </div>
        </a>
    )
} 
'use client'

import { noto_sans } from "@/lib/font"
import { useRouter } from "next/navigation"

export default function ManualAdd({ id }: { id: string }) {
    const router = useRouter()

    return (
        <button onClick={e => router.push(`./${id}/refund`)} className="hover:scale-95 w-44 text-black rounded-md overflow-hidden flex items-center border-1 border-dashed border-gray-500" >
            <div className={`${noto_sans.className} p-5 flex flex-col gap-5 w-full items-center justify-center`}>
                <div className="w-full aspect-square bg-gray-200 flex items-center justify-center p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-full aspect-square">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
                <div className="text-xs">Produk belum ditambahkan penjual? Refund barang disini!</div>
            </div>
        </button >
    )
} 
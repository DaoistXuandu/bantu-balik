'use client'

import { noto_sans } from "@/lib/font"

export default function Refund({ status, image_main, image_review, user, merchant, caption }: {
    image_main: string,
    image_review: string,
    user: string,
    merchant: string,
    caption: string,
    status: string
}) {
    return (
        <div className={`w-full p-3 bg-gray-100 rounded-sm inset-shadow-sm flex flex-row gap-2 ${noto_sans.className}`}>
            <div className="w-10/12 flex flex-row gap-3 items-center">
                <img src={image_main} className="size-24 rounded-sm" alt="" />
                <img src={image_review} className="size-24 rounded-sm" alt="" />
                <div className="flex flex-col items-start justify-start">
                    <div className="font-semibold text-lg text-gray-900">
                        {
                            status == "false" ? user : merchant
                        }
                    </div>
                    <div className="text-gray-700 text-sm leading-relaxed">
                        {caption}
                    </div>
                </div>
            </div>
            <div className="w-2/12 flex flex-col items-center justify-center p-3 gap-3">
                <div className="p-1 bg-green-700 font-bold text-white w-full text-center rounded-md text-md">Lihat Detail</div>
                <div className="w-full font-bold text-center border-2 border-red-500 text-red-500 text-sm p-1 rounded-sm">Spam?</div>
            </div>
        </div>
    )
}
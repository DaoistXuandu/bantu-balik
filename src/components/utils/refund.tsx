'use client'

import { noto_sans } from "@/lib/utilities/font"
export default function Refund({ unreadMessages, lastUpdateAt, id, isSearchProcess, isAlreadyDone, verdict, isValid, isUser, image_main, image_review, user, merchant, caption }: {
    image_main: string,
    image_review: string,
    user: string,
    merchant: string,
    caption: string,
    verdict: string,
    id: string,
    lastUpdateAt: string,
    unreadMessages: number,

    isUser: boolean,
    isValid: boolean,
    isSearchProcess: boolean,
    isAlreadyDone: boolean
}) {
    function check() {
        if (isUser) {
            if (isSearchProcess) {
                return !isAlreadyDone
            }
            else {
                if (!isAlreadyDone)
                    return false
                if (isValid) {
                    return verdict.toLocaleLowerCase() == "valid"
                }
                else {
                    return verdict.toLocaleLowerCase() != "valid"
                }
            }
        }
        else {
            if (isSearchProcess) {
                if (isAlreadyDone)
                    return false
                else {
                    if (isValid) {
                        return verdict.toLocaleLowerCase() == "valid"
                    }
                    else {
                        return verdict.toLocaleLowerCase() != "valid"
                    }
                }
            }
            else {
                if (!isAlreadyDone)
                    return false
                else {
                    if (isValid) {
                        return verdict.toLocaleLowerCase() == "valid"
                    }
                    else {
                        return verdict.toLocaleLowerCase() != "valid"
                    }
                }
            }
        }
    }

    function convertDate(isoString: string) {
        const date = new Date(isoString);

        const humanReadable = date.toLocaleString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });

        return humanReadable
    }

    return (
        <div className={`${check() ? '' : 'hidden'} w-full p-3 bg-gray-100 rounded-sm inset-shadow-sm flex flex-col md:flex-row gap-2 ${noto_sans.className}`}>
            <div className="w-10/12 flex flex-col md:flex-row gap-3 md:items-center">
                <img src={image_main} className="size-24 rounded-sm" alt="" />
                <img src={image_review} className="size-24 rounded-sm" alt="" />
                <div className="flex flex-col items-start justify-start">
                    <div className="font-bold text-xl text-gray-900">
                        {
                            !isUser ? user : merchant
                        }
                    </div>
                    <div className="text-sm font-thin">{
                        convertDate(lastUpdateAt)
                    }</div>
                    <div className="text-gray-700 text-sm leading-relaxed">
                        {caption}
                    </div>
                </div>
            </div>
            <div className="w-full md:w-2/12 flex flex-col items-center justify-center mt-5 md:mt-0 md:p-3 gap-3 cursor-pointer hover:scale-95">
                <a
                    href={`/profile/${id}`}
                    className="relative cursor-pointer p-2 bg-green-700 font-bold text-white w-full text-center rounded-sm text-md shadow-md"
                >
                    {/* Badge */}
                    <div className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-fit aspect-square p-1 pl-3 pr-3 flex items-center justify-center ${unreadMessages ? '' : 'hidden'}`}>
                        {unreadMessages}
                    </div>

                    Lihat Detail
                </a>
            </div>
        </div>
    )
}
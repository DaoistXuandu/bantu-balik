'use client'

import { noto_sans } from "@/lib/utilities/font"
import { useEffect } from "react"
export default function Refund({ lastUpdateAt, id, isSearchProcess, isAlreadyDone, verdict, isValid, isUser, image_main, image_review, user, merchant, caption }: {
    image_main: string,
    image_review: string,
    user: string,
    merchant: string,
    caption: string,
    verdict: string,
    id: string,
    lastUpdateAt: string;

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
                return isAlreadyDone
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

    useEffect(() => {
        console.log(id)
    }, [])

    return (
        <div className={`${check() ? '' : 'hidden'} w-full p-3 bg-gray-100 rounded-sm inset-shadow-sm flex flex-row gap-2 ${noto_sans.className}`}>
            <div className="w-10/12 flex flex-row gap-3 items-center">
                <img src={image_main} className="size-24 rounded-sm" alt="" />
                <img src={image_review} className="size-24 rounded-sm" alt="" />
                <div className="flex flex-col items-start justify-start">
                    <div className="font-bold text-xl text-gray-900">
                        {
                            !isUser ? user : merchant
                        }
                    </div>
                    <div className="text-md font-thin">{
                        convertDate(lastUpdateAt)
                    }</div>
                    <div className="text-gray-700 text-sm leading-relaxed">
                        {caption}
                    </div>
                </div>
            </div>
            <div className="w-2/12 flex flex-col items-center justify-center p-3 gap-3 cursor-pointer hover:scale-95">
                <a href={`/profile/${id}`} className="cursor-pointer p-2 bg-green-700 font-bold text-white w-full text-center rounded-sm text-md">
                    Lihat Detail
                </a>
            </div>
        </div>
    )
}
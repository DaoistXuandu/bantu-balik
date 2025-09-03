'use client'
import ItemNavbar from "@/components/item-navbar";
import Refund from "@/components/refund";
import { noto_sans, nunito } from "@/lib/font";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { merchant } from "@/config/data";

export default function Profile() {
    const params = useParams()
    const [processData, setProcessData] = useState(true)
    const [valid, setValid] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [refunds, setRefunds] = useState<RefundInterface[]>([])

    async function getAllRefunds() {
        let id = Cookies.get("username")
        let status = Cookies.get("status")
        let response;

        if (status == "true") {
            response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/item-refund`, {
                method: "PATCH",
                body: JSON.stringify({
                    user_id: id,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(data => data.json())
                .then(response => response)
        }
        else {
            response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/item-refund`, {
                method: "PATCH",
                body: JSON.stringify({
                    merchant_id: id,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(data => data.json())
                .then(response => response)

        }

        if (response.status) {
            console.log(response)
            setRefunds(response.refund)
        }
    }

    useEffect(() => {
        getAllRefunds()
        setLoaded(true)
    }, [loaded])

    return (
        <div className="min-h-screen max-h-fit bg-gray-100 pb-10">
            <ItemNavbar profile={true} />
            <div className="text-black flex flex-col pl-24 pr-24 mt-10">
                <div className={`z-99 ${noto_sans.className} text-black flex flex-row pl-10 cursor-pointer`}>
                    <div onClick={e => setProcessData(true)} className={`p-4 flex ${processData ? "bg-white shadow-[inset_0_0.3px_0.5px_rgba(0,0,0,0.6)] text-green-700 rounded-t-sm" : "text-green-700"} font-bold`}>Dalam Proses</div>
                    <div onClick={e => setProcessData(false)} className={`p-4 flex ${!processData ? "bg-white shadow-[inset_0_0.3px_0.5px_rgba(0,0,0,0.6)]  text-green-700 rounded-t-sm" : "text-green-700"} font-bold`}>Selesai</div>
                </div>
                <div className="z-0 bg-white shadow-sm rounded-md">
                    <div className="p-5 flex flex-col gap-3">
                        <div className={`cursor-pointer flex flex-row ${noto_sans.className} gap-2`}>
                            <div onClick={e => setValid(true)} className={`${valid ? "text-white bg-gray-500 font-bold" : "text-black"} p-2 pl-4 pr-4 text-md rounded-xl`}>Valid</div>
                            <div onClick={e => setValid(false)} className={`${!valid ? "text-white bg-gray-500 font-bold" : "text-black"} p-2 pl-4 pr-4 text-md rounded-xl`}>Tidak Valid</div>
                        </div>
                        {
                            refunds.map(refund => (
                                <Refund
                                    status={Cookies.get("status") as string}
                                    user={refund.user}
                                    merchant={refund.merchant}
                                    caption={refund.caption}
                                    image_main={refund.main}
                                    image_review={refund.review}
                                    key={refund.id} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}
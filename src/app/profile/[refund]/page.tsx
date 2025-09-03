'use client'
import ItemNavbar from "@/components/item-navbar";
import { nunito } from "@/lib/font";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RealtimeChat } from '@/components/realtime-chat'
import Cookies from 'js-cookie';

export default function RefundItem() {
    const [loaded, setLoaded] = useState(false)
    const [refund, setRefund] = useState<RefundSingleInteraface>()
    const [item, setItem] = useState<ItemInterface>()
    const params = useParams()

    async function updateRefund(verdict: boolean) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/update-refund`, {
            method: "PATCH",
            body: JSON.stringify({
                id: params.refund,
                verdict: verdict
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(data => data.json())
            .then(response => response)
    }

    async function getRefund() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/get-refund`, {
            method: "PATCH",
            body: JSON.stringify({
                id: params.refund,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(data => data.json())
            .then(response => response)

        if (response.status) {
            setRefund(response.refund)
            fetch(`${process.env.NEXT_PUBLIC_HOST}/api/item`, {
                method: "PATCH",
                body: JSON.stringify({
                    item_id: response.refund.item_id,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(data => data.json())
                .then(response => setItem(response.item))
        }
    }

    useEffect(() => {
        getRefund()
        setLoaded(true)
    }, [loaded])

    return (
        <div className="min-h-screen max-h-fit bg-gray-100">
            <ItemNavbar profile={true} />
            <div className="text-black flex flex-row pl-24 pr-24 mt-10 gap-5 h-full">
                <div className={`w-3/12 h-fit flex flex-col gap-3 ${nunito.className}`}>
                    <div className="flex flex-col gap-3 bg-white p-5 shadow-lg rounded-md">
                        <img src={item?.image} className="rounded-md" alt="" />
                        <div className="text-sm">{item?.name}</div>
                        <div className={`${item != null ? '' : 'hidden'} text-sm font-bold`}>Rp {item?.price}</div>
                    </div>
                    <div className="w-full flex flex-row gap-5 items-center justify-between">
                        <div onClick={e => updateRefund(false)} className="w-1/2 text-center cursor-pointer hover:scale-95 border-2 bg-white border-red-500 p-3 shadow-lg pl-4 pr-4 font-thin text-red-500 rounded-md">Tolak Refund</div>
                        <div onClick={e => updateRefund(true)} className="w-1/2 text-center cursor-pointer hover:scale-95 font-bold text-white bg-green-700 p-3 shadow-lg pl-4 pr-4 rounded-md">Refund Selesai</div>
                    </div>
                </div>
                <div className="relative w-9/12 relative flex flex-col gap-2 h-full">
                    <img className="ml-12 max-w-32 rounded-md" src={refund?.review_image} alt="" />
                    <RealtimeChat roomName={params.refund as string} username={Cookies.get('username') as string} />
                </div>
            </div>
        </div >
    )
}
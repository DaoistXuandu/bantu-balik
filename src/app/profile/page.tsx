'use client'
import ItemNavbar from "@/components/navbar/item-navbar";
import Refund from "@/components/utils/refund";
import { noto_sans } from "@/lib/utilities/font";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useListenerDB } from "@/hooks/use-update-history";
import { getMessagesByUser } from "@/lib/messages/get-messages-user";

export default function Profile() {
    const [processData, setProcessData] = useState(true)
    const [valid, setValid] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [refunds, setRefunds] = useState<RefundInterface[]>([])
    const [user, setUser] = useState(false)
    const [unreads, setUnreads] = useState<{ [key: string]: number }>({});
    const [currentUser, setCurrentUser] = useState(Cookies.get('username') as string)

    const { refundId, username, read, prev } = useListenerDB()

    const updateItem = (key: string, delta: number = 1) => {
        setUnreads(prev => ({
            ...prev,
            [key]: (prev[key] ?? 0) + delta,
        }));
    };


    async function getAllRefunds() {
        let id = Cookies.get("username")
        let status = Cookies.get("status")
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/item-refund`, {
            method: "PATCH",
            body: JSON.stringify({
                user_id: (status == "true" ? id : null),
                merchant_id: (status != "true" ? id : null)
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(data => data.json())
            .then(response => {
                const sortedRefund = response.refund.sort((a: RefundInterface, b: RefundInterface) => b.last_updated.localeCompare(a.last_updated))
                setRefunds(sortedRefund)
            })

        getMessagesByUser(currentUser, currentUser).then(
            items => setUnreads(items)
        )
    }

    useEffect(() => {
        const data = Cookies.get('status')
        setUser(data == 'true')

        if (window.location.href.split("#").length > 1) {
            if (window.location.href.split("#")[1].split("&").length > 1) {
                setProcessData(window.location.href.split("#")[1].split("&")[0] == "true")
                setValid(window.location.href.split("#")[1].split("&")[1] == "true")
            }
        }
        getAllRefunds()
        setLoaded(true)
    }, [loaded])

    useEffect(() => {
        if (!read && username != currentUser)
            updateItem(refundId)
    }, [prev, refundId, username, read])

    return (
        <div className="min-h-screen max-h-fit bg-gray-100 pb-10">
            <ItemNavbar profile={true} />
            <div className="text-black flex flex-col pl-5 pr-5 md:pl-24 md:pr-24 mt-10">
                <div className={`z-99 ${noto_sans.className} text-black flex flex-row pl-10 cursor-pointer`}>
                    <div onClick={e => setProcessData(true)} className={`p-4 flex ${processData ? "bg-white shadow-[inset_0_0.3px_0.5px_rgba(0,0,0,0.6)] text-green-700 rounded-t-sm" : "text-green-700"} font-bold text-center`}>Dalam Proses</div>
                    <div onClick={e => setProcessData(false)} className={`p-4 flex ${!processData ? "bg-white shadow-[inset_0_0.3px_0.5px_rgba(0,0,0,0.6)]  text-green-700 rounded-t-sm" : "text-green-700"} font-bold text-center`}>Selesai</div>
                </div>
                <div className="z-0 bg-white shadow-sm rounded-md">
                    <div className="p-5 flex flex-col gap-5">
                        <div className={`${(user && processData) || !loaded ? 'hidden' : ''} cursor-pointer flex flex-row ${noto_sans.className} gap-2`}>
                            <div onClick={e => setValid(true)} className={`${valid ? "text-white bg-gray-500 font-bold" : "text-black"} p-2 pl-4 pr-4 text-md rounded-xl`}>{processData ? "Valid" : "Diterima"}</div>
                            <div onClick={e => setValid(false)} className={`${!valid ? "text-white bg-gray-500 font-bold" : "text-black"} p-2 pl-4 pr-4 text-md rounded-xl`}>{processData ? "Tidak Valid" : "Ditolak"}</div>
                        </div>
                        {
                            refunds.map(refund => (
                                <Refund
                                    unreadMessages={unreads[refund.id]}
                                    id={refund.id}
                                    isUser={user}
                                    user={refund.user}
                                    merchant={refund.merchant}
                                    caption={refund.caption}
                                    image_main={refund.main}
                                    image_review={refund.review}
                                    key={refund.id}
                                    lastUpdateAt={refund.last_updated}
                                    verdict={refund.verdict}
                                    isValid={valid}
                                    isAlreadyDone={refund.status}
                                    isSearchProcess={processData}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}
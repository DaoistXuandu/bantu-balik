'use client'
import ItemNavbar from "@/components/navbar/item-navbar";
import { nunito } from "@/lib/utilities/font";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RealtimeChat } from '@/components/helper/realtime-chat'
import Cookies from 'js-cookie';
import { ChatMessage } from "@/hooks/use-realtime-chat";
import { storeMessages } from "@/lib/messages/store-messages";
import { apps_name, secret_word } from "@/config/data";
import { getMessagesByRoom } from "@/lib/messages/get-message-room";
import Loader from "@/components/utils/wait";

export default function RefundItem() {
    const params = useParams()
    const router = useRouter()

    const [loaded, setLoaded] = useState(false)
    const [refund, setRefund] = useState<RefundInterface>()
    const [item, setItem] = useState<ItemInterface>()
    const [initialMessage, setInitialMessage] = useState<ChatMessage[]>([]);
    const [isUser, setIsUser] = useState(false)
    const [wait, setWait] = useState(false)


    const handleMessage = async (messages: ChatMessage[]) => {
        await storeMessages(messages, params.refund as string, Cookies.get("username") as string, refund?.merchant as string, refund?.user as string)
    }

    async function updateRefund(verdict: boolean) {
        setWait(true)
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/update-refund`, {
            method: "PATCH",
            body: JSON.stringify({
                id: params.refund,
                verdict: (verdict ? "Valid" : "Invalid")
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(data => data.json())
            .then(response => response)

        router.push(`/profile#${"false"}&${verdict ? 'true' : 'false'}`)

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

            const starterMessages: ChatMessage[] = [
                {
                    id: crypto.randomUUID(),
                    content: secret_word,
                    user: { name: apps_name },
                    createdAt: new Date().toISOString(),
                    read: false
                },
                {
                    id: crypto.randomUUID(),
                    content: response.refund.caption,
                    user: { name: apps_name },
                    createdAt: new Date().toISOString(),
                    read: false
                },
            ];

            const data = await getMessagesByRoom(params.refund as string)
            const formatted: ChatMessage[] = data.map((m: any) => ({
                id: m.id,
                content: m.content,
                user: { name: m.username },
                createdAt: m.created_at,
                read: m.read
            }));

            const allMessages = [...starterMessages, ...formatted];

            setInitialMessage(allMessages);
        }
    }

    useEffect(() => {
        setWait(true)
        const data = Cookies.get('status')
        setIsUser(data == "true")
        getRefund()
        setLoaded(true)
        setWait(false)
    }, [loaded])

    return (
        < div className="min-h-screen max-h-fit bg-gray-100" >
            <Loader wait={wait} />
            <ItemNavbar profile={true} />
            <div className="text-black flex flex-row pl-24 pr-20 mt-10 gap-5 h-full">
                <div className={`w-3/12 h-fit flex flex-col gap-3 ${nunito.className}`}>
                    <div className="flex flex-col gap-3 bg-white p-5 shadow-lg rounded-md">
                        <img src={item ? item.image : refund?.main} className="rounded-md" alt="" />
                        <div className="text-sm">{item?.name}</div>
                        <div className={`${item != null ? '' : 'hidden'} text-sm font-bold`}>Rp {item?.price}</div>
                    </div>
                    <div className={`${isUser || !loaded ? 'hidden' : ''} w-full flex flex-row gap-5 items-center justify-between`}>
                        <div onClick={e => updateRefund(false)} className="w-1/2 text-center cursor-pointer hover:scale-95 border-2 bg-white border-red-500 p-3 shadow-lg pl-4 pr-4 font-thin text-red-500 rounded-md">Tolak Refund</div>
                        <div onClick={e => updateRefund(true)} className="w-1/2 text-center cursor-pointer hover:scale-95 font-bold text-white bg-green-700 p-3 shadow-lg pl-4 pr-4 rounded-md">Refund Selesai</div>
                    </div>
                </div>
                <div className="relative w-9/12 flex flex-col gap-2 pl-10 h-full">
                    <div className="bottom-5 right-5 w-full h-[650px] shadow-lg rounded-lg overflow-hidden bg-white">
                        <RealtimeChat
                            image={refund?.review as string}
                            roomName={params.refund as string}
                            username={Cookies.get('username') as string}
                            messages={initialMessage}
                            onMessage={handleMessage}
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}
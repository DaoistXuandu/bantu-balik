

'use client'
import Item from "@/components/item";
import MainNavbar from "@/components/main-navbar";
import ManualAdd from "@/components/manual-add";
import StoreBanner from "@/components/store-banner";
import { id_to_merchant, merchant } from "@/config/data";
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function Store({ id }: { id: string }) {
    const [keyword, setKeyword] = useState("")

    const [loaded, setLoaded] = useState(false)
    const [total, setTotal] = useState(0)
    const [items, setItems] = useState<ItemInterface[]>([]);

    const params = useParams()

    function handle_change(e: string) {
        setKeyword(e)
    }

    async function getTotalRefund() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/total-refund`, {
            method: "PATCH",
            body: JSON.stringify({
                id: params.id,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(data => data.json())
            .then(response => response)

        if (response.status) {
            setTotal(response.total)
        }
    }

    async function getAllItems() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/items`, {
            method: "PATCH",
            body: JSON.stringify({
                merchant_id: params.id,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(data => data.json())
            .then(response => response)

        if (response.status) {
            setItems(response.items)
        }
    }

    useEffect(() => {
        getTotalRefund()
        getAllItems()
        setLoaded(true)
    }, [loaded])

    return (
        <div className="min-h-screen max-h-fit bg-white">
            <MainNavbar product={true} change={handle_change} />
            <div className="w-full pl-24 pr-24 p-6 flex flex-col flex-wrap gap-5">
                <StoreBanner
                    name={merchant[id_to_merchant[params.id as string]].info.name}
                    place={merchant[id_to_merchant[params.id as string]].info.location}
                    image={merchant[id_to_merchant[params.id as string]].info.image}
                    total_of_refund={total} />
                <div className="flex flex-row flex-wrap w-full gap-5">
                    <ManualAdd id={params.id as string} />
                    {
                        items.map(item => (
                            item.name.toLowerCase().includes(keyword) ?
                                <Item
                                    key={item.id}
                                    description={item.name}
                                    image={item.image}
                                    price={item.price}
                                    id={item.id}
                                    status={Cookies.get("status") as string}
                                />
                                :
                                ""
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
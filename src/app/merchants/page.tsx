'use client'
import Merchant from "@/components/utils/merchant";
import MainNavbar from "@/components/navbar/main-navbar";
import { merchant } from "@/config/data";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export default function Merchants() {
    const [keyword, setKeyword] = useState("")
    const [loaded, setLoaded] = useState(false)
    const router = useRouter()

    function handle_change(e: string) {
        setKeyword(e)
    }
    useEffect(() => {
        if (Cookies.get("username") == null) {
            router.push("/login")
        }
        setLoaded(true)
    }, [loaded])

    return (
        <div className={`min-h-screen max-h-fit bg-white ${loaded ? '' : 'hidden'}`}>
            <MainNavbar product={false} change={handle_change} />
            <div className="w-full flex flex-row flex-wrap gap-6 justify-center p-12">
                {
                    merchant.map(item => (
                        (
                            item.info.name.toLowerCase().includes(keyword) ?
                                < Merchant
                                    id={item.info.id}
                                    key={item.info.id}
                                    image={item.info.image}
                                    name={item.info.name}
                                    city={item.info.location}
                                />
                                :
                                ""
                        )
                    ))
                }
            </div>
        </div>
    )
}
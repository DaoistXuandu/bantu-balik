'use client'
import { FormEvent, useState } from "react";
import { noto_sans, poppins } from "../../lib/utilities/font";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { apps_name } from "@/config/data";
import Loader from "@/components/utils/wait";

export default function Home() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [wait, setWait] = useState(false)

    const router = useRouter()

    async function handle_login(e: FormEvent) {
        e.preventDefault()
        setWait(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(data => data.json())
                .then(response => response)

            if (response.status) {
                Cookies.set('username', response.username)
                Cookies.set('status', response.occupation)
                Cookies.set('id', response.id)

                if (response.username.includes("user"))
                    router.push("/merchants")
                else
                    router.push("/profile")
            }
            else {
                alert("Username / Password yang diberikan salah")
            }
            setWait(false)
        }
        catch {
            setWait(false)
        }
    }

    return (
        <div>
            <div className="fixed h-24 w-full z-999 text-black p-6 mt-6 pl-12 pr-12 flex flex-row">
                <div className="h-full w-full flex flex-row justify-between items-center">
                    <div className="w-full h-full flex flex-row justify-center  md:justify-start items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-10 aspect-square" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                        </svg>
                        <p className={`${poppins.className} text-2xl text-green-800`}>
                            {apps_name}
                        </p>
                    </div>
                </div>
            </div >
            <Loader wait={wait} />
            <div className="min-h-screen max-h-screen bg-white text-black flex flex-row items-center overflow-hidden">
                <div className="hidden md:flex z-10 w-2/3 flex items-center justify-center">
                    <img className="w-full aspect-square" src="./assets/security-bw.svg" alt="Description of the SVG">
                    </img>
                </div>
                <div className={`w-full pl-5 pr-5 md:w-1/3 flex flex-row md:pl-0 md:pr-24 gap-10 right-0 items-center justify-center ${noto_sans.className}`}>
                    <div className="p-8 inset-shadow-sm shadow-2xl bg-white rounded-2xl flex flex-col gap-20 min-w-96 justify-center items-center">
                        <div className="h-full flex flex-row items-center gap-2 pt-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-10 aspect-square" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                            </svg>
                            <p className={`${poppins.className} text-2xl text-green-800`}>
                                {apps_name}
                            </p>
                        </div>
                        <form className="w-full flex flex-col gap-10" onSubmit={e => handle_login(e)}>
                            <div className={`w-full ${noto_sans.className} flex flex-col gap-3`}>
                                <div className="w-full">
                                    <label htmlFor="username" className="text-lg font-medium">Username</label>
                                    <input type="text" onChange={e => setUsername(e.target.value)} value={username} name="username" id="username" placeholder="Masukkan username anda!" className="border boder-1 border-gray-200 w-full text-md p-2 rounded-lg" />
                                </div>

                                <div className="w-full">
                                    <label htmlFor="password" className="text-lg font-medium">Password</label>
                                    <input type="password" onChange={(e => setPassword(e.target.value))} value={password} name="password" id="password" placeholder="Masukkan password anda!" className="border boder-1 border-gray-200 w-full text-md p-2 rounded-lg" />
                                </div>
                            </div>
                            <button disabled={wait} className={`cursor-pointer text-white font-bold p-2 text-center rounded-lg w-full text-xl ${wait ? "scale-95 bg-green-300" : "bg-green-700"}`}>
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}
'use client'
import { useRouter } from "next/navigation";

export default function Back() {
    const router = useRouter()
    function removeLastSegment(url: string): string {
        const parts = url.split("/");
        parts.pop(); // remove last element
        return parts.join("/");
    }

    return (
        <div onClick={e => router.push(removeLastSegment(window.location.pathname))} className="cursor-pointer hover:scale-95 flex flex-row items-center gap-4 text-lg text-left rounded-full border-black border w-fit p-2 pl-4 pr-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
            <div>
                Kembali
            </div>
        </div>
    )
}
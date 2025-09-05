export default function Chat({ left, desc }: { left: boolean, desc: string }) {
    return (
        <div className={`w-full flex ${left ? "flex-row" : "flex-row-reverse justify-items-end"} gap-2`}>
            <div className={`h-10 aspect-square ${left ? "bg-black" : "bg-gray-500"} rounded-full`}></div>
            <div className="w-fit bg-white p-4 shadow-xl rounded-md">
                <div className="text-md">{desc}</div>
            </div>
        </div>
    )
}
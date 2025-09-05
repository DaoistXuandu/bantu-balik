export default function About() {
    const data = [
        {
            image: "https://media.licdn.com/dms/image/v2/D5603AQERr9aqvokY7A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1731863194080?e=1759968000&v=beta&t=pNzpJ9O0kb0rL6YTxNd4vhujuctSrKV7JludcbuCbNU",
            name: "Dastin Rangga Berani",
            occupation: "AI Engineer"
        },
        {
            image: "https://media.licdn.com/dms/image/v2/D5603AQFMT1ES993pcw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1692079442418?e=1759968000&v=beta&t=H22DTiUksyDlv5GiX9S7yzRASTZFWklcmxx66qf5sW8",
            name: "Muhammad Fayyed As Shidqi",
            occupation: "AI Engineer"
        },
        {
            image: "https://media.licdn.com/dms/image/v2/D5603AQHRKMw-W6WDMQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1731601521571?e=1759968000&v=beta&t=eAXua5djxZQ2LB12Gwm24h_VuXu5iqAb65GWOGPOt4o",
            name: "Raihan Akbar",
            occupation: "Web Engineer"
        },

    ]
    return (
        <div className="bg-white min-h-screen flex flex-row gap-10 justify-between p-24">
            {
                data.map(
                    item => (
                        <div key={item.name} className="flex flex-col items-center">
                            <img src={item.image} className="rounded-full" alt="" />
                            <p className="font-bold text-2xl">{item.name}</p>
                            <p className="text-md">{item.occupation}</p>
                        </div>
                    )
                )
            }

        </div>
    )
}
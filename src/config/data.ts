const merchant = [
    {
        info: {
            id: "27dd11d5-0f17-4af8-97d5-dcd5df1391f7",
            image: "https://i.ibb.co.com/RGfJ3x8m/merchant-1.jpg",
            name: "Bangni Official Store",
            location: "Kota Bandung"
        },
    },
    {
        info: {
            id: "85d52f84-6603-4af6-94d7-602b96310896",
            image: "https://i.ibb.co.com/ym4sjskx/merchant-2.jpg",
            name: "Zahra Online Store",
            location: "Kota Administrasi Jakarta Utara"
        },
    },
    {
        info: {
            id: "de213516-5881-4d42-8575-2d67bcb8b75a",
            image: "https://i.ibb.co.com/bRQXwGkv/merchant-3.jpg",
            name: "Trailtop Urban Wear",
            location: "Kota Malang"
        }
    }
]

const id_to_merchant: Record<string, number> = {
    "de213516-5881-4d42-8575-2d67bcb8b75a": 2,
    "85d52f84-6603-4af6-94d7-602b96310896": 1,
    "27dd11d5-0f17-4af8-97d5-dcd5df1391f7": 0
}

const refund_data = [
    {
        image_main: "https://avatars.githubusercontent.com/u/105583561?s=400&u=b2bb63a12a3eb892bf0fe87c703b21d5bc0c6fc3&v=4",
        caption: "SevenPlus Gembok Sepeda Anti Theft Portable - Bicycle Lock Passcode Kombinasi 2 angka Cable Lock 4 Digit kunci gembok sepeda bicycle lock ring gembok rantai anti maling alat pengaman sepeda berkualitas premium gembok helm",
        image_refund: "https://avatars.githubusercontent.com/u/105583561?s=400&u=b2bb63a12a3eb892bf0fe87c703b21d5bc0c6fc3&v=4",
        description: "Barangnya kok bengkok ya mas?",
        user: "Andi Zakir"
    }
]


export { merchant, refund_data, id_to_merchant }


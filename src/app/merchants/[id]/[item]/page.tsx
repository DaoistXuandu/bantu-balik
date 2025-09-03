'use client'
import Back from "@/components/back";
import ItemNavbar from "@/components/item-navbar";
import { nunito } from "@/lib/font";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function Refund() {
    const params = useParams()
    const [item, setItem] = useState<ItemInterface>()
    const [loaded, setLoaded] = useState(false)
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState("")
    const [wait, setWait] = useState(false)

    const router = useRouter()

    async function getItem() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/item`, {
            method: "PATCH",
            body: JSON.stringify({
                item_id: params.item,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(data => data.json())
            .then(response => response)

        if (response.status) {
            setItem(response.item)
        }
    }

    async function handleRefund() {
        setWait(true)
        try {
            setWait(false)
            if (item == null)
                throw "Gagal mendapatkan item"

            if (description == "")
                throw "Deskripsi tidak boleh kosong"

            const API_KEY = process.env.NEXT_PUBLIC_IMGDB_KEY;
            const url = `https://api.imgbb.com/1/upload?expiration=600&key=${API_KEY}`;

            if (file == null) {
                throw "Gambar belum diisi"
            }

            const formData = new FormData();
            formData.append("image", file as File);

            const data = await fetch(url, {
                method: "POST",
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    return data
                })
                .catch((err) => {
                    throw `Upload failed:${err}`
                });

            if (!data.success) {
                throw "Gagal dalam mengunggah gambar"
            }

            const user_id = Cookies.get('id')
            console.log(user_id)
            fetch(`${process.env.NEXT_PUBLIC_HOST}/api/refund`, {
                method: "POST",
                body: JSON.stringify({
                    main: item?.image,
                    review: data.data.url,
                    caption: description,
                    merchant: params.id,
                    user: user_id
                }),
            })
                .then(data => data.json())
                .then(item => console.log(item))
                .catch((err) => {
                    throw `Upload failed: ${err}`
                });

            setWait(false)
            router.push("/profile")
        }
        catch (err) {
            alert(err)
            setWait(false)
        }
    }


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            const previewUrl = URL.createObjectURL(selectedFile);
            setPreview(previewUrl);
        }
    };

    useEffect(() => {
        getItem()
        setLoaded(true)
    }, [loaded])

    return (
        <div className="min-h-screen max-h-fit bg-white text-black">
            <ItemNavbar profile={false} />
            <div className={`flex flex-row ${nunito.className} mt-10 pl-10 pr-10`}>
                <div className="w-1/2 flex flex-col gap-3">
                    <Back />
                    <div className="flex flex-col items-center">
                        <div className="text-center font-bold text-xl">Gambar Asli Barang</div>
                        <img src={item?.image} className="w-2/3" alt="" />
                    </div>
                </div>
                <div className="w-1/2 flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label className="font-bold text-xl" htmlFor="image_review">Kondisi Barang:</label>
                        {preview && (
                            <div>
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="mt-4 w-40 h-40 object-cover rounded-lg"
                                />
                                <div className="font-bold">Preview</div>
                            </div>
                        )}
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input
                                    id="image_review"
                                    type="file"
                                    accept="image/*"
                                    className="absolute opacity-0 w-full h-full"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold text-xl" htmlFor="caption_review">Deskripsi Masalah:</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} className="border border-1 border-gray-300 rounded-md w-full min-h-44" id="text_review" />
                    </div>

                    <button disabled={wait} onClick={handleRefund} className="cursor-pointer hover:scale-95 text-center p-5 font-bold text-2xl bg-green-700 text-white rounded-lg mb-10">Refund</button>
                </div>
            </div>

        </div>
    )
}
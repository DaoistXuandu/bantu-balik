'use client'
import Back from "@/components/helper/back";
import ItemNavbar from "@/components/navbar/item-navbar";
import { nunito } from "@/lib/utilities/font";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from 'js-cookie';
import Item from "@/components/utils/item";
import { randomUUID } from "crypto";
import Loader from "@/components/utils/wait";

export default function Refund() {
    const params = useParams()
    const [previewReview, setPreviewReview] = useState<string | null>(null);
    const [previewMain, setPreviewMain] = useState<string | null>(null);

    const [fileReview, setFileReview] = useState<File | null>(null);
    const [fileMain, setFileMain] = useState<File | null>(null);

    const [description, setDescription] = useState("")
    const [wait, setWait] = useState(false)

    const router = useRouter()

    async function handleRefund() {
        setWait(true)
        try {
            if (description == "")
                throw "Deskripsi tidak boleh kosong"

            const API_KEY = process.env.NEXT_PUBLIC_IMGDB_KEY;
            const url = `https://api.imgbb.com/1/upload?key=${API_KEY}`;

            if (fileMain == null) {
                throw "Gambar Asli belum diisi"
            }

            if (fileReview == null) {
                throw "Gambar review belum diisi"
            }


            const formDataMain = new FormData();
            formDataMain.append("image", fileMain as File);

            const main = await fetch(url, {
                method: "POST",
                body: formDataMain,
            })
                .then((res) => res.json())
                .then((data) => {
                    return data
                })
                .catch((err) => {
                    throw `Upload failed:${err}`
                });

            if (!main.success) {
                throw "Gagal dalam mengunggah gambar"
            }

            const formDataReview = new FormData();
            formDataReview.append("image", fileReview as File);

            const review = await fetch(url, {
                method: "POST",
                body: formDataReview,
            })
                .then((res) => res.json())
                .then((data) => {
                    return data
                })
                .catch((err) => {
                    throw `Upload failed:${err}`
                });

            if (!review.success) {
                throw "Gagal dalam mengunggah gambar"
            }

            const user_id = Cookies.get('id')
            fetch(`${process.env.NEXT_PUBLIC_HOST}/api/refund`, {
                method: "POST",
                body: JSON.stringify({
                    main: main.data.url,
                    review: review.data.url,
                    caption: description,
                    item_id: crypto.randomUUID(),
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
            console.log("done")
            router.push("/profile")
        }
        catch (err) {
            alert(err)
            setWait(false)
        }
    }


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, state: string) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];

            if (state == "main")
                setFileMain(selectedFile);
            else
                setFileReview(selectedFile)

            const previewUrl = URL.createObjectURL(selectedFile);
            if (state == "main")
                setPreviewMain(previewUrl);
            else
                setPreviewReview(previewUrl);
        }
    };

    return (
        <div className="min-h-screen max-h-fit bg-white text-black">
            <Loader wait={wait} />
            <ItemNavbar profile={false} />
            <div className={`flex flex-row ${nunito.className} mt-10 pl-10 pr-10 gap-10`}>
                <div className="w-1/2 flex flex-col gap-3">
                    <Back />
                    <div className="flex flex-col items-center justify-center gap-5">
                        <div className="w-full flex flex-col items-center">
                            <label className="font-bold text-xl" htmlFor="image_review">Gambar Barang Asli:</label>
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
                                        id="image_main"
                                        type="file"
                                        accept="image/*"
                                        className="absolute opacity-0 w-full h-full"
                                        onChange={e => handleFileChange(e, "main")}
                                    />
                                </label>
                            </div>
                        </div>
                        {previewMain && (
                            <div className="flex flex-col items-center">
                                <div className="font-bold text-xl">Preview Barang Asli</div>
                                <img
                                    src={previewMain}
                                    alt="preview"
                                    className="mt-4 w-40 h-40 object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-1/2 flex flex-col gap-5">
                    <div className="flex flex-row gap-8">
                        <div className={`flex flex-col ${previewReview ? 'w-3/4' : 'w-full'}`}>
                            <label className="font-bold text-xl" htmlFor="image_review">Kondisi Barang:</label>
                            <div className={`flex items-center justify-center w-full flex-row`}>
                                <label htmlFor="dropzone-file" className={`w-full relative flex flex-col items-center justify-center h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}>
                                    <div className="w-full flex flex-col items-center justify-center pt-5 pb-6">
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
                                        onChange={e => handleFileChange(e, "review")}
                                    />
                                </label>
                            </div>
                        </div>
                        {previewReview && (
                            <div className="w-1/4 h-full flex flex-col justify-start">
                                <div className="font-bold text-xl h-fit">Preview Kondisi</div>
                                <div className="h-full flex flex-row items-center">
                                    <img
                                        src={previewReview}
                                        alt="preview"
                                        className="mt-4 w-40 h-40 object-cover rounded-lg"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold text-xl" htmlFor="caption_review">Deskripsi Masalah:</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} className="p-3 border border-1 border-gray-300 rounded-md w-full min-h-44" id="text_review" />
                    </div>

                    <button disabled={wait} onClick={handleRefund} className="cursor-pointer hover:scale-95 text-center p-5 font-bold text-2xl bg-green-700 text-white rounded-lg mb-10">Refund</button>
                </div>
            </div>

        </div>
    )
}
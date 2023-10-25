'use client'

import { useState } from "react"

export default function Home() {

    const [file, setFile] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", file)
        
        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData
        })

        const data = await response.json()
        console.log(data)
    }

    const handleFileChange = (e) => {
        if (!e.target.files?.[0]) return
        setFile(e.target.files?.[0])
    }

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="bg-zinc-950 p-5">
                <h1 className="text-4xl text-center my-4">Upload a file</h1>
                <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    className="bg-zinc-900 text-zinc-100 p-2 rounded block mb-2"
                    onChange={handleFileChange}
                />

                <button
                    className="bg-green-900 text-zinc-100 p-2 rounded block w-full disabled:opacity-50"
                >
                    Upload
                </button>
                </form>
            </div>
        </div>
    )
}
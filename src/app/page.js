'use client'

export default function Home() {
    return (
        <div className="flex h-screen justify-center items-center">
            <div className="bg-zinc-950 p-5">
                <h1 className="text-4xl text-center my-4">Upload a file</h1>
                <form >
                <input
                    type="file"
                    className="bg-zinc-900 text-zinc-100 p-2 rounded block mb-2"
                    
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
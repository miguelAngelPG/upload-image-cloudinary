import { NextResponse } from 'next/server'
import path from 'path'
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, 
}); 

export async function POST(req, res) {
    try {
        const data = await req.formData()
        const file = data.get('file')

        if (!file) {
            return NextResponse.json({ message: 'no file uploaded' }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        if (!bytes) {
            return NextResponse.json({ message: 'error uploading file' }, { status: 500 })
        }
        
        const response = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, async (error, result) => {
                if (error){
                    reject(error)
                }

                resolve(result)
            }).end(buffer)
        })

        return NextResponse.json({ message: 'uploaded file', url: response.secure_url }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: 'error uploading file' }, { status: 400 })
    }

}

import { NextResponse } from 'next/server'
import path from 'path'
import { writeFile } from 'fs/promises'
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dmf0oqglf', 
  api_key: '173259338384546', 
  api_secret: '-RXMfkhKiTSQDp_X6q6Q9gUXjrA' 
}); 

export async function POST(req, res) {
    try {
        const data = await req.formData()
        const file = data.get('file')

        console.log(file)
        if (!file) {
            return NextResponse.json({ message: 'no file uploaded' }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        if (!bytes) {
            return NextResponse.json({ message: 'error uploading file' }, { status: 500 })
        }

        const fileName = 'currentReading.jpg'
        const filePath = path.join(process.cwd(), 'public', file.name)

        writeFile(filePath, buffer)

        return NextResponse.json({ message: 'uploaded file' }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: 'error uploading file' }, { status: 400 })
    }

}

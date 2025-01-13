import {NextResponse} from "next/server";

export async function POST(request) {

    const data = await request.formData()
    console.log(data.get("file"));
    
    return NextResponse.json("imagen subida")
}
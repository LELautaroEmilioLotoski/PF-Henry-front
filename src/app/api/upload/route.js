import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export default async function POST(request) {
  const data = await request.formData();
  const image = data.get("image");

  if (!image) {
    return NextResponse.json("La imagen no ha sido subida", { status: 400 });
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const filePath = path.join(process.cwd(), "public", image.name);
    await writeFile(filePath, buffer);
    console.log("File uploaded successfully:", filePath);
    return NextResponse.json("imagen subida");
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json("Error al subir la imagen", { status: 500 });
  }
}
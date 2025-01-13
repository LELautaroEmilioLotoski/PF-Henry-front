"use client"
import { useState } from "react"

const Cloudinary = () => {
  const [file, setFile] = useState<File | null>(null)

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData();
          if (file) {
            formData.append("file", file);
          }

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          console.log(data);
        }}
      >
        <input type="file" onChange={(e) => {
          if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
          }
        }} />
        <button>Enviar</button>
      </form>
    </div>
  )
}

export default Cloudinary
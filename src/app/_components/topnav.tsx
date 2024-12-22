"use client"

import { ChangeEvent } from "react";
import { SignedOut, SignInButton, UserButton, SignedIn } from "@clerk/nextjs";

export const TopNav = () => {
  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    const buffer = await readFileAsBuffer(file!)

    const response = await fetch('api/image', {
      method: 'POST',
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        fileName: file?.name,
        contentType: file?.type,
        fileBuffer: buffer
      })
    });
  }

  const readFileAsBuffer = (file: File): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(Buffer.from(reader.result as ArrayBuffer));
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file); // Read file as ArrayBuffer
    });
  }

  return (
    <nav className="flex w-full items-center justify-between p-4 mb-3 text-xl font-semibold border-b">
      <div>Gallery</div>

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <input onChange={uploadImage} type="file" accept="image/png, image/jpeg" />
          {/* <UploadButton endpoint="imageUploader" /> */}
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  )
}

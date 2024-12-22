"use client"

import { ChangeEvent } from "react";

import { SignedOut, SignInButton, UserButton, SignedIn } from "@clerk/nextjs";

export const TopNav = () => {
  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log('event', event.target.files)
    const file = event.target.files![0]

    const formData = new FormData()
    formData.append(file!.name, file!);

    const response = await fetch('api/image', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // },
      body: formData
    })
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

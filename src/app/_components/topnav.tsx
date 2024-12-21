"use client"

import { SignedOut, SignInButton, UserButton, SignedIn } from "@clerk/nextjs"
import { UploadButton } from "~/utils/uploadthing"

export const TopNav = () => {
  return (
    <nav className="flex w-full items-center justify-between p-4 mb-3 text-xl font-semibold border-b">
      <div>Gallery</div>

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UploadButton endpoint="imageUploader" />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  )
}

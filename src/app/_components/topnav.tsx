'use client';

import { ChangeEvent } from 'react';
import { SignedOut, SignInButton, UserButton, SignedIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

export const TopNav = () => {
  const router = useRouter();

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const buffer = await readFileAsBuffer(file!);

    toast('Uploading...', {
      duration: 7000,
      id: 'image-upload-begin'
    });

    const response = await fetch('api/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName: file?.name,
        contentType: file?.type,
        fileBuffer: buffer,
      }),
    });

    toast.dismiss('image-upload-begin');
    toast('Upload complete!', { duration: 2000 })

    router.refresh();
  };

  const readFileAsBuffer = (file: File): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(Buffer.from(reader.result as ArrayBuffer));
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file); // Read file as ArrayBuffer
    });
  };

  return (
    <nav className="mb-3 flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Gallery</div>

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <input
            onChange={uploadImage}
            type="file"
            accept="image/png, image/jpeg"
          />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

'use client'

import { useState, useRef } from 'react'
// import { auth, currentUser } from '@clerk/nextjs/server';

// import { SignedOut, SignedIn } from '@clerk/nextjs';
import Image from 'next/image';
import { Input } from './../components/ui/input';
import { Button } from './../components/ui/button';
import Link from 'next/link';
import { db } from '~/server/db';

export const dynamic = 'force-dynamic';

// const Images = async () => {
//   // const images = await db.query.images.findMany({
//   //   orderBy: (model, { desc }) => desc(model.id),
//   // });

//   const { userId } = await auth();

//   const imagesRes = await fetch(`${process.env.APP_URL}/api/image`, {
//     method: 'GET',
//     headers: {
//       User: `${userId}`,
//     },
//   });

//   const { data } = await imagesRes.json();

//   return (
//     <div className="flex flex-wrap">
//       {data.map((image: any, index: number) => (
//         <div key={`${image.id}${index}`} className="flex w-48 flex-col p-4">
//           <Image
//             src={image}
//             style={{ objectFit: 'contain' }}
//             width={192}
//             height={192}
//             className="h-32 w-32"
//             alt="image"
//           />
//           {/* <div>{image.name}</div> */}
//         </div>
//       ))}
//     </div>
//   );
// };

export default function HomePage() {
  const wordInputRef = useRef<HTMLInputElement>(null);

  const getRelatedWords = async () => {
    const searchTerm = wordInputRef.current?.value
    if (searchTerm) {
      const response = await fetch(`api/related-words?word=${encodeURIComponent(searchTerm)}`);
    }
  }

  return (
    <main className="">
      {/* <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>

      <SignedIn>
      </SignedIn> */}

      <section className="container mx-auto">
        <h1 className="text-3xl lg:text-5xl">Easily generate flashcard decks</h1>

        <Input type="text" ref={wordInputRef} />

        <Button onClick={getRelatedWords}>Get words</Button>
      </section>
    </main>
  );
}

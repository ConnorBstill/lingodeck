import { SignedOut, SignedIn } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '~/server/db';

export const dynamic = 'force-dynamic';

const Images = async () => {
  // const images = await db.query.images.findMany({
  //   orderBy: (model, { desc }) => desc(model.id),
  // });

  const { userId } = await auth();

  const imagesRes = await fetch(`${process.env.APP_URL}/api/image`, {
    method: 'GET',
    headers: {
      User: `${userId}`,
    },
  });

  const { data } = await imagesRes.json();

  return (
    <div className="flex flex-wrap">
      {data.map((image: any, index: number) => (
        <div key={`${image.id}${index}`} className="flex w-48 flex-col p-4">
          <Image
            src={image}
            style={{ objectFit: 'contain' }}
            width={192}
            height={192}
            className="h-32 w-32"
            alt="image"
          />
          {/* <div>{image.name}</div> */}
        </div>
      ))}
    </div>
  );
};

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>

      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}

import { SignedOut, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = 'force-dynamic';

const Images = async () => {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id)
  });
  return (
    <div className="flex flex-wrap">
      {[...images, ...images].map((image, index) => (
        <div key={`${image.id}${index}`} className="flex w-48 p-4 flex-col">
          <img src={image.url} className="w-28 h-28" alt="image" />
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {

  return (
    <main className="">
      <SignedOut>
        <div className="w-full h-full text-2xl text-center">
          Please sign in above
        </div>
      </SignedOut>

      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}

import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = 'force-dynamic';

export default async function HomePage() {

  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id)
  });

  console.log('posts', images)

  return (
    <main className="">
      <div className = "flex flex-wrap gap-4">
        {[...images, ...images].map((image, index) => (
          <div key={`${image.id}${index}`} className="flex w-48 p-4 flex-col">
            <img src={image.url} className="w-28 h-28" alt="image" />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
      Hello (in progress)
    </main>
  );
}

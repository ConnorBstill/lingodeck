// import { auth, currentUser } from '@clerk/nextjs/server';

// import { SignedOut, SignedIn } from '@clerk/nextjs';

import { buttonVariants } from './../components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col justify-center h-full w-full">
      {/* <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>

      <SignedIn>
      </SignedIn> */}

      <section className="flex flex-col justify-between items-center h-1/3 mx-auto">
        <h1 className="text-3xl lg:text-5xl">
          Easily create Anki decks based on any category
        </h1>

        <Link href="/main" className={buttonVariants({ variant: 'default' })}>
          Create
        </Link>
      </section>
    </main>
  );
}

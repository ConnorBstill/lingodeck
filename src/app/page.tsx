// import { auth, currentUser } from '@clerk/nextjs/server';

// import { SignedOut, SignedIn } from '@clerk/nextjs';

import { buttonVariants } from './../components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col w-full">
      <section className="flex flex-col items-center px-20 mb-20">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-10">
          Expand Your Vocabulary with Ease
        </h1>

        <p className="w-2/3">
          Welcome to Lingodeck, the ultimate tool for creating personalized
          vocabulary lists in any language. Whether you're learning a new
          language, expanding your knowledge, or building resources for your
          studies, our app makes it simple and fun to grow your word bank.
        </p>
      </section>

      <section className="flex flex-col items-center px-20">
        <h2 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-10">
          How it works
        </h2>

        <ol className="w-2/3 mb-5">
          <li className="mb-5">
            <h4 className="text-1xl font-extrabold lg:text-2xl">
              Pick a category
            </h4>

            <p>
              Enter a subject, theme, or keyword—anything you’re interested
              in! From animals to technology, art to science, the choice is
              yours.
            </p>
          </li>

          <li className="mb-5">
            <h4 className="text-1xl font-extrabold lg:text-2xl">
              Generate Words & Translations
            </h4>

            <p>
              Instantly get a curated list of words related to your chosen
              category, along with their translations in your selected
              language.
            </p>
          </li>

          <li className="mb-5">
            <h4 className="text-1xl font-extrabold lg:text-2xl">
              Download & Learn
            </h4>

            <p>
              Export your custom vocabulary list as a file you can easily
              upload into apps like Anki for flashcard-based learning.
            </p>
          </li>
        </ol>

        <Link href="/main" className={buttonVariants({ variant: 'default' })}>
          Create
        </Link>
      </section>
    </main>
  );
}

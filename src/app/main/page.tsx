'use client'

import { useState, useRef } from 'react'
// import { auth, currentUser } from '@clerk/nextjs/server';

// import { SignedOut, SignedIn } from '@clerk/nextjs';
import Image from 'next/image';
import { Input } from './../../components/ui/input';
import { Button } from './../../components/ui/button';
import Link from 'next/link';
import { db } from '~/server/db';

export const dynamic = 'force-dynamic';

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
      <section className="container mx-auto">
        <Input type="text" ref={wordInputRef} />

        <Button onClick={getRelatedWords}>Get words</Button>
      </section>
    </main>
  );
}

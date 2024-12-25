'use client'

import { useState, useRef } from 'react'
// import { auth, currentUser } from '@clerk/nextjs/server';

// import { SignedOut, SignedIn } from '@clerk/nextjs';
import { Language } from '~/lib/types/word-types';
import { Input } from '../ui/input';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue, } from '../ui/select';
import { Button } from '../ui/button';

const WordGenerator = (props: { languages: Language[] }) => {
  console.log('languages client', props.languages)
  const wordInputRef = useRef<HTMLInputElement>(null);

  const renderLanguageList = () => {
    const { languages } = props;

    return languages.map((language: Language, index) => {
      const { id, name, isoCode } = language;

      return (
        <SelectItem value={isoCode} key={`${id}${name}`}>{name}</SelectItem>
      )
    })
  }

  const getRelatedWords = async () => {
    const searchTerm = wordInputRef.current?.value
    if (searchTerm) {
      const response = await fetch(`api/related-words?word=${encodeURIComponent(searchTerm)}`);
    }
  }

  return (
    <div className="flex flex-col justify-between items-center h-1/4 w-full">
      <div className="flex justify-center w-full">
        <Input placeholder="Category" type="text" ref={wordInputRef} className="w-1/5" />

        <Select>
          <SelectTrigger className="w-1/5">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Languages</SelectLabel>
              {renderLanguageList()}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={getRelatedWords} className="w-1/4">Get words</Button>
    </div>
  );
}

export { WordGenerator }

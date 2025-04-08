'use client';

import { ChangeEvent } from 'react';

import { useSetAtom } from 'jotai';

import { listCategoryAtom } from '~/store/wordlist-parameters';

import { Input } from '~/components/ui/input';

const CategoryTermInput = () => {
  const setCategory = useSetAtom(listCategoryAtom);

  const setCategoryTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  return (
    <Input placeholder="Category" type="text" onChange={setCategoryTerm} />
  );
};

export default CategoryTermInput;

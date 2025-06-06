'use client'

import React from "react";
import {Search} from "lucide-react";
import {cn} from "@/shared/lib/utils";
import {useClickAway, useDebounce} from "react-use";
import Link from "next/link";
import {Api} from "@/shared/services/api-client";
import {Product} from "@prisma/client";

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [focused, setFocused] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [products, setProducts] = React.useState<Product[]>([])
  const ref = React.useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(async () => {
    try {
      const response = await Api.products.search(searchQuery);
      setProducts(response);
    } catch (e) {
      console.error(e);
    }
  }, 150,[searchQuery]);

  const handleClickOnProduct = () => {
    setFocused(false);
    setSearchQuery('');
    setProducts([]);
  }

  return (
    <>
      {focused && (
        <div className='fixed right-0 left-0 top-0 bottom-0 bg-black/50 z-30' />
      )}

      <div
        ref={ref}
        className={cn(className, 'flex rounded-2xl flex-1 justify-between relative h-11 z-30')}
      >
        <Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
        <input
          className='rounded-2xl outline-none w-full bg-gray-100 pl-11'
          type='text'
          placeholder='Поиск...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setFocused(true)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
              focused && 'visible opacity-100 top-12'
            )}>
            {products.map((product) => (
              <Link
                key={product.id}
                className='flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10'
                href={`/product/${product.id}`}
                onClick={handleClickOnProduct}
              >
                <img src={product.imageUrl} alt={product.name} className='rounded-sm h-8 w-8'/>
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
'use client'

import React from "react";
import {Title} from "@/components/shared/title";
import {cn} from "@/shared/lib/utils";
import {ProductCard} from "@/components/shared/product-card";
import {useIntersection} from "react-use";
import {useCategoryStore} from "@/shared/store/category";

interface Props {
  title: string;
  items: any[];
  categoryId: number;
  listClassName?: string;
  className?:string;
}

export const ProductsGroupList: React.FC<Props> = (
  {
    title,
    items,
    categoryId,
    listClassName,
    className
  }
) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting])

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size='lg' className='font-extrabold mb-5' />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((item, i) => (
          <ProductCard
            key={i}
            id={item.id}
            name={item.name}
            price={item.items[0].price}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </div>
  )
}
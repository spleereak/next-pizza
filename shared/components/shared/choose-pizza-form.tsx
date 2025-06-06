import React from "react";
import {cn} from "@/shared/lib/utils";
import {GroupVariants, PizzaImage, Title} from "@/components/shared/index";
import {Button} from "@/components/ui";
import {ProductItem} from "@prisma/client";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items: ProductItem[];
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
 imageUrl,
 name,
 ingredients,
 items,
 onClickAdd,
 className
}) => {
  const textDetails = '30 см, традиционное тесто 30';
  const totalPrice = 350;

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage src={imageUrl} alt={name} size={30} />

      <div className='w-[490px] bg-[#f7f6f5] p-7'>
        <Title text={name} size='md' className='font-extrabold mb-1' />

        <p className='text-gray-400'>{textDetails}</p>

        <GroupVariants items={items} />

        <Button className='h-[55px] px-10 text-base mt-2 rounded-[18px] w-full'>Добавить в корзину за {totalPrice} ₽</Button>
      </div>
    </div>
  )
}
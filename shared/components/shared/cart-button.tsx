import {ArrowRight, ShoppingCart} from "lucide-react";
import {Button} from "@/shared/components/ui";
import React from "react";
import {cn} from "@/shared/lib/utils";

interface Props {
  className?: string
}

export const CartButton: React.FC<Props> = ({ className }) => {
  return (
    <Button className={cn('group relative', className)}>
      <b>520 ₽</b>
      <span className='h-full w-[1px] bg-white/30 mx-3' />
      <div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
        <ShoppingCart className='relative' strokeWidth={2} size={16} />
        <b>3</b>
      </div>
      <ArrowRight className='w-5 absolute right-6 transition duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1' />
    </Button>
  )
}
import {prisma} from "@/prisma/prisma-client";
import {notFound} from "next/navigation";
import {Container, GroupVariants, ProductImage, Title} from "@/components/shared";

export default async function ProductModalPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) {
    return notFound();
  }

  return (
    <Container className='flex flex-col my-10'>
      <div className='flex flex-1'>
        <ProductImage src={product.imageUrl} alt={product.name} size={20} className='' />

        <div className='w-[490px] bg-[#FCFCFC] p-7'>
          <Title text={product.name} size='md' className='font-extrabold mb-1' />

          <p className='text-gray-400'>Lorem  ipsum dolor sit amet consectetur</p>

          <GroupVariants
            items={[
              {
                name: 'Маленька',
                value: '1'
              },
              {
                name: 'Средняя',
                value: '2'
              },
              {
                name: 'Большая',
                value: '3'
              }
            ]}
            selectedValue='2'
          />
        </div>
      </div>
    </Container>
  )
}
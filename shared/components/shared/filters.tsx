'use client'
import React from "react";
import {RangeSlider, Title} from ".";
import {Input} from "@/components/ui";
import {CheckboxFiltersGroup} from "@/components/shared/checkbox-filters-group";
import {useFilters, useQueryFilters, useIngredients} from "../../shared/hooks";

interface Props {
  className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {

  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({ text: item.name, value: String(item.id) }));

  const updatePrices = (prices: [number, number]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  }

  return (
    <div className={className}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

      <CheckboxFiltersGroup
        className='mb-5'
        name='pizzaTypes'
        title='Тип теста'
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' }
        ]}
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
      />

      <CheckboxFiltersGroup
        className='mb-5'
        name='sizes'
        title='Размеры'
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' }
        ]}
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
      />

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className='font-bold mb-3'>Цена от и до:</p>
        <div className='flex gap-3 mb-5'>
          <Input
            type='number'
            placeholder='0'
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type='number'
            placeholder='1000'
            min={100}
            max={1000}
            value={String(filters.prices.priceTo)}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0, filters.prices.priceTo || 1000
          ]}
          onValueChange={([from, to]) => updatePrices([from, to])}
        />
      </div>

      <CheckboxFiltersGroup
        className='mt-5'
        name='ingredients'
        title='Ингредиенты'
        items={items}
        loading={loading}
        defaultItems={items.slice(0, 6)}
        onClickCheckbox={filters.setIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  )
}
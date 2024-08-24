import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { ProductFilters } from '@/api/products';

const useProductFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') as ProductFilters['search'];
  const category = searchParams.get('category') as ProductFilters['category'];
  const maxPrice =
    (Number(searchParams.get('maxPrice')) as ProductFilters['maxPrice']) ||
    undefined;

  const handleFilter = (filter: ProductFilters) => {
    const target = Object.keys(filter)[0] as keyof ProductFilters;
    setSearchParams((prev) => {
      if (target === 'search') {
        if (!filter[target]) {
          prev.set(target, '');
        }
      }
      filter[target] && prev.set(target, String(filter[target]));
      return prev;
    });
  };

  return {
    search,
    category,
    maxPrice,
    handleFilter,
  };
};

export default useProductFilter;

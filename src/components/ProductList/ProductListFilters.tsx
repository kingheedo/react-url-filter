import { useEffect, useState } from 'react';

import { ProductFilters } from '@/api/products';
import useDebounce from '@/hooks/useDebounce';
import useProductFilter from '@/hooks/useProductFilter';

export default function ProductListFilters() {
  const { search, category, maxPrice, handleFilter } = useProductFilter();
  const [localSearch, setLocalSearch] = useState<ProductFilters['search']>(search);
  const debounceSearch = useDebounce(localSearch);

  useEffect(() => {
    handleFilter({
      search: debounceSearch
    })
  }, [debounceSearch])


  return (
    <div className="flex flex-row gap-2">
      <input
        type="text"
        value={localSearch || ""}
        onChange={(e) => setLocalSearch(e.target.value)}
        placeholder="Search products"
      />
      <select
        value={category || ""}
        onChange={(e) => handleFilter({ category: e.target.value as ProductFilters['category'] })}
      >
        <option value="first">First</option>
        <option value="second">Second</option>
        <option value="third">Third</option>
      </select>
      <select
        value={maxPrice}
        onChange={(e) => handleFilter({ maxPrice: Number(e.target.value) as ProductFilters['maxPrice'] })}
      >
        <option value="100">100</option>
        <option value="500">500</option>
        <option value="1000">1000</option>
      </select>
    </div>
  );
}

import React, { useEffect, useState } from 'react';

const useDebounce = <T>(param: T, delay = 500): T => {
  const [value, setValue] = useState(param as T);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(param);
    }, delay);

    return () => clearTimeout(timeout);
  }, [param]);

  return value;
};

export default useDebounce;

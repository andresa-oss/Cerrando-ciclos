import { useState } from 'react';

export const useCounteroffer = () => {
  const [isUpdatingOffer, setIsUpdatingOffer] = useState(false);

  return {
    isUpdatingOffer,
    setIsUpdatingOffer,
  };
};

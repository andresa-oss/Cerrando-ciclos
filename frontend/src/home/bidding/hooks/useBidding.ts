import { useState } from 'react';

export const useBidding = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateTotal = (activities: { quantity: number; unitValue: number }[]) => {
    return activities.reduce((acc, current) => acc + current.quantity * current.unitValue, 0);
  };

  return {
    isSubmitting,
    setIsSubmitting,
    calculateTotal,
  };
};

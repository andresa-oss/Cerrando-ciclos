import { useMutation } from '@tanstack/react-query';

const submitCounteroffer = async (data: unknown) => {
  return data;
};

export const useSubmitCounteroffer = () => {
  return useMutation({
    mutationFn: submitCounteroffer,
  });
};

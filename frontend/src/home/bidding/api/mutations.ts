import { useMutation } from '@tanstack/react-query';

// Aquí irán las funciones axios de mutación
const submitBidding = async (data: unknown) => {
  // await axios.post('/api/biddings', data)
  return data;
};

export const useSubmitBidding = () => {
  return useMutation({
    mutationFn: submitBidding,
  });
};

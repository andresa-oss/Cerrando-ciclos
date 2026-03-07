import { api } from '@/lib/axios';

export const downloadPDFReceipt = async (offerId: string, filename: string = 'receipt.pdf') => {
  try {
    const response = await api.get(`/api/v1/offers/${offerId}/download_pdf/`, {
      responseType: 'blob',
    });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);

    // Append to html link element page and click it to download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading PDF', error);
    throw error;
  }
};

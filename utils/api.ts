import axios from 'axios';

const api = axios.create({
  baseURL: 'https://minecraft-api.vercel.app/api',
});

export const fetchItems = async () => {
  const { data } = await api.get('/items');
  return data;
};

export const fetchItemDetails = async (namespacedId: string) => {
  try {
    const { data } = await api.get(`/items?namespacedId=${namespacedId}`); 
    if (data.length > 0) {
      return data[0]; 
    } else {
      throw new Error('Item not found');
    }
  } catch (error) {
    console.error("API Error:", error); 
    throw new Error('Failed to fetch item details');
  }
};
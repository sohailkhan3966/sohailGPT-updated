<<<<<<< HEAD
import axios from 'axios';

export const webSearch = async (query: string) => {
  try {
    const response = await axios.get(`http://localhost:3333/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error performing web search:', error);
    throw new Error('Failed to perform web search');
  }
=======
import axios from 'axios';

export const webSearch = async (query: string) => {
  try {
    const response = await axios.get(`http://localhost:3333/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error performing web search:', error);
    throw new Error('Failed to perform web search');
  }
>>>>>>> 819db223 (first commit)
}; 
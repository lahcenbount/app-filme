import axios from 'axios';
import { API_KEY, BASE_URL } from "../services/config";

const createUrl = (endpoint, params = {}) => {
  const url = new URL(endpoint, BASE_URL);
  params.api_key = API_KEY;
  params.language = 'fr'; 
  url.search = new URLSearchParams(params).toString();
  return url;
};


export const getMovies = async (category = 'popular') => {
  try {
    const url = createUrl(`movie/${category}`);
    const response = await axios.get(url);
    return response.data.results || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);
    throw new Error('Erreur lors de la récupération des films');
  }
};


export const getMovieDetails = async (id) => {
  try {
    const url = createUrl(`movie/${id}`);
    const response = await axios.get(url);
    return response.data || {};
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du film:', error);
    throw new Error('Erreur lors de la récupération des détails du film');
  }
};

export const getSimilarMovies = async (id) => {
  try {
    const url = createUrl(`movie/${id}/similar`);
    const response = await axios.get(url);
    return response.data.results || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des films similaires:', error);
    throw new Error('Erreur lors de la récupération des films similaires');
  }
};


export const searchMovies = async (query) => {
  try {
    const url = createUrl('search/movie', { query });
    const response = await axios.get(url);
    return response.data.results || [];
  } catch (error) {
    console.error('Erreur lors de la recherche de films:', error);
    throw new Error('Erreur lors de la recherche de films');
  }
};
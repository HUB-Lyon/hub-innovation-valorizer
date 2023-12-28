const API_URL = process.env.NODE_ENV === 'prod'
  ? 'https://hub.epitech-lyon.fr'
  : 'http://localhost:3000';

export {
  API_URL,
}

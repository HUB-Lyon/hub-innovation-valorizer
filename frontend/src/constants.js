const API_URL = process.env.NODE_ENV === 'prod'
  ? 'https://hub.epitech-lyon.fr'
  : '';

export {
  API_URL,
}

import axios from 'axios';

export default async function companiesList() {
  return await axios.get('/api/companies');
}

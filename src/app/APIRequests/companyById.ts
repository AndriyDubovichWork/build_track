import axios from 'axios';

export default async function companyById(companyID: string) {
  return await axios.get('/api/companies/' + companyID);
}

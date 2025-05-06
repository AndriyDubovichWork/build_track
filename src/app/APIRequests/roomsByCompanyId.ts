import axios from 'axios';

export default async function roomsByCompanyId(companyID: number) {
  return await axios.get('/api/rooms?companyId=' + companyID);
}

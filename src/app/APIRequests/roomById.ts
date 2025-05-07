import axios from 'axios';

export default async function roomById(roomID: string) {
  return await axios.get('/api/rooms/' + roomID);
}

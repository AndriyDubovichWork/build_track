import axios from 'axios';

export default async function tasksByRoomId(roomID: number) {
  return await axios.get('/api/tasks?roomId=' + roomID);
}

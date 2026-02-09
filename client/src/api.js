import axios from 'axios'

export async function lookup(reg) {
  const res = await axios.post('/api/lookup', { reg })
  return res.data
}

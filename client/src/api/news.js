import axios from 'axios'

export const removeItem = (id, cb, token) => {
  try {
    const remove = async () => {
      await axios.delete(`/news/${id}`, {headers: {
        Authorization: 'Bearer ' + token
      }});
      cb();
    };
    remove();
  } catch (e) {
    console.log(e)
  }
}
import axios from 'axios'

export function get () {
  return axios.get('http://localhost:8080/')
    .then((res) => {
      console.log(res)
      return res.data
    }).catch((err) => {
      console.log(err)
    })
}

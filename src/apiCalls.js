// Your fetch requests will live here!
const fetchApiUrl = (path) => {
  return fetch(`https://fitlit-api.herokuapp.com/api/v1/${path}`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(`${path} error`)
}

const fetchAllData = () => {
  return Promise.all([
    fetchApiUrl('users'),
    fetchApiUrl('hydration'),
    fetchApiUrl('sleep')
  ])
}

console.log('I will be a fetch request!')

export default { fetchAllData }
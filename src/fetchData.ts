import fetch, { RequestInfo, RequestInit } from 'node-fetch';

const fetchData = async <T>(url: string): Promise<T> =>
  await fetch(`${url}`)
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => console.log('🔥 Uh oh...', error));

export default fetchData;

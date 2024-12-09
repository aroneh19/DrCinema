import { Base64 } from 'js-base64';

export const baseUrl = 'https://api.kvikmyndir.is';
export const username = 'arona22';
export const password = 'Verksmidja107';
export const base64Credentials = Base64.encode(`${username}:${password}`);

export const getAccessToken = async () => {
  const response = await fetch(`${baseUrl}/authenticate`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64Credentials}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not authenticate');
  }

  return data.token;
};
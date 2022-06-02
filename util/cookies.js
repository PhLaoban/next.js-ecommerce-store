import Cookies from 'js-cookie';

export function getParsedCookie(key) {
  const cookieValue = Cookies.get(key); // Type is string | undefined

  if (!cookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(cookieValue); // Type is string
  } catch (err) {
    return undefined;
  }
}

export function setStringifiedCookie(key, value) {
  Cookies.set(key, JSON.stringify(value));
}

export async function getParsedCookieAsync(key) {
  const cookieValue = await Cookies.get(key); // Type is string | undefined

  if (!cookieValue) {
    return undefined;
  }

  try {
    return await JSON.parse(cookieValue); // Type is string
  } catch (err) {
    return undefined;
  }
}

export const getCSRFToken = () => {
  const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
  return csrfCookie ? csrfCookie.split('=')[1] : null;
};

export const getSessionid = () => {
  const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('sessionid='));
  return csrfCookie ? csrfCookie.split('=')[1] : null;
};

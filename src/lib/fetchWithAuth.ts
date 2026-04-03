export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const res = await fetch(url, options);

  if (res.status === 401) {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  }

  return res;
}
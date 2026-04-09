export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const res = await fetch(url, options);

  if (res.status === 401) {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('nome_usuario');
    localStorage.removeItem('admin');
    window.location.href = '/login';
  }

  return res;
}
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let res: Response;

  try {
    res = await fetch(url, options);
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error('Servidor indisponível no momento. Tente novamente mais tarde.');
    }
    throw err;
  }

  if (res.status === 401) {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('nome_usuario');
    localStorage.removeItem('admin');
    window.location.href = '/login';
  }

  return res;
}
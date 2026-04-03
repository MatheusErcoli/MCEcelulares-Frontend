const API_URL = 'http://localhost:3000';

export async function createEnderecoAPI(id_usuario:number, token:string, formData: FormData) {
  const endereco = formData.get("endereco");
  const numero = formData.get("numero");
  const complemento = formData.get("complemento");
  const bairro = formData.get("bairro");
  const cidade = formData.get("cidade");
  const estado = formData.get("estado");
  const cep = formData.get("cep");
  const response = await fetch(`${API_URL}/endereco`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ id_usuario, endereco, numero, complemento, bairro, cidade, estado, cep })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao cadastrar endereço');
  return data;
}
import { useState } from "react";
import { toast } from 'sonner';

import "../../../styles/Cruds/Actions/PostUsuario.css";

const apiBaseUrl =
  "https://marketplacejoias-api-latest.onrender.com/api/Usuario";

const initialFormState = {
  nome: "",
  cpf: "",
  idade: 0,
  email: "",
  password: "",
  cep: "",
  numero: 0,
  complemento: "",
  endereco: "",
};

const PostUsuario = ({ onUserCreated }) => {
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/PostUsuario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Erro ao criar usuário.");
      toast.success("Usuário criado com sucesso!");
      onUserCreated(); // Atualiza lista ou faz ação no componente pai
      setForm(initialFormState); // Limpa o formulário
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="PostUsuario">
      <form onSubmit={handleCreate}>
        <h2>Cadastro do Usuario</h2>
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <label htmlFor="cpf">CPF</label>
        <input
          id="cpf"
          name="cpf"
          value={form.cpf}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <label htmlFor="idade">Idade</label>
        <input
          id="idade"
          name="idade"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={form.idade}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, "");
            handleChange({ target: { name: "idade", value: onlyNumbers } });
          }}
          required
          disabled={loading}
        />

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <label htmlFor="cep">CEP</label>
        <input
          id="cep"
          name="cep"
          value={form.cep}
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, ""); // remove não-dígitos
            if (value.length > 5) {
              value = value.replace(/^(\d{5})(\d{1,3})/, "$1-$2");
            }
            handleChange({ target: { name: "cep", value } });
          }}
          maxLength={9}
          required
          disabled={loading}
        />

        <label htmlFor="numero">Número</label>
        <input
          id="numero"
          name="numero"
          type="text"
          value={form.numero}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              handleChange(e);
            }
          }}
          min={0}
          required
          disabled={loading}
        />

        <label htmlFor="complemento">Complemento</label>
        <input
          id="complemento"
          name="complemento"
          value={form.complemento}
          onChange={handleChange}
          disabled={loading}
        />

        <label htmlFor="endereco">Endereço</label>
        <input
          id="endereco"
          name="endereco"
          value={form.endereco}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? <div className="crud-spinner"></div> : "Criar"}
        </button>
      </form>
    </div>
  );
};

export default PostUsuario;

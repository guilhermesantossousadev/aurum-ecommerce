import React, { useState } from "react";
import { toast } from "react-toastify";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
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
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <label htmlFor="cpf">CPF</label>
        <input
          id="cpf"
          name="cpf"
          placeholder="CPF"
          value={form.cpf}
          onChange={handleChange}
          required
        />

        <label htmlFor="idade">Idade</label>
        <input
          id="idade"
          name="idade"
          type="number"
          placeholder="Idade"
          value={form.idade}
          onChange={handleChange}
          min={0}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="cep">CEP</label>
        <input
          id="cep"
          name="cep"
          placeholder="CEP"
          value={form.cep}
          onChange={handleChange}
          required
        />

        <label htmlFor="numero">Número</label>
        <input
          id="numero"
          name="numero"
          type="number"
          placeholder="Número"
          value={form.numero}
          onChange={handleChange}
          min={0}
          required
        />

        <label htmlFor="complemento">Complemento</label>
        <input
          id="complemento"
          name="complemento"
          placeholder="Complemento"
          value={form.complemento}
          onChange={handleChange}
        />

        <label htmlFor="endereco">Endereço</label>
        <input
          id="endereco"
          name="endereco"
          placeholder="Endereço"
          value={form.endereco}
          onChange={handleChange}
          required
        />

        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default PostUsuario;

import { span } from "framer-motion/client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiBaseUrl = "https://marketplacejoias-api-latest.onrender.com/api/Usuario"; // ajuste conforme seu backend

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

function CrudUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [editId, setEditId] = useState(null);

  // GET: Listar usuários
  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/GetUsuario`);
      if (!response.ok) throw new Error("Erro ao buscar usuários.");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // POST: Criar usuário
  const handleCreate = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/PostUsuario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Erro ao criar usuário.");
      toast.success("Usuário criado com sucesso!");
      fetchUsuarios();
      setForm(initialFormState);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // PUT: Atualizar usuário
  const handleUpdate = async () => {
    try {
      const updatedUser = { id: editId, ...form };
      const response = await fetch(`${apiBaseUrl}/PutUsuario`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) throw new Error("Erro ao atualizar usuário.");
      toast.success("Usuário atualizado com sucesso!");
      fetchUsuarios();
      setForm(initialFormState);
      setEditId(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // DELETE: Excluir usuário
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiBaseUrl}/DeleteUsuario?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao excluir usuário.");
      toast.success("Usuário excluído com sucesso!");
      fetchUsuarios();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Submit do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Editar usuário
  const handleEdit = (usuario) => {
    setForm(usuario);
    setEditId(usuario.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD de Usuários</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
        />
        <input
          name="cpf"
          placeholder="CPF"
          value={form.cpf}
          onChange={handleChange}
        />
        <input
          name="idade"
          type="number"
          placeholder="Idade"
          value={form.idade}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
        />
        <input
          name="cep"
          placeholder="CEP"
          value={form.cep}
          onChange={handleChange}
        />
        <input
          name="numero"
          type="number"
          placeholder="Número"
          value={form.numero}
          onChange={handleChange}
        />
        <input
          name="complemento"
          placeholder="Complemento"
          value={form.complemento}
          onChange={handleChange}
        />
        <input
          name="endereco"
          placeholder="Endereço"
          value={form.endereco}
          onChange={handleChange}
        />

        <button type="submit">{editId ? "Atualizar" : "Criar"}</button>
      </form>

      {/* Lista de usuários */}
      <div>
        {usuarios.map((usuario) => (
          <div key={usuario.id}>
            <div>
              <strong>ID:</strong> {usuario.id} <br />
              <strong>Nome:</strong> {usuario.nome} <br />
              <strong>Email:</strong> {usuario.email}
            </div>
            <div>
              {usuario.isAdmin ? (
                <button onClick={() => handleEdit(usuario)}>Editar</button>
              ) : (
                <span></span>
              )}
              <button onClick={() => handleDelete(usuario.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default CrudUsuarios;

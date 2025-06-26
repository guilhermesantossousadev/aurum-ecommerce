import React, { useState } from "react";
import { Toaster, toast } from 'sonner';

import "../../../styles/Cruds/Actions/PostNewsletter.css";

const apiBaseUrl =
  "https://marketplacejoias-api-latest.onrender.com/api/Newsletter";

const initialFormState = {
  usuarioId: 0,
  email: "",
};

function PostNewsletter({ onCreated }) {
  const [form, setForm] = useState(initialFormState);

  const handleCreate = async () => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/PostNewsletter?usuarioEmail=${form.email}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) throw new Error("Erro ao criar newsletter.");
      toast.success("Newsletter criada com sucesso!");
      setForm(initialFormState);
      if (onCreated) onCreated();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate();
  };

  return (
    <div className="PostNewsletter">
      <form onSubmit={handleSubmit}>
        <label htmlFor="usuarioId">Usuário ID</label>
        <input
          name="usuarioId"
          type="number"
          placeholder="ID do Usuário"
          value={form.usuarioId}
          onChange={(e) => setForm({ ...form, usuarioId: e.target.value })}
        />

        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <button type="submit">Criar</button>
      </form>
    </div>
  );
}

export default PostNewsletter;

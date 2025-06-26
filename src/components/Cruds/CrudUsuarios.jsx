import React, { useState, useEffect } from "react";
import { Toaster, toast } from 'sonner';

import UsuarioForm from "../Cruds/Actions/PostUsuario";

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

function CrudUsuarios() {
  const [step, setStep] = useState(0);
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsuarios = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiBaseUrl}/GetUsuario`);
      if (!response.ok) throw new Error("Erro ao buscar usuários.");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

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

  const confirmDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Tem certeza que deseja deletar este usuário?</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={async () => {
                await handleDelete(id);
                closeToast();
              }}
              style={{
                background: "#d9534f",
                color: "white",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              Deletar
            </button>
            <button
              onClick={closeToast}
              style={{
                background: "#6c757d",
                color: "white",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEdit = (usuario) => {
    setForm(usuario);
    setEditId(usuario.id);
    setStep(1);
  };

  return (
    <div className="Separator">
      {step === 1 && (
        <div>
          <div className="Principal__Create">
            <button
              className="Principal__Create__button"
              onClick={() => {
                setStep(0);
                setEditId(null);
                setForm(initialFormState);
              }}
            >
              Voltar
            </button>
          </div>
          <div className="Principal">
            <UsuarioForm
              form={form}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              editId={editId}
            />
          </div>
        </div>
      )}

      {step === 0 && (
        <div className="Principal">
          <div className="Principal__Create">
            <button
              className="Principal__Create__button"
              onClick={() => {
                setStep(1);
                setEditId(null);
                setForm(initialFormState);
              }}
            >
              Criar Usuário
            </button>
          </div>

          <section className="Principal__box">
            <div className="Principal__box__detalhes">
              <div className="Principal__box__detalhes__item">ID</div>
              <div className="Principal__box__detalhes__item">Nome</div>
              <div className="Principal__box__detalhes__item">Email</div>
              <div className="Principal__box__detalhes__item">Ações</div>
            </div>

            {isLoading ? (
              <p className="Principal__box__item__inside">Carregando...</p>
            ) : usuarios.length === 0 ? (
              <p className="Principal__box__item__inside">
                Nenhum usuário encontrado.
              </p>
            ) : (
              <ul>
                {usuarios.map((usuario) => (
                  <li key={usuario.id} className="Principal__box__item">
                    <div className="Principal__box__item__inside">
                      {usuario.id}
                    </div>
                    <div className="Principal__box__item__inside">
                      {usuario.nome}
                    </div>
                    <div className="Principal__box__item__inside">
                      {usuario.email}
                    </div>
                    <div className="Principal__box__item__inside acoes">
                      {usuario.isAdmin && (
                        <button onClick={() => handleEdit(usuario)}>
                          Editar
                        </button>
                      )}
                      <button onClick={() => confirmDelete(usuario.id)}>
                        Excluir
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default CrudUsuarios;

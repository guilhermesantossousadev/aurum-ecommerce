// ... imports
import React, { useState, useEffect } from "react";
import { Toaster, toast } from 'sonner';

import PostNewsletter from "../Cruds/Actions/PostNewsletter";
import SendNewsletterMessage from "../Cruds/Actions/PostNewsletterMessage";

const apiBaseUrl =
  "https://marketplacejoias-api-latest.onrender.com/api/Newsletter";

const initialFormState = {
  id: 0,
  usuarioId: 0,
  email: "",
};

function CrudNewsletter() {
  const [step, setStep] = useState(0);
  const [newsletters, setNewsletters] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNewsletters = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiBaseUrl}/GetNewsletter`);
      if (!response.ok) throw new Error("Erro ao buscar newsletters.");
      const data = await response.json();
      setNewsletters(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const handleUpdate = async () => {
    try {
      const updatedNewsletter = {
        id: editId,
        usuarioId: form.usuarioId,
        email: form.email,
      };

      const response = await fetch(`${apiBaseUrl}/PutNewsletter`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedNewsletter),
      });

      if (!response.ok) throw new Error("Erro ao atualizar newsletter.");
      toast.success("Newsletter atualizada com sucesso!");
      fetchNewsletters();
      setForm(initialFormState);
      setEditId(null);
      setStep(0);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiBaseUrl}/DeleteNewsletter?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao excluir newsletter.");
      toast.success("Newsletter excluída com sucesso!");
      fetchNewsletters();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const confirmDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Tem certeza que deseja excluir esta newsletter?</p>
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
              Excluir
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      handleUpdate();
    }
  };

  const handleEdit = (newsletter) => {
    setForm({
      usuarioId: newsletter.usuarioId,
      email: newsletter.email,
    });
    setEditId(newsletter.id);
    setStep(1);
  };

  const handleBack = () => {
    setStep(0);
    setEditId(null);
    setForm(initialFormState);
  };

  return (
    <div className="Separator">
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
              Cadastrar E-mail
            </button>
            <button
              className="Principal__Create__button"
              onClick={() => {
                setStep(2);
                setEditId(null);
                setForm(initialFormState);
              }}
            >
              Criar Mensagem
            </button>
          </div>

          <section className="Principal__box">
            <div className="Principal__box__detalhes">
              <div className="Principal__box__detalhes__item">ID</div>
              <div className="Principal__box__detalhes__item">Usuário ID</div>
              <div className="Principal__box__detalhes__item">Email</div>
              <div className="Principal__box__detalhes__item">Ações</div>
            </div>

            {isLoading ? (
              <p className="Principal__box__item__inside">Carregando...</p>
            ) : newsletters.length === 0 ? (
              <p className="Principal__box__item__inside">
                Nenhuma newsletter encontrada.
              </p>
            ) : (
              <ul>
                {newsletters.map((newsletter) => (
                  <li key={newsletter.id} className="Principal__box__item">
                    <div className="Principal__box__item__inside">
                      {newsletter.id}
                    </div>
                    <div className="Principal__box__item__inside">
                      {newsletter.usuarioId}
                    </div>
                    <div className="Principal__box__item__inside">
                      {newsletter.email}
                    </div>
                    <div className="Principal__box__item__inside acoes">
                      <button onClick={() => handleEdit(newsletter)}>
                        Editar
                      </button>
                      <button onClick={() => confirmDelete(newsletter.id)}>
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

      {/* Cadastro e edição */}
      {step === 1 &&
        (editId ? (
          <div className="Separator">
            <div className="Principal">
              <div className="Principal__Create">
                <button
                  className="Principal__Create__button"
                  onClick={() => setStep(0)}
                >
                  Voltar
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <h3>Editar Newsletter</h3>
                <label htmlFor="usuarioId">Usuário ID</label>
                <input
                  id="usuarioId"
                  name="usuarioId"
                  type="number"
                  placeholder="ID do Usuário"
                  value={form.usuarioId}
                  onChange={(e) =>
                    setForm({ ...form, usuarioId: e.target.value })
                  }
                  required
                />

                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />

                <button type="submit" className="Principal__Create__button">
                  Atualizar
                </button>
                <button
                  type="button"
                  className="Principal__Create__button"
                  onClick={handleBack}
                >
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="Principal">
            <div className="Principal__Create">
              <button
                className="Principal__Create__button"
                onClick={() => setStep(0)}
              >
                Voltar
              </button>
            </div>
            <PostNewsletter
              onCreated={() => {
                fetchNewsletters();
                setStep(0);
              }}
            />
          </div>
        ))}

      {/* Envio de mensagem */}
      {step === 2 && (
        <div className="Principal">
          <div className="Principal__Create">
            <button
              className="Principal__Create__button"
              onClick={() => setStep(0)}
            >
              Voltar
            </button>
          </div>
          <SendNewsletterMessage />
        </div>
      )}
    </div>
  );
}

export default CrudNewsletter;

// ... imports
import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";

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
  const [messagenewsletters, setMessageNewsletters] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessageNewsletters = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiBaseUrl}/GetMessagesNewsletter`);
      if (!response.ok)
        throw new Error("Erro ao buscar mensagens newsletters.");
      const datamessage = await response.json();
      setMessageNewsletters(datamessage);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
    fetchMessageNewsletters();
  }, []);

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
    const toastId = toast.custom((t) => (
      <div
        style={{
          background: "white",
          padding: "1rem",
          borderRadius: "8px",
          maxWidth: "300px",
          textAlign: "center",
        }}
      >
        <p>Tem certeza que deseja deletar este cadastro da newsletter?</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <button
            onClick={async () => {
              await handleDelete(id);
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
            onClick={() => toast.dismiss(t.id)}
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
    ));
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
      {isLoading ? (
        <div className="crud-spinner-wrapper">
          <div className="crud-spinner"></div>
        </div>
      ) : (
        <>
          {step === 0 && (
            <div className="Principal">
              <div className="Principal__Create">
                <div className="Principal__Create__item left">
                  <h2>Newsletter</h2>
                </div>
                <div className="Principal__Create__item right">
                  <button
                    onClick={() => {
                      setStep(1);
                      setEditId(null);
                      setForm(initialFormState);
                    }}
                    style={{
                      background: "#3f4d67",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Criar Mensagem
                  </button>
                </div>
              </div>

              <section className="Principal__box">
                <div className="Principal__box__detalhes">
                  <div className="Principal__box__detalhes__item">ID</div>
                  <div className="Principal__box__detalhes__item">
                    Usuário ID
                  </div>
                  <div className="Principal__box__detalhes__item">Email</div>

                  {/* Ações newsletter (descomentadas se quiser usar)
                <div className="Principal__box__detalhes__item">Ações</div>
                */}
                </div>

                {newsletters.length === 0 ? (
                  <p className="Principal__box__item__inside">
                    Nenhum cadastro na newsletter encontrado.
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

                        {/* Ações newsletter (descomentadas se quiser usar)
                      <div className="Principal__box__item__inside acoes">
                        <button onClick={() => handleEdit(newsletter)}>
                          Editar
                        </button>
                        <button
                          onClick={() => confirmDelete(newsletter.id)}
                          style={{ backgroundColor: "#b50f0f" }}
                        >
                          Excluir
                        </button>
                      </div>
                      */}
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <div
                className="Principal__Create"
                style={{ paddingTop: "5rem", paddingBottom: "1rem" }}
              >
                <div className="Principal__Create__item left">
                  <h2>Mensagens Newsletter</h2>
                </div>
                <div className="Principal__Create__item right"></div>
              </div>

              <section className="Principal__box">
                <div className="Principal__box__detalhes">
                  <div className="Principal__box__detalhes__item">data</div>
                  <div className="Principal__box__detalhes__item">titulo</div>
                  <div className="Principal__box__detalhes__item">mensagem</div>

                  {/* Ações newsletter (descomentadas se quiser usar)
                <div className="Principal__box__detalhes__item">Ações</div>
                */}
                </div>

                {messagenewsletters.length === 0 ? (
                  <p className="Principal__box__item__inside">
                    Nenhuma mensagem da newsletter encontrada.
                  </p>
                ) : (
                  <ul>
                    {messagenewsletters.map((messagenewsletter) => (
                      <li
                        key={messagenewsletter.id}
                        className="Principal__box__item"
                      >
                        <div className="Principal__box__item__inside">
                          {new Date(messagenewsletter.data).toLocaleDateString(
                            "pt-BR"
                          )}
                        </div>
                        <div className="Principal__box__item__inside">
                          {messagenewsletter.titulo}
                        </div>
                        <div className="Principal__box__item__inside">
                          {messagenewsletter.mensagem}
                        </div>
                        {/* Ações newsletter (descomentadas se quiser usar)
                      <div className="Principal__box__item__inside acoes">
                        <button onClick={() => handleEdit(newsletter)}>
                          Editar
                        </button>
                        <button
                          onClick={() => confirmDelete(newsletter.id)}
                          style={{ backgroundColor: "#b50f0f" }}
                        >
                          Excluir
                        </button>
                      </div>
                      */}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          )}

          {step === 1 && (
            <div className="Principal">
              <div className="Principal__Create">
                <div className="Principal__Create__item left">
                  <h2>Newsletter</h2>
                </div>
                <div className="Principal__Create__item right">
                  <button
                    onClick={() => setStep(0)}
                    style={{
                      background: "#3f4d67",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Voltar
                  </button>
                </div>
              </div>
              <SendNewsletterMessage />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CrudNewsletter;

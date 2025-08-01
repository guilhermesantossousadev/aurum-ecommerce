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
              Criar Mensagem
            </button>
          </div>

          <section className="Principal__box">
            <div className="Principal__box__detalhes">
              <div className="Principal__box__detalhes__item">ID</div>
              <div className="Principal__box__detalhes__item">Usuário ID</div>
              <div className="Principal__box__detalhes__item">Email</div>

              {/* Ações newsletter
              <div className="Principal__box__detalhes__item">Ações</div>      
              */}
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

                    {/* Ações newsletter
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

      {/* Envio de mensagem */}
      {step === 1 && (
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

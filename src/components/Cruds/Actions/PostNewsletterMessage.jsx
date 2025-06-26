import React, { useState } from "react";
import { Toaster, toast } from 'sonner';

const apiBaseUrl =
  "https://marketplacejoias-api-latest.onrender.com/api/Newsletter";

const initialMessageState = {
  titulo: "",
  mensagem: "",
};

function PostNewsletterMessage() {
  const [messageForm, setMessageForm] = useState(initialMessageState);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/PostMessageNewsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageForm),
      });
      if (!response.ok) throw new Error("Erro ao enviar mensagem.");
      toast.success("Mensagem enviada com sucesso!");
      setMessageForm(initialMessageState);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="PostNewsletterMessage">
      <h3>Enviar Mensagem de Newsletter</h3>
      <form onSubmit={handleSendMessage}>
        <label htmlFor="titulo">Título</label>
        <input
          name="titulo"
          placeholder="Título"
          value={messageForm.titulo}
          onChange={(e) =>
            setMessageForm({ ...messageForm, titulo: e.target.value })
          }
        />

        <label htmlFor="mensagem">Mensagem</label>
        <textarea
          name="mensagem"
          placeholder="Mensagem"
          value={messageForm.mensagem}
          onChange={(e) =>
            setMessageForm({ ...messageForm, mensagem: e.target.value })
          }
        />

        <button type="submit">Enviar Mensagem</button>
      </form>
    </div>
  );
}

export default PostNewsletterMessage;

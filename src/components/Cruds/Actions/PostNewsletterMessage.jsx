import { useState } from "react";
import { toast } from 'sonner';

const apiBaseUrl =
  "https://marketplacejoias-api-latest.onrender.com/api/Newsletter";

const initialMessageState = {
  titulo: "",
  mensagem: "",
};

function PostNewsletterMessage() {
  const [messageForm, setMessageForm] = useState(initialMessageState);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="PostNewsletterMessage">
      <h3>Enviar Mensagem de Newsletter</h3>
      <form onSubmit={handleSendMessage}>
        <label htmlFor="titulo">Título</label>
        <input
          name="titulo"
          value={messageForm.titulo}
          onChange={(e) =>
            setMessageForm({ ...messageForm, titulo: e.target.value })
          }
          disabled={loading}
        />

        <label htmlFor="mensagem">Mensagem</label>
        <textarea
          name="mensagem"
          value={messageForm.mensagem}
          onChange={(e) =>
            setMessageForm({ ...messageForm, mensagem: e.target.value })
          }
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? <div className="crud-spinner"></div> : "Enviar Mensagem"}
        </button>
      </form>
    </div>
  );
}

export default PostNewsletterMessage;

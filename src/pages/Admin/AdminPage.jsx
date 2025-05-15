import { useState } from "react";
import "../../styles/Admin/AdminPage.css";

function AdminPage() {
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const postNewsLetter = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");
    setError("");

    try {
      const response = await fetch(
        "https://localhost:7081/api/Newsletter/PostMessageNewsletter",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ titulo, mensagem }),
        }
      );

      if (!response.ok) throw new Error("Erro ao cadastrar uma newsletter");

      setFeedback("Newsletter cadastrada com sucesso!");
      setTitulo("");
      setMensagem("");
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao cadastrar a newsletter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Admin">
      <form onSubmit={postNewsLetter}>
        <h1>Adicionar uma newsletter</h1>

        <label htmlFor="titulo">Título</label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Digite o Titulo"
          required
        />

        <label htmlFor="mensagem">Mensagem</label>
        <textarea
          id="mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          rows={4}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>

        {feedback && <p className="feedback">{feedback}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default AdminPage;

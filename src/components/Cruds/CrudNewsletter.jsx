import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiBaseUrl = "https://marketplacejoias-api-latest.onrender.com/api/Newsletter";

const initialFormState = {
    id: 0,
    usuarioId: 0,
    email: "",
};

const initialMessageState = {
    titulo: "",
    mensagem: "",
};

function CrudNewsletter() {
    const [newsletters, setNewsletters] = useState([]);
    const [form, setForm] = useState(initialFormState);
    const [editId, setEditId] = useState(null);
    const [messageForm, setMessageForm] = useState(initialMessageState);

    // GET: Listar newsletters
    const fetchNewsletters = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/GetNewsletter`);
            if (!response.ok) throw new Error("Erro ao buscar newsletters.");
            const data = await response.json();
            setNewsletters(data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchNewsletters();
    }, []);

    // POST: Criar newsletter
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
            fetchNewsletters();
            setForm(initialFormState);
        } catch (error) {
            toast.error(error.message);
        }
    };

    // PUT: Atualizar newsletter
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
        } catch (error) {
            toast.error(error.message);
        }
    };

    // DELETE: Excluir newsletter
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

    // Submit do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            handleUpdate();
        } else {
            handleCreate();
        }
    };

    // Editar newsletter
    const handleEdit = (newsletter) => {
        setForm({
            usuarioId: newsletter.usuarioId,
            email: newsletter.email,
        });
        setEditId(newsletter.id);
    };

    // Enviar mensagem para newsletter
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
        <div style={{ padding: "20px" }}>
            <ToastContainer />
            <h2>CRUD de Newsletter</h2>

            {/* Formulário Newsletter */}
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

                <button type="submit">{editId ? "Atualizar" : "Criar"}</button>
            </form>

            {/* Lista de newsletters */}
            <div>
                {newsletters.map((newsletter) => (
                    <div
                        key={newsletter.id}
                    >
                        <div>
                            <strong>ID:</strong> {newsletter.id} <br />
                            <strong>Usuário ID:</strong> {newsletter.usuarioId} <br />
                            <strong>Email:</strong> {newsletter.email}
                        </div>
                        <div style={{ marginTop: "5px" }}>
                            <button onClick={() => handleEdit(newsletter)}>Editar</button>
                            <button onClick={() => handleDelete(newsletter.id)}>
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Formulário de envio de mensagem */}
            <div style={{ marginTop: "30px" }}>
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
        </div>
    );
}

export default CrudNewsletter;

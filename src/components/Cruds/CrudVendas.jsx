import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

const apiBaseUrl = "https://marketplacejoias-api-latest.onrender.com/api/Venda";

const initialFormState = {
    usuarioId: 0,
    anunciosId: { anunciosId: [""] }, // começa vazio
    valorTotal: 0,
    formaPagamento: "",
    isiInstallments: false,
    numeroParcelas: 0,
};

function CrudVendas() {
    const [vendas, setVendas] = useState([]);
    const [form, setForm] = useState(initialFormState);
    const [editId, setEditId] = useState(null);

    // GET: Listar vendas
    const fetchVendas = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/GetVenda`);
            if (!response.ok) throw new Error("Erro ao buscar vendas.");
            const data = await response.json();
            setVendas(data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchVendas();
    }, []);

    // POST: Criar venda
    const handleCreate = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/PostVenda`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!response.ok) throw new Error("Erro ao criar venda.");
            toast.success("Venda criada com sucesso!");
            fetchVendas();
            setForm(initialFormState);
        } catch (error) {
            toast.error(error.message);
        }
    };

    // PUT: Atualizar venda
    const handleUpdate = async () => {
        try {
            const updatedVenda = { id: editId, ...form };
            const response = await fetch(`${apiBaseUrl}/PutVenda`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedVenda),
            });
            if (!response.ok) throw new Error("Erro ao atualizar venda.");
            toast.success("Venda atualizada com sucesso!");
            fetchVendas();
            setForm(initialFormState);
            setEditId(null);
        } catch (error) {
            toast.error(error.message);
        }
    };

    // DELETE: Excluir venda
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${apiBaseUrl}/DeleteVenda?id=${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Erro ao excluir venda.");
            toast.success("Venda excluída com sucesso!");
            fetchVendas();
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
        const { name, value, type, checked } = e.target;
        if (name === "isiInstallments") {
            setForm({ ...form, [name]: checked });
        } else if (name === "anunciosId") {
            // transforma em lista única
            const anunciosArray = value.split(",").map((item) => item.trim());
            setForm({
                ...form,
                anunciosId: { anunciosId: anunciosArray },
            });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    // Editar venda
    const handleEdit = (venda) => {
        setForm({
            usuarioId: venda.usuarioId,
            anunciosId: venda.anunciosId,
            valorTotal: venda.valorTotal,
            formaPagamento: venda.formaPagamento,
            isiInstallments: venda.isiInstallments,
            numeroParcelas: venda.numeroParcelas,
        });
        setEditId(venda.id);
    };

    return (
        <div style={{ padding: "20px" }}>
            <ToastContainer />
            <h2>CRUD de Vendas</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="usuarioId">usuarioId</label>
                <input
                    name="usuarioId"
                    type="number"
                    placeholder="ID do Usuário"
                    value={form.usuarioId}
                    onChange={handleChange}
                />
                <label htmlFor="anunciosId">anunciosId</label>
                <input
                    name="anunciosId"
                    placeholder="IDs de Anúncios (separados por vírgula)"
                    value={form.anunciosId.anunciosId.join(", ")}
                    onChange={handleChange}
                />
                <label htmlFor="valorTotal">valorTotal</label>
                <input
                    name="valorTotal"
                    type="number"
                    step="0.01"
                    placeholder="Valor Total"
                    value={form.valorTotal}
                    onChange={handleChange}
                />
                <label htmlFor="formaPagamento">formaPagamento</label>
                <input
                    name="formaPagamento"
                    placeholder="Forma de Pagamento"
                    value={form.formaPagamento}
                    onChange={handleChange}
                />
                <label>
                    Parcelado?
                    <input
                        name="isiInstallments"
                        type="checkbox"
                        checked={form.isiInstallments}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="numeroParcelas">numeroParcelas</label>
                <input
                    name="numeroParcelas"
                    type="number"
                    placeholder="Número de Parcelas"
                    value={form.numeroParcelas}
                    onChange={handleChange}
                    disabled={!form.isiInstallments}
                />

                <button type="submit">{editId ? "Atualizar" : "Criar"}</button>
            </form>

            {/* Lista de vendas */}
            <div>
                {vendas.map((venda) => (
                    <div key={venda.id}>
                        <div>
                            <strong>ID:</strong> {venda.id} <br />
                            <strong>Usuário:</strong> {venda.usuarioId} <br />
                            <strong>Anúncios:</strong>{" "}
                            {venda.anunciosId.anunciosId.join(", ")} <br />
                            <strong>Valor Total:</strong> R$ {venda.valorTotal} <br />
                            <strong>Pagamento:</strong> {venda.formaPagamento} <br />
                            <strong>Parcelado:</strong> {venda.isiInstallments ? "Sim" : "Não"} <br />
                            {venda.isiInstallments && (
                                <>
                                    <strong>Parcelas:</strong> {venda.numeroParcelas}
                                </>
                            )}
                        </div>
                        <div style={{ marginTop: "5px" }}>
                            <button onClick={() => handleEdit(venda)}>Editar</button>
                            <button onClick={() => handleDelete(venda.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CrudVendas;

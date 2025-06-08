import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiBaseUrl = "https://marketplacejoias-api-latest.onrender.com/api/Joia";

const initialFormState = {
    tipoPeca: "",
    valor: 0,
    descricao: "",
    peso: 0,
    material: "",
    isStudded: false,
    materialCravejado: "",
    tamanho: 0,
    formato: "",
    tipoFecho: "",
    modelo: "",
    altura: 0,
    pesoIndividual: 0,
    comprimento: 0,
    espessura: 0,
    havePendant: false,
    tipoCorrente: "",
    regiao: "",
    fechamento: "",
    isAntiallergic: false,
    haveCharms: false,
    flexibilidade: "",
    tipoMovimento: "",
    haveWaterResistance: false,
    diametroCaixa: 0,
    materialPulseira: "",
    fonteEnergia: ""
};

function CrudJoias() {
    const [joias, setJoias] = useState([]);
    const [form, setForm] = useState(initialFormState);
    const [editId, setEditId] = useState(null);

    // Fetch
    const fetchJoias = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/GetJoia`);
            if (!response.ok) throw new Error("Erro ao buscar joias.");
            const data = await response.json();
            setJoias(data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchJoias();
    }, []);

    // Handlers
    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            handleUpdate();
        } else {
            handleCreate();
        }
    };

    const handleCreate = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/PostJoia`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            if (!response.ok) throw new Error("Erro ao criar joia.");
            toast.success("Joia criada com sucesso!");
            fetchJoias();
            setForm(initialFormState);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleUpdate = async () => {
        try {
            const updatedJoia = { ...form, id: editId };
            const response = await fetch(`${apiBaseUrl}/PutJoia`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedJoia)
            });
            if (!response.ok) throw new Error("Erro ao atualizar joia.");
            toast.success("Joia atualizada com sucesso!");
            fetchJoias();
            setForm(initialFormState);
            setEditId(null);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleEdit = (joia) => {
        setForm(joia);
        setEditId(joia.id);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${apiBaseUrl}/DeleteJoia?id=${id}`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error("Erro ao excluir joia.");
            toast.success("Joia excluída com sucesso!");
            fetchJoias();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const renderSpecificInputs = () => {
        switch (form.tipoPeca) {
            case "Anel":
                return (
                    <>
                        <label>Tamanho</label>
                        <input
                            type="number"
                            value={form.tamanho}
                            onChange={(e) => handleChange("tamanho", Number(e.target.value))}
                        />
                        <label>Formato</label>
                        <input
                            type="text"
                            value={form.formato}
                            onChange={(e) => handleChange("formato", e.target.value)}
                        />
                    </>
                );
            case "Brinco":
                return (
                    <>
                        <label>Tipo Fecho</label>
                        <input
                            type="text"
                            value={form.tipoFecho}
                            onChange={(e) => handleChange("tipoFecho", e.target.value)}
                        />
                        <label>Modelo</label>
                        <input
                            type="text"
                            value={form.modelo}
                            onChange={(e) => handleChange("modelo", e.target.value)}
                        />
                    </>
                );
            case "Colar":
                return (
                    <>
                        <label>Comprimento</label>
                        <input
                            type="number"
                            value={form.comprimento}
                            onChange={(e) =>
                                handleChange("comprimento", Number(e.target.value))
                            }
                        />
                        <label>Have Pendant</label>
                        <input
                            type="checkbox"
                            checked={form.havePendant}
                            onChange={(e) => handleChange("havePendant", e.target.checked)}
                        />
                        <label>Tipo Corrente</label>
                        <input
                            type="text"
                            value={form.tipoCorrente}
                            onChange={(e) => handleChange("tipoCorrente", e.target.value)}
                        />
                    </>
                );
            case "Piercing":
                return (
                    <>
                        <label>Região</label>
                        <input
                            type="text"
                            value={form.regiao}
                            onChange={(e) => handleChange("regiao", e.target.value)}
                        />
                        <label>Fechamento</label>
                        <input
                            type="text"
                            value={form.fechamento}
                            onChange={(e) => handleChange("fechamento", e.target.value)}
                        />
                        <label>Antialérgico</label>
                        <input
                            type="checkbox"
                            checked={form.isAntiallergic}
                            onChange={(e) =>
                                handleChange("isAntiallergic", e.target.checked)
                            }
                        />
                    </>
                );
            case "Pingente":
                return (
                    <>
                        <label>Altura</label>
                        <input
                            type="number"
                            value={form.altura}
                            onChange={(e) => handleChange("altura", Number(e.target.value))}
                        />
                        <label>Peso Individual</label>
                        <input
                            type="number"
                            value={form.pesoIndividual}
                            onChange={(e) =>
                                handleChange("pesoIndividual", Number(e.target.value))
                            }
                        />
                        <label>Espessura</label>
                        <input
                            type="number"
                            value={form.espessura}
                            onChange={(e) => handleChange("espessura", Number(e.target.value))}
                        />
                    </>
                );
            case "Pulseira":
                return (
                    <>
                        <label>Have Charms</label>
                        <input
                            type="checkbox"
                            checked={form.haveCharms}
                            onChange={(e) => handleChange("haveCharms", e.target.checked)}
                        />
                        <label>Flexibilidade</label>
                        <input
                            type="text"
                            value={form.flexibilidade}
                            onChange={(e) => handleChange("flexibilidade", e.target.value)}
                        />
                    </>
                );
            case "Relogio":
                return (
                    <>
                        <label>Tipo Movimento</label>
                        <input
                            type="text"
                            value={form.tipoMovimento}
                            onChange={(e) => handleChange("tipoMovimento", e.target.value)}
                        />
                        <label>Resistente à Água</label>
                        <input
                            type="checkbox"
                            checked={form.haveWaterResistance}
                            onChange={(e) =>
                                handleChange("haveWaterResistance", e.target.checked)
                            }
                        />
                        <label>Diâmetro Caixa</label>
                        <input
                            type="number"
                            value={form.diametroCaixa}
                            onChange={(e) =>
                                handleChange("diametroCaixa", Number(e.target.value))
                            }
                        />
                        <label>Material Pulseira</label>
                        <input
                            type="text"
                            value={form.materialPulseira}
                            onChange={(e) =>
                                handleChange("materialPulseira", e.target.value)
                            }
                        />
                        <label>Fonte de Energia</label>
                        <input
                            type="text"
                            value={form.fonteEnergia}
                            onChange={(e) => handleChange("fonteEnergia", e.target.value)}
                        />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ maxWidth: 800, margin: "auto", padding: 16 }}>
            <h2>{editId ? "Editar Joia" : "Cadastrar Joia"}</h2>
            <form onSubmit={handleSubmit}>
                <label>Tipo da Peça</label>
                <select
                    value={form.tipoPeca}
                    onChange={(e) => handleChange("tipoPeca", e.target.value)}
                    required
                >
                    <option value="">-- Selecione --</option>
                    <option value="Anel">Anel</option>
                    <option value="Brinco">Brinco</option>
                    <option value="Colar">Colar</option>
                    <option value="Piercing">Piercing</option>
                    <option value="Pingente">Pingente</option>
                    <option value="Pulseira">Pulseira</option>
                    <option value="Relogio">Relógio</option>
                </select>

                <label>Valor</label>
                <input
                    type="number"
                    step="0.01"
                    value={form.valor}
                    onChange={(e) => handleChange("valor", Number(e.target.value))}
                />

                <label>Descrição</label>
                <textarea
                    value={form.descricao}
                    onChange={(e) => handleChange("descricao", e.target.value)}
                />

                <label>Peso</label>
                <input
                    type="number"
                    step="0.01"
                    value={form.peso}
                    onChange={(e) => handleChange("peso", Number(e.target.value))}
                />

                <label>Material</label>
                <input
                    type="text"
                    value={form.material}
                    onChange={(e) => handleChange("material", e.target.value)}
                />

                {/* Campos específicos */}
                {renderSpecificInputs()}

                <button type="submit">
                    {editId ? "Atualizar Joia" : "Cadastrar Joia"}
                </button>
            </form>

            <hr />

            <h2>Lista de Joias</h2>
            {joias.length === 0 ? (
                <p>Nenhuma joia cadastrada.</p>
            ) : (
                <div>
                    {joias.map((joia) => (
                        <div
                            key={joia.id}
                        >
                            <div >
                                <strong>ID:</strong>
                                <span>{joia.id}</span>
                            </div>
                            <div >
                                <strong>Tipo:</strong>
                                <span>{joia.tipoPeca}</span>
                            </div>
                            <div >
                                <strong>Descrição:</strong>
                                <span>{joia.descricao}</span>
                            </div>
                            <div >
                                <strong>Valor:</strong>
                                <span>{joia.valor}</span>
                            </div>
                            <div >
                                <strong>Peso:</strong>
                                <span>{joia.peso}</span>
                            </div>
                            <div >
                                <strong>Material:</strong>
                                <span>{joia.material}</span>
                            </div>
                            <div>
                                <button onClick={() => handleEdit(joia)}>Editar</button>
                                <button onClick={() => handleDelete(joia.id)}>Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ToastContainer />
        </div>
    );
}

export default CrudJoias;

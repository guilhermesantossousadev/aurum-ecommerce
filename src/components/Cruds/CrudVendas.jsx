import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import "../../styles/Cruds/Cruds.css";

const apiBaseUrl = "https://marketplacejoias-api-latest.onrender.com/api/Venda";

const initialFormState = {
  usuarioId: 0,
  anunciosId: { anunciosId: [""] },
  valorTotal: 0,
  formaPagamento: "",
  isiInstallments: false,
  numeroParcelas: 0,
};

function CrudVendas() {
  const [vendas, setVendas] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [editId, setEditId] = useState(null);

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

  const confirmDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Tem certeza que deseja deletar esta venda?</p>
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

  return (
    <div className="Separator">
      <div className="Principal">
        <div className="Principal__Create">
          <h2 style={{ margin: 0, color: "#333" }}>Vendas</h2>
        </div>

        <section className="Principal__box">
          <div className="Principal__box__detalhes">
            <div className="Principal__box__detalhes__item">ID</div>
            <div className="Principal__box__detalhes__item">Usuário</div>
            <div className="Principal__box__detalhes__item">Anúncios</div>
            <div className="Principal__box__detalhes__item">Valor</div>
            <div className="Principal__box__detalhes__item">Pagamento</div>
            <div className="Principal__box__detalhes__item">Parcelado</div>
            <div className="Principal__box__detalhes__item">Ações</div>
          </div>

          {vendas.length === 0 ? (
            <p className="Principal__box__item__inside">
              Nenhuma venda encontrada.
            </p>
          ) : (
            <ul>
              {vendas.map((venda) => (
                <li key={venda.id} className="Principal__box__item">
                  <div className="Principal__box__item__inside">{venda.id}</div>
                  <div className="Principal__box__item__inside">
                    {venda.usuarioId}
                  </div>
                  <div className="Principal__box__item__inside">
                    {venda.anunciosId.anunciosId.join(", ")}
                  </div>
                  <div className="Principal__box__item__inside">
                    R$ {venda.valorTotal}
                  </div>
                  <div className="Principal__box__item__inside">
                    {venda.formaPagamento}
                  </div>
                  <div className="Principal__box__item__inside">
                    {venda.isiInstallments
                      ? `Sim (${venda.numeroParcelas}x)`
                      : "Não"}
                  </div>
                  <div className="Principal__box__item__inside acoes">
                    <button onClick={() => confirmDelete(venda.id)}>
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default CrudVendas;

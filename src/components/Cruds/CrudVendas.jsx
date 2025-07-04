import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import "../../styles/Cruds/Cruds.css";

const apiBaseUrl = "https://marketplacejoias-api-latest.onrender.com/api/Venda";

const initialFormState = {
  id: 0,
  valorTransacao: 0,
  valorLiquio: 0,
  status: "",
  metodoPagamento: "",
  parcelas: 0,
  emailPagador: "",
  dataCriacao: "",
  dataAprovacao: "",
  informacaoAdicional: "",
};

function CrudVendas() {
  const [vendas, setVendas] = useState([]);
  const [form, setForm] = useState(initialFormState);

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

  return (
    <div className="Separator">
      <div className="Principal">
        <div className="Principal__Create">
          <h2>Vendas</h2>
        </div>

        <section className="Principal__box">
          <div className="Principal__box__detalhes">
            <div className="Principal__box__detalhes__item">ID</div>
            <div className="Principal__box__detalhes__item">Transação</div>
            <div className="Principal__box__detalhes__item">Líquido</div>
            <div className="Principal__box__detalhes__item">Status</div>
            <div className="Principal__box__detalhes__item">Pagamento</div>
            <div className="Principal__box__detalhes__item">Parcelas</div>
            <div className="Principal__box__detalhes__item">Email</div>
            <div className="Principal__box__detalhes__item">Criação</div>
            <div className="Principal__box__detalhes__item">Aprovação</div>
            <div className="Principal__box__detalhes__item">Informações</div>
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
                    R$ {venda.valorTransacao}
                  </div>
                  <div className="Principal__box__item__inside">
                    R$ {venda.valorLiquio}
                  </div>
                  <div className="Principal__box__item__inside">
                    {venda.status}
                  </div>
                  <div className="Principal__box__item__inside">
                    {venda.metodoPagamento}
                  </div>
                  <div className="Principal__box__item__inside">
                    {venda.parcelas}x
                  </div>
                  <div className="Principal__box__item__inside">
                    {venda.emailPagador}
                  </div>
                  <div className="Principal__box__item__inside">
                    {new Date(venda.dataCriacao).toLocaleString()}
                  </div>
                  <div className="Principal__box__item__inside">
                    {new Date(venda.dataAprovacao).toLocaleString()}
                  </div>
                  <div className="Principal__box__item__inside">
                    {venda.informacaoAdicional}
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

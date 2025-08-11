import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

import formatCurrency from "../utils/formatCurrency";

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
  const user = useSelector((state) => state.user);
  const [vendas, setVendas] = useState([]);
  const [nome, setNome] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchVendas = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiBaseUrl}/GetVenda`);
      if (!response.ok) throw new Error("Erro ao buscar vendas.");
      const data = await response.json();
      setVendas(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const GetNome = async () => {
    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Usuario/GetNomeByIdUsuario?id=${user.id}`
      );
      if (!response.ok) throw new Error("Erro ao buscar nome do usuário.");
      const data = await response.text();
      setNome(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    GetNome();
  }, [user.id]);

  useEffect(() => {
    fetchVendas();
  }, []);

  function traduzirStatus(status) {
    switch (status) {
      case "approved":
        return "Aprovado";
      case "pending":
        return "Pendente";
      case "in_process":
        return "Em processo";
      case "rejected":
        return "Rejeitado";
      case "cancelled":
        return "Cancelado";
      case "refunded":
        return "Reembolsado";
      case "charged_back":
        return "Contestação";
      case "not_carried_out":
        return "Não realizado";
      case null:
      case undefined:
        return "Sem status";
      default:
        return "Desconhecido";
    }
  }

  function traduzirMetodo(metodoPagamento) {
    switch (metodoPagamento) {
      case "credit_card":
        return "Cartão de Crédito";
      case "debit_card":
        return "Cartão de Débito";
      case "account_money":
        return "Saldo da conta";
      case "bank_transfer":
        return "Transferência Bancária";
      case "ticket":
        return "Boleto";
      case null:
      case undefined:
        return "Sem status";
      default:
        return "Desconhecido";
    }
  }

  return (
    <div className="Separator">
      {isLoading ? (
        <div className="crud-spinner-wrapper">
          <div className="crud-spinner"></div>
        </div>
      ) : (
        <div className="Principal">
          <div className="Principal__Create">
            <h2>Vendas</h2>
          </div>

          <section className="Principal__box">
            <div className="Principal__box__detalhes">
              {/* <div className="Principal__box__detalhes__item">ID</div> */}
              <div className="Principal__box__detalhes__item">Usuário</div>
              <div className="Principal__box__detalhes__item">Transação</div>
              <div className="Principal__box__detalhes__item">Líquido</div>
              <div className="Principal__box__detalhes__item">Status</div>
              <div className="Principal__box__detalhes__item">Pagamento</div>
              <div className="Principal__box__detalhes__item">Parcelas</div>
              <div className="Principal__box__detalhes__item">Email</div>
              <div className="Principal__box__detalhes__item">Criação</div>
              <div className="Principal__box__detalhes__item">Aprovação</div>
            </div>

            {vendas.length === 0 ? (
              <p className="Principal__box__item__inside">
                Nenhuma venda encontrada.
              </p>
            ) : (
              <ul>
                {vendas.map((venda) => (
                  <li key={venda.id} className="Principal__box__item">
                    {/* <div className="Principal__box__item__inside">{venda.id}</div> */}
                    <div className="Principal__box__item__inside">
                      {(() => {
                        try {
                          const info = JSON.parse(venda.informacaoAdicional);
                          return (
                            <div>
                              <div>{nome.split(" ")[0]}</div>

                              {/*
                              {info.anuncios?.map((anuncio, index) => (
                                <div key={index}>
                                  <span>Produto:</span>
                                  <br />
                                  {anuncio.Titulo} - R$ {anuncio.Valor}
                                </div>
                              ))}
                              */}
                            </div>
                          );
                        } catch (e) {
                          return <div>Erro ao ler informações</div>;
                        }
                      })()}
                    </div>
                    <div className="Principal__box__item__inside">
                      {formatCurrency(venda.valorTransacao)}
                    </div>
                    <div className="Principal__box__item__inside">
                      <span>
                        {venda.valorLiquio == null
                          ? "Sem valor líquido"
                          : `${formatCurrency(venda.valorLiquio)}`}
                      </span>
                    </div>
                    <div className="Principal__box__item__inside">
                      <span>{traduzirStatus(venda.status)}</span>
                    </div>
                    <div className="Principal__box__item__inside">
                      <span>
                        {venda.metodoPagamento == null
                          ? "Não finalizado"
                          : traduzirMetodo(venda.metodoPagamento)}
                      </span>
                    </div>
                    <div className="Principal__box__item__inside">
                      <span>
                        {venda.parcelas == null
                          ? "Não finalizado"
                          : `${venda.parcelas} x`}
                      </span>
                    </div>
                    <div className="Principal__box__item__inside">
                      {venda.emailPagador}
                    </div>
                    <div className="Principal__box__item__inside">
                      {new Date(venda.dataCriacao).toLocaleString()}
                    </div>
                    <div className="Principal__box__item__inside">
                      {venda.dataAprovacao == null
                        ? "Processando"
                        : new Date(venda.dataAprovacao).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default CrudVendas;

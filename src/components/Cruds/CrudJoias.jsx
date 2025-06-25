import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import "../../styles/Cruds/Cruds.css";

const apiBaseUrl = "https://marketplacejoias-api-latest.onrender.com/api/Joia";

function CrudJoias() {
  const [joias, setJoias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchJoias();
  }, []);

  const fetchJoias = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiBaseUrl}/GetJoia`);
      if (!response.ok) throw new Error("Erro ao buscar joias.");
      const data = await response.json();
      setJoias(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Tem certeza que deseja deletar esta joia?</p>
          <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
            <button
              onClick={async () => {
                await handleDelete(id);
                closeToast();
              }}
              style={{
                backgroundColor: "#d9534f",
                color: "#fff",
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
                backgroundColor: "#6c757d",
                color: "#fff",
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiBaseUrl}/DeleteJoia?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao excluir joia.");
      toast.success("Joia excluída com sucesso!");
      fetchJoias();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (joia) => {
    toast.info(`Função de edição chamada para a joia ID ${joia.id}`);
    // Aqui você pode abrir um modal ou definir um estado para edição
  };

  return (
    <div className="Separator">
      <div className="Principal__Create">
        <h2>Joias</h2>
      </div>

      <div className="Principal__box">
        <div className="Principal__box__detalhes">
          <div className="Principal__box__detalhes__item">ID</div>
          <div className="Principal__box__detalhes__item">Tipo</div>
          <div className="Principal__box__detalhes__item">Valor</div>
          <div className="Principal__box__detalhes__item">Ações</div>
        </div>

        {isLoading ? (
          <p className="Principal__box__item__inside">Carregando...</p>
        ) : joias.length === 0 ? (
          <p className="Principal__box__item__inside">
            Nenhuma joia cadastrada.
          </p>
        ) : (
          <ul>
            {joias.map((joia) => (
              <li key={joia.id} className="Principal__box__item">
                <div className="Principal__box__item__inside">{joia.id}</div>
                <div className="Principal__box__item__inside">
                  {joia.tipoPeca}
                </div>
                <div className="Principal__box__item__inside">
                  R$ {joia.valor.toFixed(2)}
                </div>
                <div className="Principal__box__item__inside acoes">
                  <button onClick={() => handleEdit(joia)}>Editar</button>
                  <button onClick={() => confirmDelete(joia.id)}>
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CrudJoias;

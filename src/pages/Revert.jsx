import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Revert() {
  const query = useQuery();

  // Captura os parâmetros da URL
  const id = parseInt(query.get("id"));
  const nome = query.get("nome");
  const cpf = query.get("cpf");
  const idade = parseInt(query.get("idade"));
  const email = query.get("email");
  const password = query.get("password");
  const cep = query.get("cep");
  const numero = parseInt(query.get("numero"));
  const complemento = query.get("complemento");
  const endereco = query.get("endereco");
  const fotoPerfilURL = query.get("fotoPerfilURL");
  const isAdmin = query.get("isAdmin") === "true";

  useEffect(() => {
    const user = {
      id,
      nome,
      cpf,
      idade,
      email,
      password,
      cep,
      numero,
      complemento,
      endereco,
      fotoPerfilURL,
      isAdmin
    };

    // Faz a requisição PUT para a API
    fetch("https://marketplacejoias-api-latest.onrender.com/api/Usuario/ReverterAlteracoes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Alterações revertidas com sucesso!");
        } else {
          return res.text().then((msg) => {
            throw new Error(msg || "Erro ao reverter alterações");
          });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  }, []);

  return (
    <div style={{ paddingTop: "100px" }}>
      <h2>Revertendo alterações...</h2>
      <p>Estamos processando a reversão das alterações do usuário <strong>{nome}</strong>.</p>
    </div>
  );
}

export default Revert;

import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import "../styles/components/Revert.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Revert() {
  const navigate = useNavigate();
  const query = useQuery();
  const hasRun = useRef(false);

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
    if (hasRun.current) return;
    hasRun.current = true;

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
      isAdmin,
    };

    fetch("https://marketplacejoias-api-latest.onrender.com/api/Usuario/ReverterAlteracoes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Alterações revertidas com sucesso!");
          setTimeout(() => navigate("/login"), 2500);
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
  }, [navigate, id, nome, cpf, idade, email, password, cep, numero, complemento, endereco, fotoPerfilURL, isAdmin]);

  return (
    <div className="Revert">
      <h2>Revertendo Alterações</h2>
      <p>
        Estamos processando a reversão das alterações do usuário <strong>{nome}</strong>.
      </p>
    </div>
  );
}

export default Revert;

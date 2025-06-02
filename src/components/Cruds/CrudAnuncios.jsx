import React, { useState } from "react";

function CrudAnuncios() {
  const [titulo, setTitulo] = useState("");
  const [urLs, setUrLs] = useState([]);
  const [usuarioId, setUsuarioId] = useState("");

  // Estado completo para a joia
  const [joiaData, setJoiaData] = useState({
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
    fonteEnergia: "",
  });

  // Função para postar a joia e retornar o ID
  async function PostJoia() {
    try {
      const response = await fetch("https://localhost:7081/api/Joia/PostJoia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(joiaData),
      });

      if (!response.ok) {
        throw new Error(`Erro ao postar joia: ${response.status}`);
      }

      const result = await response.json();
      console.log("Joia criada:", result);

      // Ajuste conforme o campo que a API retorna
      return result.id || result.joiaId;
    } catch (error) {
      console.error("Erro ao postar joia:", error);
      return null;
    }
  }

  // Função para postar o anúncio
  async function PostAnuncio(e) {
    e.preventDefault();

    const joiaId = await PostJoia();

    if (!joiaId) {
      alert("Erro ao criar joia. Não será possível criar o anúncio.");
      return;
    }

    const data = {
      titulo,
      urLs,
      joiaId,
      usuarioId: Number(usuarioId),
    };

    try {
      const response = await fetch(
        `https://localhost:7081/api/Anuncio/PostAnuncio`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao postar anúncio: ${response.status}`);
      }

      const result = await response.json();
      console.log("Anúncio criado:", result);

      // Limpa os campos após o sucesso
      setTitulo("");
      setUrLs([]);
      setUsuarioId("");
      setJoiaData({
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
        fonteEnergia: "",
      });

      alert("Anúncio e joia criados com sucesso!");
    } catch (error) {
      console.error("Erro ao postar anúncio:", error);
    }
  }

  // Função auxiliar para campos booleanos
  const handleBooleanChange = (e, field) => {
    setJoiaData({
      ...joiaData,
      [field]: e.target.checked,
    });
  };

  return (
    <div className="CrudAnuncios">
      <h1>Cadastro de Anúncio com Joia</h1>
      <form onSubmit={PostAnuncio}>
        <h2>Dados do Anúncio</h2>
        <input
          type="text"
          placeholder="Título do anúncio"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="URLs das imagens (separadas por vírgula)"
          value={urLs.join(",")}
          onChange={(e) => setUrLs(e.target.value.split(","))}
          required
        />

        <input
          type="number"
          placeholder="ID do usuário"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
          required
        />

        <h2>Dados da Joia</h2>
        <input
          type="text"
          placeholder="Tipo da peça"
          value={joiaData.tipoPeca}
          onChange={(e) =>
            setJoiaData({ ...joiaData, tipoPeca: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Valor"
          value={joiaData.valor}
          onChange={(e) =>
            setJoiaData({ ...joiaData, valor: Number(e.target.value) })
          }
          required
        />

        <input
          type="text"
          placeholder="Descrição"
          value={joiaData.descricao}
          onChange={(e) =>
            setJoiaData({ ...joiaData, descricao: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Peso"
          value={joiaData.peso}
          onChange={(e) =>
            setJoiaData({ ...joiaData, peso: Number(e.target.value) })
          }
          required
        />

        <input
          type="text"
          placeholder="Material"
          value={joiaData.material}
          onChange={(e) =>
            setJoiaData({ ...joiaData, material: e.target.value })
          }
          required
        />

        {/* Campos booleanos */}
        <label>
          <input
            type="checkbox"
            checked={joiaData.isStudded}
            onChange={(e) => handleBooleanChange(e, "isStudded")}
          />
          Possui pedras?
        </label>

        <label>
          <input
            type="checkbox"
            checked={joiaData.havePendant}
            onChange={(e) => handleBooleanChange(e, "havePendant")}
          />
          Tem pingente?
        </label>

        <label>
          <input
            type="checkbox"
            checked={joiaData.isAntiallergic}
            onChange={(e) => handleBooleanChange(e, "isAntiallergic")}
          />
          É antialérgica?
        </label>

        <label>
          <input
            type="checkbox"
            checked={joiaData.haveCharms}
            onChange={(e) => handleBooleanChange(e, "haveCharms")}
          />
          Tem charms?
        </label>

        <label>
          <input
            type="checkbox"
            checked={joiaData.haveWaterResistance}
            onChange={(e) => handleBooleanChange(e, "haveWaterResistance")}
          />
          Resistente à água?
        </label>

        {/* Outros campos numéricos e textuais (opcional ou obrigatórios) */}
        <input
          type="text"
          placeholder="Material cravejado"
          value={joiaData.materialCravejado}
          onChange={(e) =>
            setJoiaData({ ...joiaData, materialCravejado: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Tamanho"
          value={joiaData.tamanho}
          onChange={(e) =>
            setJoiaData({ ...joiaData, tamanho: Number(e.target.value) })
          }
        />

        <input
          type="text"
          placeholder="Formato"
          value={joiaData.formato}
          onChange={(e) =>
            setJoiaData({ ...joiaData, formato: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Tipo de fecho"
          value={joiaData.tipoFecho}
          onChange={(e) =>
            setJoiaData({ ...joiaData, tipoFecho: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Modelo"
          value={joiaData.modelo}
          onChange={(e) => setJoiaData({ ...joiaData, modelo: e.target.value })}
        />

        <input
          type="number"
          placeholder="Altura"
          value={joiaData.altura}
          onChange={(e) =>
            setJoiaData({ ...joiaData, altura: Number(e.target.value) })
          }
        />

        {/* Adicione outros campos numéricos da mesma forma */}
        {/* pesoIndividual, comprimento, espessura, diametroCaixa, etc. */}

        <input
          type="text"
          placeholder="Tipo de corrente"
          value={joiaData.tipoCorrente}
          onChange={(e) =>
            setJoiaData({ ...joiaData, tipoCorrente: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Região"
          value={joiaData.regiao}
          onChange={(e) => setJoiaData({ ...joiaData, regiao: e.target.value })}
        />

        <input
          type="text"
          placeholder="Fechamento"
          value={joiaData.fechamento}
          onChange={(e) =>
            setJoiaData({ ...joiaData, fechamento: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Flexibilidade"
          value={joiaData.flexibilidade}
          onChange={(e) =>
            setJoiaData({ ...joiaData, flexibilidade: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Tipo de movimento"
          value={joiaData.tipoMovimento}
          onChange={(e) =>
            setJoiaData({ ...joiaData, tipoMovimento: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Material da pulseira"
          value={joiaData.materialPulseira}
          onChange={(e) =>
            setJoiaData({ ...joiaData, materialPulseira: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Fonte de energia"
          value={joiaData.fonteEnergia}
          onChange={(e) =>
            setJoiaData({ ...joiaData, fonteEnergia: e.target.value })
          }
        />

        <button type="submit">Criar Anúncio e Joia</button>
      </form>
    </div>
  );
}

export default CrudAnuncios;

import React, { useState } from "react";

function CrudAnuncios() {
  const [titulo, setTitulo] = useState("");
  const [urLs, setUrLs] = useState([]);
  const [usuarioId, setUsuarioId] = useState("");

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

      return result.id || result.joiaId;
    } catch (error) {
      console.error("Erro ao postar joia:", error);
      return null;
    }
  }

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

      // Resetar formulário
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

  // Campos específicos por tipo
  const camposPorTipo = {
    Anel: ["tamanho", "formato"],
    Brinco: ["tipoFecho", "modelo", "altura", "pesoIndividual"],
    Colar: [
      "comprimento",
      "espessura",
      "havePendant",
      "modelo",
      "tipoCorrente",
    ],
    Piercing: ["regiao", "fechamento", "tamanho", "isAntiallergic"],
    Pingente: ["formato"],
    Pulseira: [
      "tipoFecho",
      "comprimento",
      "espessura",
      "haveCharms",
      "flexibilidade",
    ],
    Relogio: [
      "tipoMovimento",
      "haveWaterResistance",
      "diametroCaixa",
      "materialPulseira",
      "fonteEnergia",
    ],
  };

  const camposComuns = [
    "tipoPeca",
    "valor",
    "descricao",
    "peso",
    "material",
    "isStudded",
    "materialCravejado",
  ];

  const handleBooleanChange = (e, field) => {
    setJoiaData({
      ...joiaData,
      [field]: e.target.checked,
    });
  };

  const renderInput = (field) => {
    const label = field
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
    if (typeof joiaData[field] === "boolean") {
      return (
        <label key={field}>
          <input
            type="checkbox"
            checked={joiaData[field]}
            onChange={(e) => handleBooleanChange(e, field)}
          />
          {label}
        </label>
      );
    }
    return (
      <input
        key={field}
        type={typeof joiaData[field] === "number" ? "number" : "text"}
        placeholder={label}
        value={joiaData[field]}
        onChange={(e) =>
          setJoiaData({
            ...joiaData,
            [field]:
              typeof joiaData[field] === "number"
                ? Number(e.target.value)
                : e.target.value,
          })
        }
        required={
          field === "tipoPeca" ||
          field === "valor" ||
          field === "descricao" ||
          field === "peso" ||
          field === "material"
        }
      />
    );
  };

  const camposAtuais = camposComuns.concat(
    camposPorTipo[joiaData.tipoPeca] || []
  );

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

        {/* TipoPeca deve vir primeiro para decidir os campos */}
        <select
          value={joiaData.tipoPeca}
          onChange={(e) =>
            setJoiaData({ ...joiaData, tipoPeca: e.target.value })
          }
          required
        >
          <option value="">Selecione o tipo de peça</option>
          <option value="Anel">Anel</option>
          <option value="Brinco">Brinco</option>
          <option value="Colar">Colar</option>
          <option value="Piercing">Piercing</option>
          <option value="Pingente">Pingente</option>
          <option value="Pulseira">Pulseira</option>
          <option value="Relogio">Relógio</option>
        </select>

        {camposAtuais
          .filter((field) => field !== "tipoPeca") // já renderizamos TipoPeca acima
          .map((field) => renderInput(field))}

        <button type="submit">Criar Anúncio e Joia</button>
      </form>
    </div>
  );
}

export default CrudAnuncios;

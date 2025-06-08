import React, { useState } from "react";

function CrudAnuncios() {
  const [titulo, setTitulo] = useState("");
  const [urLs, setUrLs] = useState([""]);
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

  // Atualiza campo simples
  const handleChange = (field, value) => {
    setJoiaData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Atualiza checkbox booleano
  const handleBooleanChange = (field, checked) => {
    setJoiaData((prev) => ({
      ...prev,
      [field]: checked,
    }));
  };

  // Controle dos URLs
  const handleUrlChange = (index, value) => {
    const newUrls = [...urLs];
    newUrls[index] = value;
    setUrLs(newUrls);
  };

  const addUrlField = () => {
    setUrLs((prev) => [...prev, ""]);
  };

  const removeUrlField = (index) => {
    if (urLs.length === 1) return;
    setUrLs((prev) => prev.filter((_, i) => i !== index));
  };

  // Inputs específicos para cada tipo de joia:
  const renderSpecificInputs = () => {
    switch (joiaData.tipoPeca) {
      case "Anel":
        return (
          <>
            <div>
              <label>Tamanho</label>
              <input
                type="number"
                min={0}
                value={joiaData.tamanho}
                onChange={(e) =>
                  handleChange("tamanho", Number(e.target.value) || 0)
                }
                required
              />
            </div>
            <div>
              <label>Formato</label>
              <input
                type="text"
                value={joiaData.formato}
                onChange={(e) => handleChange("formato", e.target.value)}
                required
              />
            </div>
          </>
        );
      case "Brinco":
        return (
          <>
            <div>
              <label>Tipo de Fecho</label>
              <input
                type="text"
                value={joiaData.tipoFecho}
                onChange={(e) => handleChange("tipoFecho", e.target.value)}
                required
              />
            </div>
            <div>
              <label>Modelo</label>
              <input
                type="text"
                value={joiaData.modelo}
                onChange={(e) => handleChange("modelo", e.target.value)}
                required
              />
            </div>
            <div>
              <label>Altura</label>
              <input
                type="number"
                min={0}
                value={joiaData.altura}
                onChange={(e) =>
                  handleChange("altura", Number(e.target.value) || 0)
                }
                required
              />
            </div>
            <div>
              <label>Peso Individual</label>
              <input
                type="number"
                min={0}
                value={joiaData.pesoIndividual}
                onChange={(e) =>
                  handleChange("pesoIndividual", Number(e.target.value) || 0)
                }
                required
              />
            </div>
          </>
        );
      case "Colar":
        return (
          <>
            <div>
              <label>Comprimento</label>
              <input
                type="number"
                min={0}
                value={joiaData.comprimento}
                onChange={(e) =>
                  handleChange("comprimento", Number(e.target.value) || 0)
                }
                required
              />
            </div>
            <div >
              <label>Espessura</label>
              <input
                type="number"
                min={0}
                value={joiaData.espessura}
                onChange={(e) =>
                  handleChange("espessura", Number(e.target.value) || 0)
                }
                required
              />
            </div>
            <div >
              <label>
                <input
                  type="checkbox"
                  checked={joiaData.havePendant}
                  onChange={(e) =>
                    handleBooleanChange("havePendant", e.target.checked)
                  }
                />
                Possui Pingente
              </label>
            </div>
            <div >
              <label>Tipo Corrente</label>
              <input
                type="text"
                value={joiaData.tipoCorrente}
                onChange={(e) => handleChange("tipoCorrente", e.target.value)}
                required
              />
            </div>
          </>
        );
      case "Piercing":
        return (
          <>
            <div >
              <label>Região</label>
              <input
                type="text"
                value={joiaData.regiao}
                onChange={(e) => handleChange("regiao", e.target.value)}
                required
              />
            </div>
            <div >
              <label>Fechamento</label>
              <input
                type="text"
                value={joiaData.fechamento}
                onChange={(e) => handleChange("fechamento", e.target.value)}
                required
              />
            </div>
            <div >
              <label>
                <input
                  type="checkbox"
                  checked={joiaData.isAntiallergic}
                  onChange={(e) =>
                    handleBooleanChange("isAntiallergic", e.target.checked)
                  }
                />
                Antialérgico
              </label>
            </div>
          </>
        );
      case "Pingente":
        return (
          <div >
            <label>Formato</label>
            <input
              type="text"
              value={joiaData.formato}
              onChange={(e) => handleChange("formato", e.target.value)}
              required
            />
          </div>
        );
      case "Pulseira":
        return (
          <>
            <div >
              <label>
                <input
                  type="checkbox"
                  checked={joiaData.haveCharms}
                  onChange={(e) =>
                    handleBooleanChange("haveCharms", e.target.checked)
                  }
                />
                Possui Pingentes
              </label>
            </div>
            <div >
              <label>Flexibilidade</label>
              <input
                type="text"
                value={joiaData.flexibilidade}
                onChange={(e) => handleChange("flexibilidade", e.target.value)}
                required
              />
            </div>
            <div >
              <label>Material Pulseira</label>
              <input
                type="text"
                value={joiaData.materialPulseira}
                onChange={(e) =>
                  handleChange("materialPulseira", e.target.value)
                }
                required
              />
            </div>
          </>
        );
      case "Relogio":
        return (
          <>
            <div >
              <label>Tipo Movimento</label>
              <input
                type="text"
                value={joiaData.tipoMovimento}
                onChange={(e) => handleChange("tipoMovimento", e.target.value)}
                required
              />
            </div>
            <div >
              <label>
                <input
                  type="checkbox"
                  checked={joiaData.haveWaterResistance}
                  onChange={(e) =>
                    handleBooleanChange("haveWaterResistance", e.target.checked)
                  }
                />
                Resistente à Água
              </label>
            </div>
            <div >
              <label>Diâmetro Caixa</label>
              <input
                type="number"
                min={0}
                value={joiaData.diametroCaixa}
                onChange={(e) =>
                  handleChange("diametroCaixa", Number(e.target.value) || 0)
                }
                required
              />
            </div>
            <div >
              <label>Material Pulseira</label>
              <input
                type="text"
                value={joiaData.materialPulseira}
                onChange={(e) =>
                  handleChange("materialPulseira", e.target.value)
                }
                required
              />
            </div>
            <div >
              <label>Fonte Energia</label>
              <input
                type="text"
                value={joiaData.fonteEnergia}
                onChange={(e) => handleChange("fonteEnergia", e.target.value)}
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST joia
      const response = await fetch("https://localhost:7081/api/Joia/PostJoia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(joiaData),
      });

      if (!response.ok)
        throw new Error(`Erro ao postar joia: ${response.status}`);

      const result = await response.json();
      const joiaId = result.id || result.joiaId;

      if (!joiaId) {
        alert("Erro: ID da joia não retornado.");
        return;
      }

      // POST anuncio
      const anuncioData = {
        titulo,
        urLs: urLs.filter((url) => url.trim() !== ""),
        joiaId,
        usuarioId: Number(usuarioId),
      };

      const anuncioResponse = await fetch(
        "https://localhost:7081/api/Anuncio/PostAnuncio",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(anuncioData),
        }
      );

      if (!anuncioResponse.ok)
        throw new Error(`Erro ao postar anúncio: ${anuncioResponse.status}`);

      await anuncioResponse.json();

      alert("Anúncio e joia criados com sucesso!");

      // Limpar campos
      setTitulo("");
      setUrLs([""]);
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
    } catch (error) {
      alert("Erro: " + error.message);
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 16 }}>
      <h2>Cadastrar Anúncio</h2>
      <form onSubmit={handleSubmit}>
        <div >
          <label>Título do anúncio</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div >
          <label>ID do Usuário</label>
          <input
            type="number"
            min={1}
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
            required
          />
        </div>

        <div >
          <label>URLs das imagens</label>
          {urLs.map((url, idx) => (
            <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input
                type="text"
                placeholder="Digite a URL da imagem"
                value={url}
                onChange={(e) => handleUrlChange(idx, e.target.value)}
                required
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={() => removeUrlField(idx)}
                disabled={urLs.length === 1}
                style={{
                  cursor: urLs.length === 1 ? "not-allowed" : "pointer",
                }}
                title={
                  urLs.length === 1
                    ? "Deve ter pelo menos uma URL"
                    : "Remover essa URL"
                }
              >
                X
              </button>
            </div>
          ))}
          <button type="button" onClick={addUrlField}>
            + Adicionar URL
          </button>
        </div>

        <div >
          <label>Tipo da peça</label>
          <select
            value={joiaData.tipoPeca}
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
        </div>

        <div >
          <label>Valor</label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={joiaData.valor}
            onChange={(e) => handleChange("valor", Number(e.target.value) || 0)}
            required
          />
        </div>

        <div >
          <label>Descrição</label>
          <textarea
            value={joiaData.descricao}
            onChange={(e) => handleChange("descricao", e.target.value)}
            required
          />
        </div>

        <div >
          <label>Peso</label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={joiaData.peso}
            onChange={(e) => handleChange("peso", Number(e.target.value) || 0)}
            required
          />
        </div>

        <div >
          <label>Material</label>
          <input
            type="text"
            value={joiaData.material}
            onChange={(e) => handleChange("material", e.target.value)}
            required
          />
        </div>

        <div >
          <label>
            <input
              type="checkbox"
              checked={joiaData.isStudded}
              onChange={(e) =>
                handleBooleanChange("isStudded", e.target.checked)
              }
            />
            Cravejado
          </label>
        </div>

        <div >
          <label>Material Cravejado</label>
          <input
            type="text"
            value={joiaData.materialCravejado}
            onChange={(e) => handleChange("materialCravejado", e.target.value)}
            disabled={!joiaData.isStudded}
            required={joiaData.isStudded}
          />
        </div>

        {/* Inputs específicos por tipo */}
        {renderSpecificInputs()}

        <button type="submit" style={{ marginTop: 16 }}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CrudAnuncios;

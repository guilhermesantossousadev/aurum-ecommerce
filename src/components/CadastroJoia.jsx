import React, { useState } from "react";

import "../styles/components/cadastroJoia.css";
import { toast } from "react-toastify";

const CadastroJoia = () => {
  const tiposJoia = [
    "Anel",
    "Brinco",
    "Colar",
    "Piercing",
    "Pingente",
    "Pulseira",
    "Relogio",
  ];

  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [formData, setFormData] = useState({
    tipoPeca: "",
    valor: "",
    descricao: "",
    peso: "",
    material: "",
    isStudded: false,
    materialCravejado: "",
  });

  const handleTipoChange = (e) => {
    const selectedType = e.target.value;
    setTipoSelecionado(selectedType);

    // Reseta os campos base + específicos
    setFormData({
      tipoPeca: selectedType,
      valor: "",
      descricao: "",
      peso: "",
      material: "",
      isStudded: false,
      materialCravejado: "",
      ...getCamposEspecificos(selectedType),
    });
  };

  const getCamposEspecificos = (tipo) => {
    switch (tipo) {
      case "Anel":
        return { tamanho: "", formato: "" };
      case "Brinco":
        return { tipoFecho: "", modelo: "", altura: "", pesoIndividual: "" };
      case "Colar":
        return {
          comprimento: "",
          espessura: "",
          havePendant: false,
          modelo: "",
          tipoCorrente: "",
        };
      case "Piercing":
        return {
          regiao: "",
          fechamento: "",
          tamanho: "",
          isAntiallergic: false,
        };
      case "Pingente":
        return { formato: "" };
      case "Pulseira":
        return {
          tipoFecho: "",
          comprimento: "",
          espessura: "",
          haveCharms: false,
          flexibilidade: "",
        };
      case "Relogio":
        return {
          tipoMovimento: "",
          haveWaterResistance: false,
          diametroCaixa: "",
          materialPulseira: "",
          fonteEnergia: "",
        };
      default:
        return {};
    }
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const getTypeString = (tipo) => {
    return `Models.Derivatives.${tipo}, Models`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tipoSelecionado) {
      toast("Selecione o tipo de joia!");
      return;
    }

    const dataToSend = {
      ...formData,
      $type: getTypeString(tipoSelecionado),
    };

    try {
      const response = await fetch("https://localhost:7081/api/Joia/PostJoia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      console.log(JSON.stringify(dataToSend));

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      toast.success(`${tipoSelecionado} cadastrado com sucesso!`);

      // Resetar o formData com campos específicos
      setFormData({
        tipoPeca: tipoSelecionado,
        valor: "",
        descricao: "",
        peso: "",
        material: "",
        isStudded: false,
        materialCravejado: "",
        ...getCamposEspecificos(tipoSelecionado),
      });
    } catch (error) {
      console.error(error);
      toast.error(`Erro ao cadastrar ${tipoSelecionado}!`);
    }
  };

  const renderCamposEspecificos = () => {
    switch (tipoSelecionado) {
      case "Anel":
        return (
          <>
            <div>
              <label>Tamanho:</label>
              <input
                type="number"
                name="tamanho"
                value={formData.tamanho}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Formato:</label>
              <input
                type="text"
                name="formato"
                value={formData.formato}
                onChange={handleChange}
              />
            </div>
          </>
        );
      case "Brinco":
        return (
          <>
            <div>
              <label>Tipo Fecho:</label>
              <input
                type="text"
                name="tipoFecho"
                value={formData.tipoFecho}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Modelo:</label>
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Altura (mm):</label>
              <input
                type="number"
                name="altura"
                value={formData.altura}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Peso Individual (g):</label>
              <input
                type="number"
                name="pesoIndividual"
                value={formData.pesoIndividual}
                onChange={handleChange}
              />
            </div>
          </>
        );
      case "Colar":
        return (
          <>
            <div>
              <label>Comprimento (cm):</label>
              <input
                type="number"
                name="comprimento"
                value={formData.comprimento}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Espessura (mm):</label>
              <input
                type="number"
                name="espessura"
                value={formData.espessura}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Tem Pingente?</label>
              <input
                type="checkbox"
                name="havePendant"
                checked={formData.havePendant}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Modelo:</label>
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Tipo Corrente:</label>
              <input
                type="text"
                name="tipoCorrente"
                value={formData.tipoCorrente}
                onChange={handleChange}
              />
            </div>
          </>
        );
      case "Piercing":
        return (
          <>
            <div>
              <label>Região:</label>
              <input
                type="text"
                name="regiao"
                value={formData.regiao}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Fechamento:</label>
              <input
                type="text"
                name="fechamento"
                value={formData.fechamento}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Tamanho (mm):</label>
              <input
                type="number"
                name="tamanho"
                value={formData.tamanho}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>É Antialérgico?</label>
              <input
                type="checkbox"
                name="isAntiallergic"
                checked={formData.isAntiallergic}
                onChange={handleChange}
              />
            </div>
          </>
        );
      case "Pingente":
        return (
          <div>
            <label>Formato:</label>
            <input
              type="text"
              name="formato"
              value={formData.formato}
              onChange={handleChange}
            />
          </div>
        );
      case "Pulseira":
        return (
          <>
            <div>
              <label>Tipo Fecho:</label>
              <input
                type="text"
                name="tipoFecho"
                value={formData.tipoFecho}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Comprimento (cm):</label>
              <input
                type="number"
                name="comprimento"
                value={formData.comprimento}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Espessura (mm):</label>
              <input
                type="number"
                name="espessura"
                value={formData.espessura}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Tem Charms?</label>
              <input
                type="checkbox"
                name="haveCharms"
                checked={formData.haveCharms}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Flexibilidade:</label>
              <input
                type="text"
                name="flexibilidade"
                value={formData.flexibilidade}
                onChange={handleChange}
              />
            </div>
          </>
        );
      case "Relogio":
        return (
          <>
            <div>
              <label>Tipo Movimento:</label>
              <input
                type="text"
                name="tipoMovimento"
                value={formData.tipoMovimento}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Tem resistência à água?</label>
              <input
                type="checkbox"
                name="haveWaterResistance"
                checked={formData.haveWaterResistance}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Diâmetro Caixa (mm):</label>
              <input
                type="number"
                name="diametroCaixa"
                value={formData.diametroCaixa}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Material Pulseira:</label>
              <input
                type="text"
                name="materialPulseira"
                value={formData.materialPulseira}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Fonte de Energia:</label>
              <input
                type="text"
                name="fonteEnergia"
                value={formData.fonteEnergia}
                onChange={handleChange}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="cadastroJoia">
      <h2>Cadastrar Joia</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo de Joia:</label>
          <select value={tipoSelecionado} onChange={handleTipoChange}>
            <option value="">Selecione...</option>
            {tiposJoia.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        {tipoSelecionado && (
          <>
            <div>
              <label>Valor (R$):</label>
              <input
                type="number"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Descrição:</label>
              <input
                type="text"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Peso (g):</label>
              <input
                type="number"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Material:</label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>É cravejado?</label>
              <input
                type="checkbox"
                name="isStudded"
                checked={formData.isStudded}
                onChange={handleChange}
              />
            </div>
            {formData.isStudded && (
              <div>
                <label>Material Cravejado:</label>
                <input
                  type="text"
                  name="materialCravejado"
                  value={formData.materialCravejado}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Campos Específicos */}
            {renderCamposEspecificos()}
            <button type="submit">Cadastrar</button>
          </>
        )}
      </form>
    </div>
  );
};

export default CadastroJoia;

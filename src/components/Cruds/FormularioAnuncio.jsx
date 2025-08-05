import React, { useEffect, useState } from "react";

const camposComuns = [
  "Valor",
  "Descricao",
  "Peso",
  "Material",
  "isStudded",
  "MaterialCravejado",
];

const camposEspecificos = {
  Anel: ["Tamanho", "Formato"],
  Brinco: ["TipoFecho", "Modelo", "Altura", "PesoIndividual"],
  Colar: ["Comprimento", "Espessura", "havePendant", "Modelo", "TipoCorrente"],
  Piercing: ["Regiao", "Fechamento", "Tamanho", "isAntiallergic"],
  Pingente: ["Formato"],
  Pulseira: [
    "TipoFecho",
    "Comprimento",
    "Espessura",
    "haveCharms",
    "Flexibilidade",
  ],
  Relogio: [
    "TipoMovimento",
    "haveWaterResistance",
    "DiametroCaixa",
    "MaterialPulseira",
    "FonteEnergia",
  ],
};

const FormularioAnuncio = ({ tipoPeca, formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const renderInput = (name) => {
    const isCheckbox = name.startsWith("is") || name.startsWith("have");
    return (
      <div key={name} className="input-group">
        <label htmlFor={name}>{name}</label>
        {isCheckbox ? (
          <input
            type="checkbox"
            id={name}
            name={name}
            checked={formData[name] || false}
            onChange={handleChange}
          />
        ) : (
          <input
            type="text"
            id={name}
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            required
          />
        )}
      </div>
    );
  };

  const campos = [...camposComuns, ...(camposEspecificos[tipoPeca] || [])];

  return (
    <div className="formulario-anuncio">
      {campos.map((campo) => renderInput(campo))}
    </div>
  );
};

export default FormularioAnuncio;

export function validateSpecificInputs(tipoPeca, joiaData) {
  const errors = [];

  switch (tipoPeca) {
    case "Anel":
      if (!joiaData.tamanho || joiaData.tamanho <= 0) {
        errors.push("Tamanho do Anel deve ser maior que zero.");
      }
      if (!joiaData.formato || !joiaData.formato.trim()) {
        errors.push("Formato do Anel é obrigatório.");
      }
      break;

    case "Brinco":
      if (!joiaData.tipoFecho || !joiaData.tipoFecho.trim()) {
        errors.push("Tipo de Fecho é obrigatório.");
      }
      if (!joiaData.modelo || !joiaData.modelo.trim()) {
        errors.push("Modelo do Brinco é obrigatório.");
      }
      if (!joiaData.altura || joiaData.altura <= 0) {
        errors.push("Altura do Brinco deve ser maior que zero.");
      }
      if (!joiaData.pesoIndividual || joiaData.pesoIndividual <= 0) {
        errors.push("Peso individual do Brinco deve ser maior que zero.");
      }
      break;

    case "Colar":
      if (!joiaData.modelo || !joiaData.modelo.trim()) {
        errors.push("Modelo do Colar é obrigatório.");
      }
      if (!joiaData.comprimento || joiaData.comprimento <= 0) {
        errors.push("Comprimento do Colar deve ser maior que zero.");
      }
      if (!joiaData.espessura || joiaData.espessura <= 0) {
        errors.push("Espessura do Colar deve ser maior que zero.");
      }
      if (!joiaData.tipoCorrente || !joiaData.tipoCorrente.trim()) {
        errors.push("Tipo da Corrente é obrigatório.");
      }
      break;

    case "Piercing":
      if (!joiaData.tamanho || joiaData.tamanho <= 0) {
        errors.push("Tamanho do Piercing deve ser maior que zero.");
      }
      if (!joiaData.regiao || !joiaData.regiao.trim()) {
        errors.push("Região do Piercing é obrigatória.");
      }
      if (!joiaData.fechamento || !joiaData.fechamento.trim()) {
        errors.push("Fechamento do Piercing é obrigatório.");
      }
      break;

    case "Pingente":
      if (!joiaData.formato || !joiaData.formato.trim()) {
        errors.push("Formato do Pingente é obrigatório.");
      }
      break;

    case "Pulseira":
      if (!joiaData.tipoFecho || !joiaData.tipoFecho.trim()) {
        errors.push("Tipo de Fecho da Pulseira é obrigatório.");
      }
      if (!joiaData.comprimento || joiaData.comprimento <= 0) {
        errors.push("Comprimento da Pulseira deve ser maior que zero.");
      }
      if (!joiaData.espessura || joiaData.espessura <= 0) {
        errors.push("Espessura da Pulseira deve ser maior que zero.");
      }
      if (!joiaData.flexibilidade || !joiaData.flexibilidade.trim()) {
        errors.push("Flexibilidade da Pulseira é obrigatória.");
      }
      break;

    case "Relogio":
      if (!joiaData.tipoMovimento || !joiaData.tipoMovimento.trim()) {
        errors.push("Tipo de Movimento do Relógio é obrigatório.");
      }
      if (!joiaData.diametroCaixa || joiaData.diametroCaixa <= 0) {
        errors.push("Diâmetro da Caixa deve ser maior que zero.");
      }
      if (!joiaData.materialPulseira || !joiaData.materialPulseira.trim()) {
        errors.push("Material da Pulseira do Relógio é obrigatório.");
      }
      if (!joiaData.fonteEnergia || !joiaData.fonteEnergia.trim()) {
        errors.push("Fonte de Energia do Relógio é obrigatória.");
      }
      break;

    default:
      break;
  }

  return errors;
}

export default function SpecificInputs({
  joiaData,
  handleChange,
  handleBooleanChange,
}) {
  function handleNumericChange(field, val) {
    // Troca vírgula por ponto, para aceitar decimal com vírgula
    const normalizedVal = val.replace(",", ".");

    // Regex para número decimal (inteiro ou decimal)
    if (/^\d*\.?\d*$/.test(normalizedVal)) {
      handleChange(field, normalizedVal === "" ? "" : Number(normalizedVal));
    }
  }

  switch (joiaData.tipoPeca) {
    case "Anel":
      return (
        <>
          <div>
            <label htmlFor="tamanho">Tamanho</label>
            <input
              id="tamanho"
              type="number"
              step="any"
              inputMode="decimal"
              value={joiaData.tamanho}
              onChange={(e) => handleNumericChange("tamanho", e.target.value)}
              required
              placeholder="Tamanho"
            />
          </div>

          <div>
            <label htmlFor="formato">Formato (Anel, Aliança...)</label>
            <input
              id="formato"
              type="text"
              value={joiaData.formato}
              onChange={(e) => handleChange("formato", e.target.value)}
              required
              placeholder="Formato"
            />
          </div>
        </>
      );
    case "Brinco":
      return (
        <>
          <div>
            <label htmlFor="tipoFecho">Tipo de Fecho</label>
            <input
              id="tipoFecho"
              type="text"
              value={joiaData.tipoFecho}
              onChange={(e) => handleChange("tipoFecho", e.target.value)}
              required
              placeholder="Tipo de Fecho"
            />
          </div>
          <div>
            <label htmlFor="modelo">Modelo</label>
            <input
              id="modelo"
              type="text"
              value={joiaData.modelo}
              onChange={(e) => handleChange("modelo", e.target.value)}
              required
              placeholder="Modelo"
            />
          </div>
          <div>
            <label htmlFor="altura">Altura (cm)</label>
            <input
              id="altura"
              type="number"
              step="any"
              inputMode="decimal"
              value={joiaData.altura}
              onChange={(e) => handleNumericChange("altura", e.target.value)}
              required
              placeholder="Altura (cm)"
            />
          </div>

          <div>
            <label htmlFor="pesoIndividual">Peso Individual (g)</label>
            <input
              id="pesoIndividual"
              type="number"
              step="any"
              inputMode="decimal"
              value={joiaData.pesoIndividual}
              onChange={(e) => handleNumericChange("pesoIndividual", e.target.value)}
              required
              placeholder="Peso Individual (g)"
            />
          </div>
        </>
      );
    case "Colar":
      return (
        <>
          <div>
            <label htmlFor="modelo">Modelo</label>
            <input
              id="modelo"
              type="text"
              value={joiaData.modelo}
              onChange={(e) => handleChange("modelo", e.target.value)}
              required
              placeholder="Modelo"
            />
          </div>
          <div>
            <label htmlFor="comprimento">Comprimento (cm)</label>
            <input
              id="comprimento"
              type="number"
              step="any"
              inputMode="decimal"
              value={joiaData.comprimento}
              onChange={(e) => handleNumericChange("comprimento", e.target.value)}
              required
              placeholder="Comprimento (cm)"
            />
          </div>
          <div>
            <label htmlFor="espessura">Espessura (mm)</label>
            <input
              id="espessura"
              type="number"
              step="any"
              inputMode="decimal"
              value={joiaData.espessura}
              onChange={(e) => handleNumericChange("espessura", e.target.value)}
              required
              placeholder="Espessura (mm)"
            />
          </div>
          <div>
            <input
              type="checkbox"
              checked={joiaData.havePendant}
              onChange={(e) =>
                handleBooleanChange("havePendant", e.target.checked)
              }
              id="havePendant"
            />
            <label htmlFor="havePendant">Possui Pingente</label>
          </div>
          <div>
            <label htmlFor="tipoCorrente">Tipo Corrente</label>
            <input
              id="tipoCorrente"
              type="text"
              value={joiaData.tipoCorrente}
              onChange={(e) => handleChange("tipoCorrente", e.target.value)}
              required
              placeholder="Tipo Corrente"
            />
          </div>
        </>
      );
    case "Piercing":
      return (
        <>
          <div>
            <label htmlFor="tamanho">Tamanho (mm)</label>
            <input
              id="tamanho"
              type="number"
              step="any"
              inputMode="decimal"
              value={joiaData.tamanho}
              onChange={(e) => handleNumericChange("tamanho", e.target.value)}
              required
              placeholder="Tamanho (mm)"
            />
          </div>
          <div>
            <label htmlFor="regiao">Região</label>
            <input
              id="regiao"
              type="text"
              value={joiaData.regiao}
              onChange={(e) => handleChange("regiao", e.target.value)}
              required
              placeholder="Região"
            />
          </div>
          <div>
            <label htmlFor="fechamento">Fechamento</label>
            <input
              id="fechamento"
              type="text"
              value={joiaData.fechamento}
              onChange={(e) => handleChange("fechamento", e.target.value)}
              required
              placeholder="Fechamento"
            />
          </div>
          <div>
            <input
              type="checkbox"
              checked={joiaData.isAntiallergic}
              onChange={(e) =>
                handleBooleanChange("isAntiallergic", e.target.checked)
              }
              id="isAntiallergic"
            />
            <label htmlFor="isAntiallergic">Antialérgico</label>
          </div>
        </>
      );
    case "Pingente":
      return (
        <div>
          <label htmlFor="formato">Formato</label>
          <input
            id="formato"
            type="text"
            value={joiaData.formato}
            onChange={(e) => handleChange("formato", e.target.value)}
            required
            placeholder="Formato"
          />
        </div>
      );
    case "Pulseira":
      return (
        <>
          <div>
            <label htmlFor="tipoFecho">Tipo de Fecho</label>
            <input
              id="tipoFecho"
              type="text"
              value={joiaData.tipoFecho}
              onChange={(e) => handleChange("tipoFecho", e.target.value)}
              required
              placeholder="Tipo de Fecho"
            />
          </div>
          <div>
            <label htmlFor="comprimento">Comprimento (cm)</label>
            <input
              id="comprimento"
              type="number"
              step="any"
              inputMode="decimal"
              value={joiaData.comprimento}
              onChange={(e) => handleNumericChange("comprimento", e.target.value)}
              required
              placeholder="Comprimento (cm)"
            />
          </div>
          <div>
            <label htmlFor="espessura">Espessura (mm)</label>
            <input
              id="espessura"
              type="number"
              step="any"
              inputMode="decimal"
              value={joiaData.espessura}
              onChange={(e) => handleNumericChange("espessura", e.target.value)}
              required
              placeholder="Espessura (mm)"
            />
          </div>
          <div>
            <input
              type="checkbox"
              checked={joiaData.haveCharms}
              onChange={(e) =>
                handleBooleanChange("haveCharms", e.target.checked)
              }
              id="haveCharms"
            />
            <label htmlFor="haveCharms">Possui Charms</label>
          </div>
          <div>
            <label htmlFor="flexibilidade">Flexibilidade</label>
            <input
              id="flexibilidade"
              type="text"
              value={joiaData.flexibilidade}
              onChange={(e) => handleChange("flexibilidade", e.target.value)}
              required
              placeholder="Flexibilidade"
            />
          </div>
        </>
      );
    case "Relogio":
      return (
        <>
          <div>
            <label htmlFor="tipoMovimento">Tipo Movimento</label>
            <input
              id="tipoMovimento"
              type="text"
              value={joiaData.tipoMovimento}
              onChange={(e) => handleChange("tipoMovimento", e.target.value)}
              required
              placeholder="Tipo Movimento"
            />
          </div>
          <div>
            <input
              type="checkbox"
              checked={joiaData.haveWaterResistance}
              onChange={(e) =>
                handleBooleanChange("haveWaterResistance", e.target.checked)
              }
              id="haveWaterResistance"
            />
            <label htmlFor="haveWaterResistance">Resistente à Água</label>
          </div>
          <div>
            <label htmlFor="diametroCaixa">Diâmetro Caixa (mm)</label>
            <input
              id="diametroCaixa"
              type="number"
              step="any"
              inputMode="decimal"
              value={joiaData.diametroCaixa}
              onChange={(e) => handleNumericChange("diametroCaixa", e.target.value)}
              required
              placeholder="Diâmetro Caixa (mm)"
            />
          </div>
          <div>
            <label htmlFor="materialPulseira">Material Pulseira</label>
            <input
              id="materialPulseira"
              type="text"
              value={joiaData.materialPulseira}
              onChange={(e) => handleChange("materialPulseira", e.target.value)}
              required
              placeholder="Material Pulseira"
            />
          </div>
          <div>
            <label htmlFor="fonteEnergia">Fonte Energia</label>
            <input
              id="fonteEnergia"
              type="text"
              value={joiaData.fonteEnergia}
              onChange={(e) => handleChange("fonteEnergia", e.target.value)}
              required
              placeholder="Fonte Energia"
            />
          </div>
        </>
      );
    default:
      return null;
  }
}

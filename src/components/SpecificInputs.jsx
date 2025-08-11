export default function SpecificInputs({
  joiaData,
  handleChange,
  handleBooleanChange,
}) {
  function handleNumericChange(field, e) {
    const val = e.target.value;
    if (/^\d*\.?\d*$/.test(val)) {
      handleChange(field, val === "" ? "" : Number(val));
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
              type="text"
              inputMode="numeric"
              value={joiaData.tamanho}
              onChange={(e) => handleNumericChange("tamanho", e)}
              required
              placeholder="Tamanho"
            />
          </div>
          <label htmlFor="tamanho">(Aliança, Anel...)</label>
          <div>
            <input
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
            <input
              type="text"
              value={joiaData.tipoFecho}
              onChange={(e) => handleChange("tipoFecho", e.target.value)}
              required
              placeholder="Tipo de Fecho"
            />
          </div>
          <div>
            <input
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
              type="text"
              inputMode="numeric"
              value={joiaData.altura}
              onChange={(e) => handleNumericChange("altura", e)}
              required
              placeholder="Altura (cm)"
            />
          </div>
          <div>
            <label htmlFor="pesoIndividual">Peso Individual (g)</label>
            <input
              id="pesoIndividual"
              type="text"
              inputMode="numeric"
              value={joiaData.pesoIndividual}
              onChange={(e) => handleNumericChange("pesoIndividual", e)}
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
            <input
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
              type="text"
              inputMode="numeric"
              value={joiaData.comprimento}
              onChange={(e) => handleNumericChange("comprimento", e)}
              required
              placeholder="Comprimento (cm)"
            />
          </div>
          <div>
            <label htmlFor="espessura">Espessura (mm)</label>
            <input
              id="espessura"
              type="text"
              inputMode="numeric"
              value={joiaData.espessura}
              onChange={(e) => handleNumericChange("espessura", e)}
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
            <input
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
            <label htmlFor="tamanhoPiercing">Tamanho (mm)</label>
            <input
              id="tamanhoPiercing"
              type="text"
              inputMode="numeric"
              value={joiaData.tamanho}
              onChange={(e) => handleNumericChange("tamanho", e)}
              required
              placeholder="Tamanho (mm)"
            />
          </div>
          <div>
            <input
              type="text"
              value={joiaData.regiao}
              onChange={(e) => handleChange("regiao", e.target.value)}
              required
              placeholder="Região"
            />
          </div>
          <div>
            <input
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
          <input
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
            <input
              type="text"
              value={joiaData.tipoFecho}
              onChange={(e) => handleChange("tipoFecho", e.target.value)}
              required
              placeholder="Tipo de Fecho"
            />
          </div>
          <div>
            <label htmlFor="comprimentoPulseira">Comprimento (cm)</label>
            <input
              id="comprimentoPulseira"
              type="text"
              inputMode="numeric"
              value={joiaData.comprimento}
              onChange={(e) => handleNumericChange("comprimento", e)}
              required
              placeholder="Comprimento (cm)"
            />
          </div>
          <div>
            <label htmlFor="espessuraPulseira">Espessura (mm)</label>
            <input
              id="espessuraPulseira"
              type="text"
              inputMode="numeric"
              value={joiaData.espessura}
              onChange={(e) => handleNumericChange("espessura", e)}
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
            <input
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
            <input
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
              type="text"
              inputMode="numeric"
              value={joiaData.diametroCaixa}
              onChange={(e) => handleNumericChange("diametroCaixa", e)}
              required
              placeholder="Diâmetro Caixa (mm)"
            />
          </div>
          <div>
            <input
              type="text"
              value={joiaData.materialPulseira}
              onChange={(e) => handleChange("materialPulseira", e.target.value)}
              required
              placeholder="Material Pulseira"
            />
          </div>
          <div>
            <input
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

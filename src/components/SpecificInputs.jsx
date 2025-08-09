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
            <label>Tamanho</label>
            <input
              type="text"
              inputMode="numeric"
              value={joiaData.tamanho}
              onChange={(e) => handleNumericChange("tamanho", e)}
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
            <label>Altura (cm)</label>
            <input
              type="text"
              inputMode="numeric"
              value={joiaData.altura}
              onChange={(e) => handleNumericChange("altura", e)}
              required
            />
          </div>
          <div>
            <label>Peso Individual (g)</label>
            <input
              type="text"
              inputMode="numeric"
              value={joiaData.pesoIndividual}
              onChange={(e) => handleNumericChange("pesoIndividual", e)}
              required
            />
          </div>
        </>
      );
    case "Colar":
      return (
        <>
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
            <label>Comprimento (cm)</label>
            <input
              type="text"
              inputMode="numeric"
              value={joiaData.comprimento}
              onChange={(e) => handleNumericChange("comprimento", e)}
              required
            />
          </div>
          <div>
            <label>Espessura (mm)</label>
            <input
              type="text"
              inputMode="numeric"
              value={joiaData.espessura}
              onChange={(e) => handleNumericChange("espessura", e)}
              required
            />
          </div>
          <div>
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
          <div>
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
          <div>
            <label>Tamanho (mm)</label>
            <input
              type="text"
              inputMode="numeric"
              value={joiaData.tamanho}
              onChange={(e) => handleNumericChange("tamanho", e)}
              required
            />
          </div>
          <div>
            <label>Região</label>
            <input
              type="text"
              value={joiaData.regiao}
              onChange={(e) => handleChange("regiao", e.target.value)}
              required
            />
          </div>
          <div>
            <label>Fechamento</label>
            <input
              type="text"
              value={joiaData.fechamento}
              onChange={(e) => handleChange("fechamento", e.target.value)}
              required
            />
          </div>
          <div>
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
        <div>
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
            <label>Comprimento (cm)</label>
            <input
              type="text"
              inputMode="numeric"
              value={joiaData.comprimento}
              onChange={(e) => handleNumericChange("comprimento", e)}
              required
            />
          </div>
          <div>
            <label>Espessura (mm)</label>
            <input
              type="text"
              inputMode="numeric"
              value={joiaData.espessura}
              onChange={(e) => handleNumericChange("espessura", e)}
              required
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={joiaData.haveCharms}
                onChange={(e) =>
                  handleBooleanChange("haveCharms", e.target.checked)
                }
              />
              Possui Charms
            </label>
          </div>
          <div>
            <label>Flexibilidade</label>
            <input
              type="text"
              value={joiaData.flexibilidade}
              onChange={(e) => handleChange("flexibilidade", e.target.value)}
              required
            />
          </div>
        </>
      );
    case "Relogio":
      return (
        <>
          <div>
            <label>Tipo Movimento</label>
            <input
              type="text"
              value={joiaData.tipoMovimento}
              onChange={(e) => handleChange("tipoMovimento", e.target.value)}
              required
            />
          </div>
          <div>
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
          <div>
            <label>Diâmetro Caixa (mm)</label>
            <input
              type="text"
              inputMode="numeric"
              value={joiaData.diametroCaixa}
              onChange={(e) => handleNumericChange("diametroCaixa", e)}
              required
            />
          </div>
          <div>
            <label>Material Pulseira</label>
            <input
              type="text"
              value={joiaData.materialPulseira}
              onChange={(e) => handleChange("materialPulseira", e.target.value)}
              required
            />
          </div>
          <div>
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
}

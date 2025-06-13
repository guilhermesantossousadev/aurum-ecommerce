
export default function SpecificInputs({
  joiaData,
  handleChange,
  handleBooleanChange,
}) {
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
          <div>
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
          <div>
            <label>Flexibilidade</label>
            <input
              type="text"
              value={joiaData.flexibilidade}
              onChange={(e) => handleChange("flexibilidade", e.target.value)}
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

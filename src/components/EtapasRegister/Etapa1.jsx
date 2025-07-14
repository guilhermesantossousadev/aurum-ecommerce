import "../../styles/pages/Register.css";
import { toast } from "sonner"; // se ainda não estava importado

const Etapa1 = ({
  nome,
  setNome,
  cpf,
  setCpf,
  idade,
  setIdade,
  validarCPF,
  next,
}) => {
  const handleCpfChange = (e) => {
    const value = e.target.value;
    const formatted = value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2");
    setCpf(formatted);
    if (formatted.length === 14 && !validarCPF(formatted)) {
      toast.error("CPF inválido");
    }
  };

  const handleNomeChange = (e) => {
    const valor = e.target.value;

    // Permite apenas letras, acentos e espaços
    if (/^[A-Za-zÀ-ÿ\s]*$/.test(valor)) {
      setNome(valor);
    } else {
      toast.error("O nome não pode conter números ou caracteres especiais.");
    }
  };

  return (
    <>
      <div className="progress-bar">
        <div className="progress" style={{ width: "25%" }} />
      </div>

      <div className="Register__form-group">
        <input
          type="text"
          value={nome}
          onChange={handleNomeChange}
          required
          className="Register__input"
          placeholder="Nome Completo"
        />
      </div>
      <div className="Register__form-group">
        <input
          type="text"
          value={cpf}
          onChange={handleCpfChange}
          required
          className="Register__input"
          placeholder="CPF"
        />
      </div>
      <div className="Register__form-group">
        <input
          type="text"
          value={idade}
          onChange={(e) => {
            const value = e.target.value;
            // aceita apenas números
            if (/^\d*$/.test(value)) {
              setIdade(value);
            }
          }}
          required
          className="Register__input"
          placeholder="Idade"
        />
      </div>
      <button type="button" onClick={next} className="Register__button">
        Próximo
      </button>
    </>
  );
};

export default Etapa1;

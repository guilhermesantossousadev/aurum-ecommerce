import "../../styles/pages/Register.css";
import { toast } from "sonner";

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
    const rawValue = e.target.value;
    const onlyNumbers = rawValue.replace(/\D/g, "");

    // Aplica a máscara de CPF se tiver até 11 dígitos
    let formatted = onlyNumbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .slice(0, 14);

    setCpf(formatted);

    // Valida apenas se tiver 11 dígitos numéricos
    if (onlyNumbers.length === 11 && !validarCPF(onlyNumbers)) {
      toast.error("CPF inválido.");
    }
  };


  const handleNomeChange = (e) => {
    const valor = e.target.value;
    if (/^[A-Za-zÀ-ÿ\s]*$/.test(valor)) {
      setNome(valor);
    } else {
      toast.error("O nome não pode conter números ou caracteres especiais.");
    }
  };

  const handleIdadeChange = (e) => {
    const value = e.target.value;

    if (/^\d{0,2}$/.test(value)) {
      if (value && (parseInt(value) < 0 || parseInt(value) > 120)) {
        toast.error("Insira uma idade válida entre 0 e 120 anos.");
      } else {
        setIdade(value);
      }
    } else {
      toast.error("A idade deve conter apenas números.");
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
          maxLength={14}
        />
      </div>

      <div className="Register__form-group">
        <input
          type="text"
          value={idade}
          onChange={handleIdadeChange}
          required
          className="Register__input"
          placeholder="Idade"
          maxLength={2}
        />
      </div>

      <button type="button" onClick={next} className="Register__button">
        Próximo
      </button>
    </>
  );
};

export default Etapa1;

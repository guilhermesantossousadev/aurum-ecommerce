import "../styles/components/BotaoPrimario.css";

const BotaoPrimario = ({ onClick, loading, texto }) => {
  return (
    <button
      onClick={onClick}
      className="botao-primario"
      disabled={loading}
      type="button"
    >
      {loading ? <span className="loading-spinner"></span> : texto}
    </button>
  );
};

export default BotaoPrimario;

import "../../styles/pages/Register.css";

const ConfirmacaoToken = ({ token, setToken, handleSubmit, isLoading }) => {
  return (
    <div className="Register__left">
      <div className="Register__container">
        <h1 className="Register__title">Confirme o Token</h1>
        <p>Digite o token recebido no seu E-mail</p>
        <form className="Register__form" onSubmit={handleSubmit}>
          <div className="Register__form-group">
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              className="Register__input"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="Register__button"
          >
            {isLoading ? (
              <div className="loading-spinner-register" />
            ) : (
              "Validar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmacaoToken;

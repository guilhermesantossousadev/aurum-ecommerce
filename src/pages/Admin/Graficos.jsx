import "../../styles/Cruds/Cruds.css"

function Graficos() {
  return;
  <div className="Principal">
    <div className="Principal__Create">
      <div className="Principal__Create__item left">
        <h2>Anúncios</h2>
      </div>
      <div className="Principal__Create__item right">
        {" "}
        <button
          onClick={() => setStep(1)}
          style={{
            background: "#333333aa",
            color: "white",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Criar Anúncio
        </button>
      </div>
    </div>
  </div>;
}

export default Graficos;

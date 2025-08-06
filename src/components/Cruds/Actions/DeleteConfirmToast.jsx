import React, { useState } from "react";

function DeleteConfirmToast({ id, onClose, onDelete }) {
  const [localMotivo, setLocalMotivo] = useState("");

  return (
    <div
      style={{
        background: "white",
        padding: "1rem",
        borderRadius: "8px",
        maxWidth: "300px",
        textAlign: "center",
        height: "auto",
      }}
    >
      <p style={{ textAlign: "left", marginBottom: "10px" }}>Motivo:</p>
      <select
        name="motivo"
        value={localMotivo}
        required
        onChange={(e) => setLocalMotivo(e.target.value)}
        style={{ width: "100%", padding: "6px", marginBottom: "12px" }}
      >
        <option value="">Selecione um motivo</option>
        <option value="Violação dos Termos de Uso">
          Violação dos Termos de Uso
        </option>
        <option value="Violação dos Termos das Políticas">
          Violação dos Termos das Políticas
        </option>
        <option value="Atividade Fraudulenta">Atividade Fraudulenta</option>
        <option value="Atividade Suspeita">Atividade Suspeita</option>
        <option value="Criação de Múltiplas Contas">
          Criação de Múltiplas Contas
        </option>
        <option value="Solicitação do Próprio Usuário">
          Solicitação do Próprio Usuário
        </option>
      </select>
      <p>Tem certeza que deseja deletar este Usuário?</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <button
          onClick={() => {
            onDelete(localMotivo);
            onClose();
          }}
          disabled={!localMotivo}
          style={{
            background: localMotivo ? "#d9534f" : "#d9534f88",
            color: "white",
            border: "none",
            padding: "6px 12px",
            cursor: localMotivo ? "pointer" : "not-allowed",
          }}
        >
          Deletar
        </button>

        <button
          onClick={onClose}
          style={{
            background: "#6c757d",
            color: "white",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
export default DeleteConfirmToast;

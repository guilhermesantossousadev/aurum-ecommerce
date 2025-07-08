const formatCurrency = (value) => {
  if (typeof value === "number") {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  // Caso venha como string
  const numeric = Number(value);
  if (!isNaN(numeric)) {
    return numeric.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return "R$ 0,00";
};

export default formatCurrency;

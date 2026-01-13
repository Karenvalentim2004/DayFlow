import { useState } from "react";

export default function FinanceiroForm({ onAdd }) {
  const [tipo, setTipo] = useState("entrada");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      id: Date.now(),
      tipo,
      data,
      categoria,
      valor: Number(valor)
    });

    setData("");
    setCategoria("");
    setValor("");
  };

  return (
    <form className="financeiro-form" onSubmit={handleSubmit}>
      <select value={tipo} onChange={e => setTipo(e.target.value)}>
        <option value="entrada">Entrada</option>
        <option value="saida">Saída</option>
      </select>

      <input
        type="date"
        required
        value={data}
        onChange={e => setData(e.target.value)}
      />

      <input
        type="text"
        placeholder="Categoria"
        required
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
      />

      <input
        type="number"
        placeholder="Valor"
        required
        value={valor}
        onChange={e => setValor(e.target.value)}
      />

      <button type="submit">Adicionar</button>
    </form>
  );
}

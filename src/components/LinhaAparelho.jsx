import { modelo } from "../lib/consumo";
import { decimal, moeda } from "../lib/formato";

const CAMPOS = [
  { campo: "quantidade", rotulo: "Qtd." },
  { campo: "potencia", rotulo: "Potência (W)" },
  { campo: "horas", rotulo: "Horas por dia" },
  { campo: "dias", rotulo: "Dias por mês" },
];

export default function LinhaAparelho({ linha, onAlterar, onRemover }) {
  const { item, total, custo } = linha;
  const nota = modelo(item.tipo)?.nota;

  return (
    <li className="aparelho">
      <label className="aparelho__nome">
        <span>Aparelho</span>
        <input value={item.nome} onChange={(e) => onAlterar(item.uid, "nome", e.target.value)} />
        {nota && <small>{nota}</small>}
      </label>

      {CAMPOS.map(({ campo, rotulo }) => (
        <label key={campo}>
          <span>{rotulo}</span>
          <input inputMode="decimal" value={item[campo]} onChange={(e) => onAlterar(item.uid, campo, e.target.value)} />
        </label>
      ))}

      <div className="aparelho__total">
        <strong>{moeda(custo)}</strong>
        <span>{decimal(total)} kWh/mês</span>
        {item.standby > 0 && (
          <label className="aparelho__tomada">
            <input type="checkbox" checked={item.naTomada} onChange={(e) => onAlterar(item.uid, "naTomada", e.target.checked)} />
            Fica na tomada
          </label>
        )}
      </div>

      <button type="button" className="aparelho__remover" onClick={() => onRemover(item.uid)} aria-label={"Remover " + item.nome}>
        ×
      </button>
    </li>
  );
}

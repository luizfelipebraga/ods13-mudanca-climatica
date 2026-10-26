import { useState } from "react";
import { TARIFA_PADRAO, consumoMensal, modelo, numero } from "../lib/consumo";
import { decimal, moeda } from "../lib/formato";

const IDEAL = 5;

function custoDoBanho(minutos, pessoas) {
  const { total } = consumoMensal({
    quantidade: 1,
    potencia: modelo("chuveiro").potencia,
    horas: (minutos * pessoas) / 60,
    dias: 30,
  });
  return { kwh: total, reais: total * numero(TARIFA_PADRAO) };
}

export default function DesafioBanho() {
  const [minutos, setMinutos] = useState(12);
  const [pessoas, setPessoas] = useState(3);
  const atual = custoDoBanho(minutos, pessoas);
  const ideal = custoDoBanho(Math.min(minutos, IDEAL), pessoas);
  const diferenca = atual.reais - ideal.reais;

  return (
    <section className="card desafio">
      <h2>Quanto custa o banho da sua casa?</h2>
      <p className="grupo__intro">
        O chuveiro elétrico costuma ser o aparelho que mais gasta. Arraste para ver o efeito do tempo de banho.
      </p>

      <div className="desafio__controles">
        <label>
          <span>Minutos por banho: <strong>{minutos}</strong></span>
          <input type="range" min="2" max="30" value={minutos} onChange={(e) => setMinutos(Number(e.target.value))} />
        </label>
        <label>
          <span>Pessoas na casa: <strong>{pessoas}</strong></span>
          <input type="range" min="1" max="8" value={pessoas} onChange={(e) => setPessoas(Number(e.target.value))} />
        </label>
      </div>

      <div className="desafio__resultado">
        <div>
          <p className="numero numero--gasto">{moeda(atual.reais)}</p>
          <p>por mês, ou {decimal(atual.kwh, 0)} kWh</p>
        </div>
        <div>
          {diferenca > 0 ? (
            <>
              <p className="numero numero--economia">−{moeda(diferenca * 12)}</p>
              <p>por ano se cada banho durasse {IDEAL} minutos</p>
            </>
          ) : (
            <>
              <p className="numero numero--economia">Ótimo!</p>
              <p>Banhos de até {IDEAL} minutos já são econômicos.</p>
            </>
          )}
        </div>
      </div>
      <p className="nota">Chuveiro de {modelo("chuveiro").potencia} W, um banho por pessoa por dia e tarifa de R$ {TARIFA_PADRAO} por kWh.</p>
    </section>
  );
}

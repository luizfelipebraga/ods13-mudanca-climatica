import { Bar } from "react-chartjs-2";
import { cores } from "../lib/graficos";

const opcoes = {
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, ticks: { precision: 0 } },
    x: { grid: { display: false } },
  },
};

export default function GraficoBarra({ titulo, rotulos, valores, largo, cor = cores[1] }) {
  const dados = {
    labels: rotulos,
    datasets: [{ data: valores, backgroundColor: cor, borderRadius: 8, maxBarThickness: 48 }],
  };

  return (
    <article className={largo ? "card card--largo" : "card"}>
      <h2>{titulo}</h2>
      <Bar data={dados} options={opcoes} />
    </article>
  );
}

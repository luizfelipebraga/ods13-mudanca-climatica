import { Doughnut } from "react-chartjs-2";
import { cores } from "../lib/graficos";

const opcoes = {
  plugins: {
    tooltip: {
      callbacks: {
        label(ctx) {
          const total = ctx.dataset.data.reduce((soma, n) => soma + n, 0);
          const pct = total ? Math.round((ctx.parsed / total) * 100) : 0;
          return ` ${ctx.label}: ${ctx.parsed} (${pct}%)`;
        },
      },
    },
  },
};

export default function GraficoRosca({ titulo, rotulos, valores }) {
  const dados = {
    labels: rotulos,
    datasets: [{ data: valores, backgroundColor: cores, borderWidth: 0 }],
  };

  return (
    <article className="card">
      <h2>{titulo}</h2>
      <Doughnut data={dados} options={opcoes} />
    </article>
  );
}

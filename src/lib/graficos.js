import { ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from "chart.js";

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

Chart.defaults.font.family = '"Source Sans 3", sans-serif';
Chart.defaults.color = "#5e584f";
Chart.defaults.plugins.legend.position = "bottom";

export const cores = ["#3f7e44", "#1f6fa8", "#8cc084", "#7fb3d9", "#e0a100", "#c4572e"];
export const corGasto = "#e0a100";

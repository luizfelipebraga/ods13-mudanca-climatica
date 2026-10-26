import { useState } from "react";
import { idDaPlanilha, linkDaPlanilha } from "../lib/planilha";

export default function FormPlanilha({ planilha, aviso, onAviso, onTrocar }) {
  const [entrada, setEntrada] = useState(() => linkDaPlanilha(planilha));

  function enviar(evento) {
    evento.preventDefault();
    const id = idDaPlanilha(entrada);
    if (!id) {
      onAviso({ texto: "Cole o link da planilha. Ele tem /spreadsheets/d/ no endereço.", erro: true });
      return;
    }
    onTrocar(id);
  }

  return (
    <form className="planilha" onSubmit={enviar}>
      <label htmlFor="url-planilha">Planilha de respostas do Google</label>
      <div className="planilha__linha">
        <input
          id="url-planilha"
          type="text"
          placeholder="Cole o link da planilha ligada ao formulário"
          autoComplete="off"
          value={entrada}
          onChange={(evento) => setEntrada(evento.target.value)}
        />
        <button type="submit">Atualizar</button>
      </div>
      <p className={aviso.erro ? "aviso aviso--erro" : "aviso"}>{aviso.texto}</p>
    </form>
  );
}

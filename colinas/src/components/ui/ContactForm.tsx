"use client";
import { useState } from "react";

type Errors = Partial<Record<"name" | "email" | "phone" | "subject" | "message", string>>;
type State = { status: "idle" | "sending" | "ok" | "error"; message?: string; errors?: Errors };

export function ContactForm() {
  const [s, setS] = useState<State>({ status: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setS({ status: "sending" });
    try {
      const res = await fetch("/api/contato", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (res.ok) { form.reset(); setS({ status: "ok", message: "Mensagem enviada. Retornaremos em breve." }); }
      else setS({ status: "error", message: json.message ?? "Não foi possível enviar agora.", errors: json.errors });
    } catch {
      setS({ status: "error", message: "Falha de conexão. Tente novamente ou use o WhatsApp." });
    }
  }

  const Field = ({ id, label, type = "text", area = false, required = true }: { id: keyof Errors; label: string; type?: string; area?: boolean; required?: boolean }) => (
    <div className="field">
      <label htmlFor={id}>{label}{required ? "" : " (opcional)"}</label>
      {area ? (
        <textarea id={id} name={id} className="textarea" required={required} aria-invalid={!!s.errors?.[id]} aria-describedby={s.errors?.[id] ? `${id}-e` : undefined} />
      ) : (
        <input id={id} name={id} type={type} className="input" required={required} aria-invalid={!!s.errors?.[id]} aria-describedby={s.errors?.[id] ? `${id}-e` : undefined} autoComplete={id === "name" ? "name" : id === "email" ? "email" : id === "phone" ? "tel" : "off"} />
      )}
      {s.errors?.[id] && <span id={`${id}-e`} className="err">{s.errors[id]}</span>}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate style={{ display: "grid", gap: 20 }} aria-describedby="form-status">
      <Field id="name" label="Nome" />
      <Field id="email" label="E-mail" type="email" />
      <Field id="phone" label="Telefone" type="tel" required={false} />
      <Field id="subject" label="Assunto" />
      <Field id="message" label="Mensagem" area />
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
      <div><button className="btn" disabled={s.status === "sending"}>{s.status === "sending" ? "Enviando…" : "Enviar mensagem"}</button></div>
      <p id="form-status" role="status" aria-live="polite" className={s.status === "error" ? "err" : "label label--ink"}>{s.message}</p>
    </form>
  );
}

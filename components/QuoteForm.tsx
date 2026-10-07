"use client";

import { AlertCircle, Check, Mail, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { services } from "@/lib/services";
import { site, whatsappLink } from "@/lib/site";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  company: string;
  phone: string;
  email: string;
  segments: string[];
  quantity: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  company: "",
  phone: "",
  email: "",
  segments: [],
  quantity: "",
  message: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

/** Opções do campo "Serviço / função" — o cliente pode marcar várias. */
const segmentOptions = [
  ...services.map((service) => service.title),
  "Outro / modelo exclusivo",
];

function validate(values: FormState): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 3) errors.name = "Informe o seu nome completo.";
  if (values.company.trim().length < 2)
    errors.company = "Informe o nome do condomínio.";

  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10) errors.phone = "Informe um telefone com DDD.";

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "E-mail inválido.";
  }

  return errors;
}

type Status = "idle" | "sending" | "sent" | "error";

/**
 * O envio vai para `app/api/orcamento`, que manda a solicitação por e-mail
 * (Resend). Se falhar, oferecemos o WhatsApp já preenchido como alternativa.
 */
export function QuoteForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");

  function toggleSegment(option: string) {
    setValues((current) => ({
      ...current,
      segments: current.segments.includes(option)
        ? current.segments.filter((item) => item !== option)
        : [...current.segments, option],
    }));
  }

  const update = (field: Exclude<keyof FormState, "segments">) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  function whatsappFallback() {
    const lines = [
      `*Solicitação de orçamento — ${site.name}*`,
      "",
      `*Nome:* ${values.name}`,
      `*Condomínio:* ${values.company}`,
      `*Telefone:* ${values.phone}`,
      values.email ? `*E-mail:* ${values.email}` : null,
      values.segments.length ? `*Serviço:* ${values.segments.join(", ")}` : null,
      values.quantity ? `*Quantidade estimada:* ${values.quantity}` : null,
      values.message ? `*Detalhes:* ${values.message}` : null,
    ].filter(Boolean);

    return whatsappLink(lines.join("\n"));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          segments: undefined,
          segment: values.segments.join(", "),
          website: honeypot,
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("sent");
      setValues(initialState);
    } catch {
      setStatus("error");
    }
  }

  const labelClass = "mb-2 block font-display text-sm font-semibold text-brand-heading";

  const fieldClass = cn("w-full text-sm outline-none transition-colors", theme.ui.field);

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("relative p-7 sm:p-9", theme.ui.card)}>
      <h3 className="text-2xl">
        Solicite sua cotação
      </h3>
      <p className="mt-2 text-sm text-brand-muted">
        Preencha em um minuto e respondemos em menos de 5. Confira preços,
        prazos e a resposta de suas dúvidas.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Nome*" error={errors.name} labelClass={labelClass}>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={update("name")}
            className={fieldClass}
            placeholder="Como podemos te chamar?"
            autoComplete="name"
          />
        </Field>

        <Field id="company" label="Condomínio*" error={errors.company} labelClass={labelClass}>
          <input
            id="company"
            name="company"
            value={values.company}
            onChange={update("company")}
            className={fieldClass}
            placeholder="Nome do condomínio."
            autoComplete="organization"
          />
        </Field>

        <Field id="email" label="E-mail" error={errors.email} labelClass={labelClass}>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={update("email")}
            className={fieldClass}
            placeholder="condominio@gmail.com"
            autoComplete="email"
          />
        </Field>

        <Field id="phone" label="Telefone / WhatsApp*" error={errors.phone} labelClass={labelClass}>
          <input
            id="phone"
            name="phone"
            value={values.phone}
            onChange={update("phone")}
            className={fieldClass}
            placeholder="(00) 00000-0000"
            inputMode="tel"
            autoComplete="tel"
          />
        </Field>

        {/* Várias opções podem ser marcadas: caixas de seleção com cara de
            botão, agrupadas num fieldset para leitores de tela. */}
        <fieldset className="sm:col-span-2">
          <legend className={labelClass}>
            Serviço / função{" "}
            <span className="font-normal text-brand-muted">(marque quantos quiser)</span>
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {segmentOptions.map((option) => {
              const checked = values.segments.includes(option);
              return (
                <label
                  key={option}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-brand border px-4 py-3 text-sm transition-colors duration-200",
                    "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-primary/40",
                    checked
                      ? "border-brand-primary bg-brand-primary/10 text-brand-heading"
                      : "border-brand-border bg-brand-surface-2 text-brand-muted hover:border-brand-primary/50",
                  )}
                >
                  <input
                    type="checkbox"
                    name="segment"
                    value={option}
                    checked={checked}
                    onChange={() => toggleSegment(option)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
                      checked
                        ? "border-brand-primary bg-brand-primary text-brand-on-primary"
                        : "border-brand-border bg-transparent",
                    )}
                  >
                    {checked ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
                  </span>
                  {option}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <Field id="quantity" label="Quantidade estimada" labelClass={labelClass}>
            <input
              id="quantity"
              name="quantity"
              value={values.quantity}
              onChange={update("quantity")}
              className={fieldClass}
              placeholder="Ex.: 90 peças"
              inputMode="numeric"
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field
            id="message"
            label="Detalhes do pedido de cotação"
            labelClass={labelClass}
          >
            <textarea
              id="message"
              name="message"
              value={values.message}
              onChange={update("message")}
              rows={4}
              className={cn(fieldClass, "resize-y")}
              placeholder="Tire dúvidas, escolha cores, quantidade, agende a visita e mais."
            />
          </Field>
        </div>
      </div>

      {/* Campo-isca contra spam: invisível para pessoas, robôs preenchem. */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />

      <Button
        type="submit"
        size="lg"
        className="mt-8 w-full"
        icon={<Send className="h-4 w-4" />}
        disabled={status === "sending"}
      >
        {status === "sending" ? "Enviando..." : "Enviar solicitação"}
      </Button>

      <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-brand-muted">
        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
        A solicitação chega direto no e-mail da {site.name}.
      </p>

      {/* Confirmação anunciada a leitores de tela */}
      <p role="status" aria-live="polite" className="mt-4 text-center text-sm font-medium">
        {status === "sent" ? (
          <span className="text-brand-green">
            Solicitação enviada! Em breve entraremos em contato.
          </span>
        ) : status === "error" ? (
          <span className="text-brand-red">
            Não conseguimos enviar agora.{" "}
            <a
              href={whatsappFallback()}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Envie pelo WhatsApp
            </a>
            .
          </span>
        ) : null}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  labelClass,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  labelClass: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-brand-red">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

"use client";

import { AlertCircle, MessageCircle, Send } from "lucide-react";
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
  segment: string;
  quantity: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  company: "",
  phone: "",
  email: "",
  segment: services[0].title,
  quantity: "",
  message: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

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

/**
 * O envio monta uma mensagem estruturada e abre o WhatsApp da empresa.
 * Para trocar por um envio de verdade (e-mail/CRM), substitua o corpo de
 * `handleSubmit` por um fetch para uma route handler em `app/api/...`.
 */
export function QuoteForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const update = (field: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const lines = [
      `*Solicitação de orçamento — ${site.name}*`,
      "",
      `*Nome:* ${values.name}`,
      `*Condomínio:* ${values.company}`,
      `*Telefone:* ${values.phone}`,
      values.email ? `*E-mail:* ${values.email}` : null,
      `*Serviço:* ${values.segment}`,
      values.quantity ? `*Quantidade estimada:* ${values.quantity}` : null,
      values.message ? `*Detalhes:* ${values.message}` : null,
    ].filter(Boolean);

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const labelClass =
    "mb-2 block font-display text-xs uppercase tracking-[0.2em] text-brand-accent";

  const fieldClass = cn("w-full text-sm outline-none transition-colors", theme.ui.field);

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("p-7 sm:p-9", theme.ui.card)}>
      <h3 className="font-display text-2xl uppercase tracking-[0.08em]">
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

        <Field id="segment" label="Serviço / função" labelClass={labelClass}>
          <select
            id="segment"
            name="segment"
            value={values.segment}
            onChange={update("segment")}
            className={fieldClass}
          >
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Outro / modelo exclusivo">Outro / modelo exclusivo</option>
          </select>
        </Field>

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

      <Button
        type="submit"
        size="lg"
        className="mt-8 w-full"
        icon={<Send className="h-4 w-4" />}
      >
        Enviar solicitação
      </Button>

      <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-brand-muted">
        <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
        Ao enviar, a solicitação é aberta no WhatsApp já preenchida.
      </p>

      {/* Confirmação anunciada a leitores de tela */}
      <p
        role="status"
        aria-live="polite"
        className={cn(
          "mt-4 text-center text-sm text-brand-green",
          sent ? "block" : "hidden",
        )}
      >
        Solicitação montada! Se o WhatsApp não abrir, verifique o bloqueador de
        pop-ups do navegador.
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

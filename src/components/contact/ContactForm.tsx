"use client";

import { AlertCircle, ExternalLink, Info, MessageCircle, Send } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { contactFormMessage, whatsappUrl, type ContactFormValues } from "@/lib/whatsapp";

type Field = keyof ContactFormValues;
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ORDER: Field[] = ["name", "email", "subject", "message"];
/** Keeps the pre-filled WhatsApp link well within what browsers and WhatsApp accept. */
const MAX: Record<Field, number> = { name: 80, email: 120, subject: 120, message: 1500 };

function validate(values: ContactFormValues): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (values.email.trim() && !EMAIL_RE.test(values.email.trim()))
    errors.email = "Please enter a valid email address, e.g. name@example.com.";
  if (!values.message.trim()) errors.message = "Please tell us how we can help.";
  else if (values.message.trim().length < 5) errors.message = "Please add a little more detail to your message.";
  return errors;
}

const empty: ContactFormValues = { name: "", email: "", subject: "", message: "" };

/**
 * Static-site contact form: nothing is sent to a server. On submit it opens
 * WhatsApp with the visitor's details pre-filled; the visitor sends it from there.
 */
export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [preparedUrl, setPreparedUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const update = (field: Field) => (e: { target: { value: string } }) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    // Re-validate a field live only once it has shown an error.
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: validate(next)[field] }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = ORDER.find((f) => found[f]);
    if (firstInvalid) {
      setPreparedUrl(null);
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    const url = whatsappUrl(contactFormMessage(values));
    setPreparedUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5" aria-describedby="form-note">
      {errorCount > 0 && (
        <div role="alert" className="flex gap-3 rounded-2xl bg-mist p-4 text-sm font-medium text-navy ring-1 ring-clinic/30">
          <AlertCircle className="size-5 shrink-0 text-clinic" aria-hidden />
          Please check the {errorCount === 1 ? "highlighted field" : `${errorCount} highlighted fields`} below.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Your Name" name="name" required autoComplete="name" maxLength={MAX.name} value={values.name} onChange={update("name")} error={errors.name} />
        <TextField
          label="Email Address"
          name="email"
          type="email"
          optional
          autoComplete="email"
          inputMode="email"
          maxLength={MAX.email}
          value={values.email}
          onChange={update("email")}
          error={errors.email}
        />
      </div>
      <TextField label="Subject" name="subject" optional maxLength={MAX.subject} value={values.subject} onChange={update("subject")} error={errors.subject} />
      <TextField label="Message" name="message" required multiline maxLength={MAX.message} value={values.message} onChange={update("message")} error={errors.message} />

      <p id="form-note" className="flex gap-2.5 text-sm leading-relaxed text-navy/70">
        <Info className="mt-0.5 size-4 shrink-0 text-clinic" aria-hidden />
        Sending opens WhatsApp with your message ready. Your enquiry reaches us only after you press Send in WhatsApp.
      </p>

      <button
        type="submit"
        className="btn-fx btn-sheen group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 font-semibold text-white shadow-[0_14px_30px_-14px_rgb(10_99_168/0.85)] hover:shadow-[0_20px_38px_-14px_rgb(10_99_168/0.95)] sm:w-fit"
      >
        <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        Send Message
      </button>

      <div role="status" aria-live="polite">
        {preparedUrl && (
          <div className="flex gap-3 rounded-2xl bg-mist p-5 ring-1 ring-line">
            <MessageCircle className="mt-0.5 size-5 shrink-0 text-clinic" aria-hidden />
            <div className="text-sm leading-relaxed text-navy/80">
              <p className="font-semibold text-navy">Your message is ready in WhatsApp.</p>
              <p className="mt-1">
                Press <strong>Send</strong> in WhatsApp to deliver it to our team. If WhatsApp didn&apos;t open,{" "}
                <a
                  href={preparedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-clinic underline underline-offset-2 hover:text-navy"
                >
                  open it here
                  <ExternalLink className="size-3.5" aria-hidden />
                </a>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

interface TextFieldProps {
  label: string;
  name: Field;
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  error?: string;
  required?: boolean;
  optional?: boolean;
  multiline?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: "email" | "text";
  maxLength?: number;
}

function TextField({ label, name, value, onChange, error, required, optional, multiline, type = "text", autoComplete, inputMode, maxLength }: TextFieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    value,
    onChange,
    required,
    autoComplete,
    maxLength,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: cn(
      "w-full rounded-2xl border bg-white px-4 text-base text-navy placeholder:text-silver/70 transition-[border-color,box-shadow] duration-200 outline-none",
      "focus:border-clinic focus:ring-4 focus:ring-sky/15",
      error ? "border-clinic ring-2 ring-clinic/20" : "border-line hover:border-sky/60",
    ),
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-semibold text-navy">
        <span>
          {label}
          {required && (
            <span className="text-clinic" aria-hidden>
              {" "}
              *
            </span>
          )}
        </span>
        {optional && <span className="text-xs font-medium text-navy/70">Optional</span>}
      </label>
      {multiline ? (
        <textarea {...shared} rows={6} className={cn(shared.className, "resize-y py-3.5")} />
      ) : (
        <input {...shared} type={type} inputMode={inputMode} className={cn(shared.className, "h-13")} />
      )}
      {error && (
        <p id={errorId} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-clinic">
          <AlertCircle className="size-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

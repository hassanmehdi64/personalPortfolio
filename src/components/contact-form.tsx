"use client"

import { useState, useTransition } from "react"
import { useForm, useWatch, type Resolver } from "react-hook-form"
import { sendContactMessage } from "@/app/actions"
import { Icon } from "@/components/icons"
import { notify } from "@/components/toaster"
import { contactSchema, MESSAGE_MAX, type ContactInput } from "@/lib/contact-schema"
import { cn } from "@/lib/utils"

/** react-hook-form resolver backed by the shared zod schema. */
const zodResolver: Resolver<ContactInput> = async (values) => {
  const r = contactSchema.safeParse(values)
  if (r.success) return { values: r.data, errors: {} }
  const errors: Record<string, { type: string; message: string }> = {}
  for (const issue of r.error.issues) {
    const key = String(issue.path[0])
    if (!errors[key]) errors[key] = { type: issue.code, message: issue.message }
  }
  return { values: {}, errors }
}

const field = cn(
  "w-full rounded-md border border-border-strong bg-field px-3.5 text-[15px] text-foreground transition-[border-color,box-shadow] duration-150 outline-none placeholder:text-faint",
  "hover:border-border-hover focus:border-primary focus:shadow-[0_0_0_3px_rgba(16,185,129,0.25)]",
  "aria-invalid:border-destructive aria-invalid:focus:shadow-[0_0_0_3px_rgba(248,113,113,0.20)]",
  "disabled:cursor-not-allowed disabled:opacity-50"
)

type Status = "idle" | "sent"

export function ContactForm() {
  const [pending, startTransition] = useTransition()
  const [status, setStatus] = useState<Status>("idle")
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver,
    mode: "onTouched",
    defaultValues: { name: "", email: "", subject: "", message: "" },
  })
  const messageLength = useWatch({ control, name: "message" })?.length ?? 0

  const onSubmit = (data: ContactInput) =>
    startTransition(async () => {
      try {
        const res = await sendContactMessage(data)
        if (res.ok) {
          notify("success", "Message sent", "Thanks! I’ll get back to you by email.")
          reset()
          setStatus("sent")
          window.setTimeout(() => setStatus("idle"), 4000)
        } else {
          notify("error", "Couldn’t send message", res.error || "Check your connection and try again.")
        }
      } catch {
        notify("error", "Couldn’t send message", "Check your connection and try again.")
      }
    })

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Contact form"
      className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-card md:p-8"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field id="f-name" label="Name" error={errors.name?.message}>
          <input
            id="f-name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "f-name-err" : undefined}
            disabled={pending}
            className={cn(field, "h-12")}
            {...register("name")}
          />
        </Field>
        <Field id="f-email" label="Email" error={errors.email?.message}>
          <input
            id="f-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "f-email-err" : undefined}
            disabled={pending}
            className={cn(field, "h-12")}
            {...register("email")}
          />
        </Field>
      </div>
      <Field id="f-subject" label="Subject" error={errors.subject?.message}>
        <input
          id="f-subject"
          type="text"
          placeholder="What's this about?"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "f-subject-err" : undefined}
          disabled={pending}
          className={cn(field, "h-12")}
          {...register("subject")}
        />
      </Field>
      <Field
        id="f-msg"
        label="Message"
        error={errors.message?.message}
        aside={
          <span className={cn("font-mono text-xs", messageLength > MESSAGE_MAX ? "text-destructive" : "text-faint")}>
            {messageLength} / {MESSAGE_MAX}
          </span>
        }
      >
        <textarea
          id="f-msg"
          rows={5}
          placeholder="Tell me about your project, role or idea…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "f-msg-err" : undefined}
          disabled={pending}
          className={cn(field, "resize-y py-3 leading-[1.5]")}
          {...register("message")}
        />
      </Field>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="text-[13px] text-faint">I&apos;ll reply by email. No spam, ever.</span>
        {status === "sent" ? (
          <span
            role="status"
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-lg border border-primary/40 bg-tint px-6 text-[15px] font-semibold text-tint-text max-sm:w-full"
          >
            <Icon name="check" size={16} strokeWidth={2} />
            Message sent
          </span>
        ) : (
          <button
            type="submit"
            disabled={pending}
            aria-busy={pending}
            className={cn(
              "inline-flex h-12 items-center justify-center gap-2.5 rounded-lg px-6 text-[15px] font-semibold transition-[background-color,transform,box-shadow] duration-200 outline-none max-sm:w-full",
              "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card",
              pending
                ? "cursor-wait bg-[#0E7A57] text-[#E7FBF3]"
                : "bg-primary text-primary-foreground hover:-translate-y-px hover:bg-primary-hover hover:shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] active:scale-[0.98] active:bg-primary-active"
            )}
          >
            {pending ? (
              <>
                <Icon name="spinner" size={16} strokeWidth={2} className="animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Send Message
                <Icon name="send" size={16} strokeWidth={1.75} />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  aside,
  children,
}: {
  id: string
  label: string
  error?: string
  aside?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {(error || aside) && (
        <div className="flex items-start justify-between gap-3">
          {error ? (
            <span id={`${id}-err`} className="flex min-h-5 items-center gap-1.5 text-[13px] text-destructive">
              <Icon name="alert" size={14} />
              {error}
            </span>
          ) : (
            <span />
          )}
          {aside}
        </div>
      )}
    </div>
  )
}

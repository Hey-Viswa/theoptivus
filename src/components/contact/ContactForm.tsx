'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SITE_CONFIG } from '@/data/site';
import { ArrowRight, ArrowUpRight, Check, Copy, Mail } from '@/components/ui/Icons';

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name (at least 2 characters).'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters.')
    .max(1000, 'Message must be 1000 characters or fewer.'),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface PreparedMailtoPayload {
  name: string;
  email: string;
  message: string;
  mailtoHref: string;
  formattedBody: string;
}

export function DirectEmailCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${SITE_CONFIG.email}`;
    }
  };

  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)]">
          Direct Email
        </span>
        <Mail className="w-4 h-4 text-[var(--fg-muted)]" />
      </div>

      <div>
        <a
          href={`mailto:${SITE_CONFIG.email}`}
          className="font-display text-base sm:text-lg font-semibold text-[var(--fg-primary)] hover:text-[var(--accent)] transition-colors break-all"
        >
          {SITE_CONFIG.email}
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        <a
          href={`mailto:${SITE_CONFIG.email}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono bg-[var(--bg-inverse)] text-[#F6F5F0] hover:bg-[var(--accent)] transition-colors"
        >
          <span>Compose email</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Email copied' : 'Copy email address'}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--fg-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="text-[var(--accent)] font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[var(--fg-muted)]" />
              <span>Copy address</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'mailto-ready'
  >('idle');
  const [messageLength, setMessageLength] = useState(0);
  const [preparedPayload, setPreparedPayload] =
    useState<PreparedMailtoPayload | null>(null);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      honeypot: '',
    },
  });

  const buildMailtoPayload = (data: ContactFormData): PreparedMailtoPayload => {
    const subject = `Inquiry from ${data.name} — Portfolio Contact`;
    const formattedBody = `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;
    const mailtoHref = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(formattedBody)}`;

    return {
      name: data.name,
      email: data.email,
      message: data.message,
      mailtoHref,
      formattedBody,
    };
  };

  const onSubmit = async (data: ContactFormData) => {
    if (data.honeypot && data.honeypot.trim().length > 0) {
      setStatus('success');
      reset();
      setMessageLength(0);
      return;
    }

    setStatus('submitting');
    const payload = buildMailtoPayload(data);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim();

    if (!accessKey) {
      setPreparedPayload(payload);
      setStatus('mailto-ready');
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: data.name,
          email: data.email,
          message: data.message,
          subject: `Portfolio contact from ${data.name}`,
          from_name: `${SITE_CONFIG.name} Portfolio`,
          botcheck: data.honeypot || '',
        }),
      });

      const result: unknown = await response.json();
      const isSuccess =
        response.ok &&
        typeof result === 'object' &&
        result !== null &&
        'success' in result &&
        Boolean((result as { success?: boolean }).success);

      if (!isSuccess) {
        setPreparedPayload(payload);
        setStatus('mailto-ready');
        return;
      }

      setStatus('success');
      reset();
      setMessageLength(0);
    } catch {
      setPreparedPayload(payload);
      setStatus('mailto-ready');
    }
  };

  const handleCopyPreparedMessage = async () => {
    if (!preparedPayload) return;
    try {
      await navigator.clipboard.writeText(
        `To: ${SITE_CONFIG.email}\n${preparedPayload.formattedBody}`
      );
      setCopiedMessage(true);
      window.setTimeout(() => setCopiedMessage(false), 2400);
    } catch {
      window.location.href = preparedPayload.mailtoHref;
    }
  };

  const handleResetForm = () => {
    reset();
    setMessageLength(0);
    setPreparedPayload(null);
    setCopiedMessage(false);
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <div className="py-6 space-y-6">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
          <Check className="w-5 h-5" />
        </div>

        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
            Message Delivered
          </p>
          <h2 className="font-display text-2xl font-semibold text-[var(--fg-primary)]">
            Thank you for reaching out.
          </h2>
          <p className="text-sm sm:text-base text-[var(--fg-secondary)] leading-relaxed max-w-lg">
            Your message has been sent directly to my inbox. I review inquiries
            daily and will reply to you soon.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleResetForm}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--fg-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
          >
            <span>Send another message</span>
          </button>
        </div>
      </div>
    );
  }

  if (status === 'mailto-ready' && preparedPayload) {
    return (
      <div className="py-4 space-y-6">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
          <Mail className="w-5 h-5" />
        </div>

        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
            Ready to Send
          </p>
          <h2 className="font-display text-2xl font-semibold text-[var(--fg-primary)]">
            Complete dispatch via your email client
          </h2>
          <p className="text-sm sm:text-base text-[var(--fg-secondary)] leading-relaxed">
            Your message for{' '}
            <span className="font-medium text-[var(--fg-primary)]">
              {SITE_CONFIG.email}
            </span>{' '}
            has been formatted with your contact details below. Open it directly
            in your email app or copy the formatted message.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4 space-y-2 font-mono text-xs text-[var(--fg-secondary)]">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[var(--border-subtle)]">
            <span>
              From: <strong className="text-[var(--fg-primary)]">{preparedPayload.name}</strong> ({preparedPayload.email})
            </span>
            <span className="text-[var(--fg-muted)]">To: {SITE_CONFIG.email}</span>
          </div>
          <p className="font-sans text-sm text-[var(--fg-primary)] whitespace-pre-wrap leading-relaxed pt-1">
            {preparedPayload.message}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href={preparedPayload.mailtoHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-[var(--bg-inverse)] text-[#F6F5F0] hover:bg-[var(--accent)] transition-colors"
          >
            <span>Open Email App</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={handleCopyPreparedMessage}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--fg-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
          >
            {copiedMessage ? (
              <>
                <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span className="text-[var(--accent)] font-medium">
                  Copied Message
                </span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[var(--fg-muted)]" />
                <span>Copy Message</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="inline-flex items-center px-3.5 py-2.5 rounded-full text-xs font-mono text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-colors cursor-pointer"
          >
            Edit message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Honeypot Spam Trap */}
      <input
        type="text"
        {...register('honeypot')}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div className="space-y-2">
          <label
            htmlFor="contact-name"
            className="block font-mono text-xs uppercase tracking-wider text-[var(--fg-secondary)]"
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            {...register('name')}
            className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg-canvas)]/50 text-sm text-[var(--fg-primary)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:bg-[var(--bg-surface)] transition-colors ${
              errors.name
                ? 'border-[var(--accent)]'
                : 'border-[var(--border-subtle)] focus:border-[var(--accent)]'
            }`}
          />
          {errors.name && (
            <p
              role="alert"
              className="font-mono text-xs text-[var(--accent)] pt-0.5"
            >
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="contact-email"
            className="block font-mono text-xs uppercase tracking-wider text-[var(--fg-secondary)]"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            {...register('email')}
            className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg-canvas)]/50 text-sm text-[var(--fg-primary)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:bg-[var(--bg-surface)] transition-colors ${
              errors.email
                ? 'border-[var(--accent)]'
                : 'border-[var(--border-subtle)] focus:border-[var(--accent)]'
            }`}
          />
          {errors.email && (
            <p
              role="alert"
              className="font-mono text-xs text-[var(--accent)] pt-0.5"
            >
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor="contact-message"
            className="block font-mono text-xs uppercase tracking-wider text-[var(--fg-secondary)]"
          >
            Message
          </label>
          <span
            className={`font-mono text-xs ${
              messageLength > 900
                ? 'text-[var(--accent)] font-medium'
                : 'text-[var(--fg-muted)]'
            }`}
          >
            {messageLength}/1000
          </span>
        </div>

        <textarea
          id="contact-message"
          rows={6}
          placeholder="Share context about the role, project scope, timeline, or engineering problem..."
          aria-invalid={Boolean(errors.message)}
          {...register('message', {
            onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
              setMessageLength(event.target.value.length);
            },
          })}
          className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg-canvas)]/50 text-sm text-[var(--fg-primary)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:bg-[var(--bg-surface)] transition-colors resize-y ${
            errors.message
              ? 'border-[var(--accent)]'
              : 'border-[var(--border-subtle)] focus:border-[var(--accent)]'
          }`}
        />

        {errors.message && (
          <p
            role="alert"
            className="font-mono text-xs text-[var(--accent)] pt-0.5"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Row */}
      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium bg-[var(--bg-inverse)] text-[#F6F5F0] hover:bg-[var(--accent)] disabled:opacity-60 transition-colors cursor-pointer shrink-0"
        >
          <span>
            {status === 'submitting' ? 'Sending...' : 'Send message'}
          </span>
          <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}

export default ContactForm;

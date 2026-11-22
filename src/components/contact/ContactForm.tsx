'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SITE_CONFIG } from '@/data/site';

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
    <div>
      <p className="editorial-label">Email</p>
      <p className="contact-address">
        <a className="text-link" href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
      </p>
      <button className="subtle-button" type="button" onClick={handleCopy}>
        {copied ? 'Address copied' : 'Copy email address'}
      </button>
      <span className="sr-only" role="status">{copied ? 'Email address copied to clipboard' : ''}</span>
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
      <div className="contact-result">
        <h3 role="status">Message sent</h3>
        <p>Thanks for reaching out.</p>
        <div className="contact-form-actions">
          <button type="button" className="subtle-button" onClick={handleResetForm}>Send another message</button>
        </div>
      </div>
    );
  }

  if (status === 'mailto-ready' && preparedPayload) {
    return (
      <div className="contact-result">
        <h3 role="status">Your email draft is ready</h3>
        <p>Open it in your email app to send, or copy the message.</p>
        <div className="contact-preview">
          <p>To {SITE_CONFIG.email}</p>
          <p>From {preparedPayload.name} ({preparedPayload.email})</p>
          <p>{preparedPayload.message}</p>
        </div>
        <div className="contact-form-actions">
          <a className="solid-link" href={preparedPayload.mailtoHref}>Open email app</a>
          <button className="subtle-button" type="button" onClick={handleCopyPreparedMessage}>
            {copiedMessage ? 'Message copied' : 'Copy message'}
          </button>
          <button className="subtle-button" type="button" onClick={() => setStatus('idle')}>Edit message</button>
        </div>
        <span className="sr-only" role="status">{copiedMessage ? 'Message copied to clipboard' : ''}</span>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <input type="text" {...register('honeypot')} hidden tabIndex={-1} autoComplete="off" />

      <div className="contact-fields">
        <div className="contact-field">
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            {...register('name')}
          />
          {errors.name && <p className="contact-error" id="contact-name-error" role="alert">{errors.name.message}</p>}
        </div>

        <div className="contact-field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            {...register('email')}
          />
          {errors.email && <p className="contact-error" id="contact-email-error" role="alert">{errors.email.message}</p>}
        </div>
      </div>

      <div className="contact-field">
        <div className="contact-field-caption">
          <label htmlFor="contact-message">Message</label>
          <span id="contact-message-length">{messageLength}/1000 characters</span>
        </div>
        <textarea
          id="contact-message"
          rows={6}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error contact-message-length' : 'contact-message-length'}
          {...register('message', {
            onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
              setMessageLength(event.target.value.length);
            },
          })}
        />
        {errors.message && <p className="contact-error" id="contact-message-error" role="alert">{errors.message.message}</p>}
      </div>

      <div className="contact-form-actions">
        <button className="solid-link" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}

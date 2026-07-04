import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 1000;

const TIPO_LABELS: Record<string, string> = {
  trabajo: 'Oferta de trabajo',
  freelance: 'Proyecto freelance',
  networking: 'Networking / Otro',
};

interface ContactBody {
  nombre: string;
  email: string;
  tipo: string;
  empresa: string;
  mensaje: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function validate(body: Partial<ContactBody>): string | null {
  if (!body.nombre?.trim()) return 'El nombre es obligatorio.';
  if (!body.email?.trim()) return 'El email es obligatorio.';
  if (!EMAIL_RE.test(body.email.trim())) return 'El email no tiene un formato válido.';
  if (!body.tipo || !(body.tipo in TIPO_LABELS)) return 'Selecciona un motivo de contacto válido.';
  if (!body.mensaje?.trim()) return 'El mensaje es obligatorio.';
  if (body.mensaje.length > MAX_MESSAGE_LENGTH) return `El mensaje no puede superar ${MAX_MESSAGE_LENGTH} caracteres.`;
  return null;
}

function buildEmailHtml(body: ContactBody): string {
  const nombre = escapeHtml(body.nombre.trim());
  const email = escapeHtml(body.email.trim());
  const empresa = body.empresa.trim() ? escapeHtml(body.empresa.trim()) : '';
  const mensaje = escapeHtml(body.mensaje.trim());
  const tipoLabel = TIPO_LABELS[body.tipo];

  return `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <span style="display: inline-block; background: #101012; color: #6fe3c4; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; padding: 4px 10px; border-radius: 999px;">
        ${tipoLabel}
      </span>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; color: #5a5a63; width: 120px;">Nombre</td>
          <td style="padding: 6px 0; color: #1a1a1a;">${nombre}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #5a5a63;">Email</td>
          <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #0a7d5f;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #5a5a63;">Motivo</td>
          <td style="padding: 6px 0; color: #1a1a1a;">${tipoLabel}</td>
        </tr>
        ${empresa ? `
        <tr>
          <td style="padding: 6px 0; color: #5a5a63;">Empresa</td>
          <td style="padding: 6px 0; color: #1a1a1a;">${empresa}</td>
        </tr>` : ''}
      </table>
      <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 8px; white-space: pre-wrap; font-size: 14px; color: #1a1a1a;">${mensaje}</div>
      <p style="margin-top: 24px; font-size: 12px; color: #8a8a93;">
        Este mensaje fue enviado desde el formulario de contacto de tu portafolio. Responde directamente a este email para contactar a ${nombre}.
      </p>
    </div>
  `;
}

export const POST: APIRoute = async ({ request }) => {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return new Response(JSON.stringify({ message: 'El cuerpo de la petición no es JSON válido.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = raw as Partial<ContactBody>;
  const validationError = validate(body);
  if (validationError) {
    return new Response(JSON.stringify({ message: validationError }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const contactBody: ContactBody = {
    nombre: body.nombre!.trim(),
    email: body.email!.trim(),
    tipo: body.tipo!,
    empresa: body.empresa?.trim() ?? '',
    mensaje: body.mensaje!.trim(),
  };

  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_TO_EMAIL;
  const from = import.meta.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';

  if (!apiKey || !to) {
    return new Response(JSON.stringify({ message: 'Error interno del servidor.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: contactBody.email,
      subject: `[Portafolio] ${TIPO_LABELS[contactBody.tipo]} — ${contactBody.nombre}`,
      html: buildEmailHtml(contactBody),
    });

    if (error) {
      return new Response(JSON.stringify({ message: 'No se pudo enviar el mensaje. Intenta de nuevo.' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Mensaje enviado.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ message: 'No se pudo enviar el mensaje. Intenta de nuevo.' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

interface Env {
  ASSETS: Fetcher;
  CONTACT_EMAIL: string;
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
}

interface ContactRequest {
  name: string;
  email: string;
  message: string;
  turnstileToken: string;
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  const json = (body: object, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  let body: ContactRequest;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const { name, email, message, turnstileToken } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return json({ error: "All fields are required" }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Invalid email address" }, 400);
  }

  if (env.TURNSTILE_SECRET_KEY) {
    if (!turnstileToken) {
      return json({ error: "Turnstile verification required" }, 400);
    }

    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: request.headers.get("CF-Connecting-IP") || "",
        }),
      }
    );

    const turnstileResult = await turnstileResponse.json<{ success: boolean }>();
    if (!turnstileResult.success) {
      return json({ error: "Turnstile verification failed" }, 400);
    }
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `kyle.pro Contact Form <contact@kyle.pro>`,
        to: [env.CONTACT_EMAIL],
        reply_to: email,
        subject: `Contact form: ${name.trim()}`,
        text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
      }),
    });

    if (!resendResponse.ok) {
      const error = await resendResponse.text();
      console.error("Resend error:", error);
      return json({ error: `Resend error: ${error}` }, 500);
    }
  } catch (err) {
    console.error("Send error:", err);
    return json({ error: "Failed to send message" }, 500);
  }

  return json({ success: true }, 200);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      if (request.method === "POST") {
        return handleContact(request, env);
      }
      return new Response("Method Not Allowed", { status: 405 });
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

//test
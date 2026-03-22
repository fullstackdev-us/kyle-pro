interface Env {
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

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Parse body
  let body: ContactRequest;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Validate fields
  const { name, email, message, turnstileToken } = body;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return new Response(
      JSON.stringify({ error: "All fields are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(
      JSON.stringify({ error: "Invalid email address" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!turnstileToken) {
    return new Response(
      JSON.stringify({ error: "Turnstile verification required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Verify Turnstile token
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
    return new Response(
      JSON.stringify({ error: "Turnstile verification failed" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Send email via Resend
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
      return new Response(
        JSON.stringify({ error: "Failed to send message" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (err) {
    console.error("Send error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to send message" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};

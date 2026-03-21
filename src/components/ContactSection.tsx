import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSending(true);
    // Simulate send
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <section className="py-16 border-t border-border" id="contact">
      <motion.h2
        className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Get in Touch
      </motion.h2>
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-md space-y-4"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Input
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          maxLength={100}
        />
        <Input
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          maxLength={255}
        />
        <Textarea
          placeholder="Your message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          maxLength={1000}
          rows={5}
        />
        <Button type="submit" disabled={sending}>
          {sending ? "Sending…" : "Send Message"}
        </Button>
      </motion.form>
    </section>
  );
};

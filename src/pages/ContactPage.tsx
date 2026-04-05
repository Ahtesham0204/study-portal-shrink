import { useState } from "react";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }
    setBusy(true);
    try {
      await addDoc(collection(db, "contactMessages"), {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        timestamp: Date.now(),
        status: "new",
      });
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent successfully!");
      setTimeout(() => setSent(false), 5000);
    } catch (e: any) {
      toast.error(e.message || "Failed to send message");
    }
    setBusy(false);
  };

  return (
    <div className="container mx-auto py-8">
      {/* Hero */}
      <div className="gradient-hero rounded-3xl px-6 md:px-10 py-12 mb-10 text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute -top-[50px] -right-[50px] w-[260px] h-[260px] rounded-full bg-accent/10 pointer-events-none" />
        <div className="relative">
          <p className="text-xs font-extrabold text-orange-200 tracking-[1.5px] uppercase mb-4">GET IN TOUCH</p>
          <h1 className="text-[clamp(1.75rem,4vw,2.75rem)] font-black font-heading mb-3">📧 Contact Us</h1>
          <p className="opacity-75 text-base mx-auto max-w-[520px]">Have questions or suggestions? We'd love to hear from you!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Contact info */}
        <div>
          <h2 className="text-2xl font-extrabold font-heading text-foreground mb-6">Get In Touch</h2>
          <div className="flex flex-col gap-6">
            {[
              { icon: "📧", title: "Email", desc: "Send us an email anytime", link: "contact@msbtepapers.com", color: "bg-blue-50 border-blue-100" },
              { icon: "💬", title: "WhatsApp", desc: "Quick support via WhatsApp", link: "+91 98765 43210", color: "bg-green-50 border-green-100" },
              { icon: "📍", title: "Location", desc: "MSBTE Regional Office\nMaharashtra, India", link: "", color: "bg-yellow-50 border-yellow-100" },
            ].map((item) => (
              <div key={item.title} className={`${item.color} border rounded-2xl p-6 shadow-card`}>
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl mb-4 shadow-sm">{item.icon}</div>
                <h3 className="font-bold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-2 whitespace-pre-line">{item.desc}</p>
                {item.link && <span className="text-primary font-bold text-[0.9375rem]">{item.link}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-card rounded-[20px] p-8 shadow-lg border border-secondary">
          <h2 className="text-2xl font-extrabold font-heading text-foreground mb-6">Send a Message</h2>
          {sent && (
            <div className="bg-green-50 border border-green-300 rounded-xl p-4 mb-6 flex gap-3 items-start">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold text-green-800 mb-0.5">Message Sent!</p>
                <p className="text-green-700 text-sm">We'll get back to you soon.</p>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {[
              { label: "Name *", type: "text", key: "name", placeholder: "Your full name" },
              { label: "Email *", type: "email", key: "email", placeholder: "your.email@example.com" },
              { label: "Subject", type: "text", key: "subject", placeholder: "What is this about?" },
            ].map((f) => (
              <div key={f.key} className="mb-4">
                <label className="block font-semibold text-sm text-foreground mb-1">{f.label}</label>
                <input
                  type={f.type}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  className="w-full py-3 px-4 border-2 border-secondary rounded-[10px] text-[0.9375rem] outline-none focus:border-primary transition-colors"
                />
              </div>
            ))}
            <div className="mb-6">
              <label className="block font-semibold text-sm text-foreground mb-1">Message *</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us what you need help with..."
                rows={5}
                className="w-full py-3 px-4 border-2 border-secondary rounded-[10px] text-[0.9375rem] outline-none focus:border-primary transition-colors resize-y"
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="w-full gradient-primary text-primary-foreground border-none py-4 rounded-xl font-extrabold text-base disabled:opacity-60"
            >
              {busy ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

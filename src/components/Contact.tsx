import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isSuccess) {
      timer = setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isSuccess]);

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "eeade02b-9617-4441-b674-3ac7176e80e6",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.status === 200) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitError(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitError("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 border-t border-edge relative overflow-hidden">
      <div className="mx-auto max-w-[900px] w-[90%] relative">
        <Reveal>
          <div className="mb-10 md:mb-12 flex flex-col items-center text-center">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-6 text-center">
              07 — CONTACT
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tighter text-ink mb-6">
              Contact Me
            </h2>
            <p className="max-w-2xl text-lg sm:text-xl leading-relaxed text-muted text-center">
              Have a question or want to get in touch? Fill out the form below and I'll get back to you as soon as possible.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative max-w-[700px] mx-auto">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-[#8b5cf6]/5 via-accent2/5 to-[#8b5cf6]/5 blur-2xl opacity-40 pointer-events-none animate-pan-x" />
            
            <div className="relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name..."
                    className={`w-full bg-surface border ${
                      errors.name ? "border-red-500" : "border-edge2"
                    } rounded-xl px-4 py-3 text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com..."
                    className={`w-full bg-surface border ${
                      errors.email ? "border-red-500" : "border-edge2"
                    } rounded-xl px-4 py-3 text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={6}
                    className={`w-full bg-surface border ${
                      errors.message ? "border-red-500" : "border-edge2"
                    } rounded-xl px-4 py-3 text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-y`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-ink text-bg font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>

              {isSuccess && (
                <div className="mt-4 flex items-center justify-center gap-2 text-green-500 bg-green-500/10 py-3 px-4 rounded-xl border border-green-500/20 stagger-in">
                  <CheckCircle2 size={18} className="shrink-0" />
                  <div className="text-sm">
                    <span className="font-medium mr-1">Message Sent Successfully!</span> 
                    <span className="opacity-80">Thank you for your message. I'll get back to you as soon as possible.</span>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="mt-4 text-red-500 bg-red-500/10 py-3 px-4 rounded-xl border border-red-500/20 text-sm text-center stagger-in">
                  {submitError}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

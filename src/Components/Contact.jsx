import emailjs from "@emailjs/browser";
import { useRef } from "react";

export default function Contact() {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "Zeeshan4242",
        "template_hve8lyj",
        formRef.current,
        "crV77bjM_wk90sUSE"
      )
      .then(() => {
        alert("Message sent successfully!");
        e.target.reset();
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send message");
      });
  };
  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-4 mb-16">
          <h2 className="text-sm uppercase tracking-widest font-bold neon-text">Contact</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold neon-text leading-[1.2] pb-2 z-20">Let's Work Together</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-6 mt-18 md:mt-20">
            <div className="neon-glow p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
              <p className="text-xs text-cyan-300 uppercase tracking-widest font-bold mb-2">Email</p>
              <a href="mailto:you@example.com" className="text-2xl font-bold text-white hover:text-cyan-400 transition">
                mzeesh2012@gmail.com
              </a>
            </div>

            <div className="neon-glow p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
              <p className="text-xs text-cyan-300 uppercase tracking-widest font-bold mb-4">Connect</p>
              <div className="flex flex-wrap gap-3">
                <a href="https://github.com/Zeeshan-Momin" target="_blank" className="px-4 py-2 rounded-full border border-cyan-400/50 text-cyan-300 font-medium hover:bg-cyan-500/10 transition">
                  GitHub
                </a> 
                <a href="https://linkedin.com/in/zeeshan-momin-1a9085321" target="_blank" className="px-4 py-2 rounded-full border border-cyan-400/50 text-cyan-300 font-medium hover:bg-cyan-500/10 transition"> 
                  LinkedIn 
                </a>
                <a href="https://wa.me/7020761254" target="_blank" className="px-4 py-2 rounded-full border border-cyan-400/50 text-cyan-300 font-medium hover:bg-cyan-500/10 transition">
                  WhatsApp
                </a> 
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"                     // ✅ REQUIRED
              placeholder="Your name"
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"                   // ✅ REQUIRED
              placeholder="your@email.com"
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              name="message"                 // ✅ REQUIRED
              placeholder="Tell me about your project..."
              rows={5}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition resize-none"
            />
          </div>
            <button
              type="submit"
              className="neon-btn w-full px-6 py-3 rounded-lg font-semibold text-center">
                Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

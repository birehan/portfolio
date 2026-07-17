import {
  Mail,
  Github,
  Linkedin,
  Calendar,
  BookOpen,
  Download,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { site, getWhatsAppHref } from "@/lib/site";

export function Contact() {
  const hasBooking = Boolean(site.bookingUrl);
  return (
    <section
      id="contact"
      className="section bg-[var(--surface)] border-t border-[var(--border)]"
    >
      <div className="container-x">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow justify-center">07: Contact</p>
          <h2 className="h2">
            Hiring or have a project? <span className="text-[var(--accent)]">Let&apos;s talk.</span>
          </h2>
          <p className="lead mx-auto mt-4 mb-8">
            Email or WhatsApp both work. I reply within a business day; WhatsApp is
            fine for a quick ping.
          </p>

          <Badge variant="accent" className="mb-8 px-4 py-2 text-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            </span>
            {site.availability.text}
          </Badge>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <a
              href={`mailto:${site.email}?subject=Role%20or%20project%20inquiry%20from%20your%20portfolio`}
            >
              <Button size="lg" className="w-full sm:w-auto">
                <Mail className="h-4 w-4" />
                {site.email}
              </Button>
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <Download className="h-4 w-4" />
                Download resume
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <ContactCard
              icon={<Linkedin className="h-4 w-4" />}
              label="LinkedIn"
              value="/in/birehan"
              href={site.social.linkedin}
              me
            />
            <ContactCard
              icon={<Github className="h-4 w-4" />}
              label="GitHub"
              value="@birehan"
              href={site.social.github}
              me
            />
            <ContactCard
              icon={<BookOpen className="h-4 w-4" />}
              label="Writing"
              value="Medium (@birehan)"
              href={site.social.medium}
              me
            />
            <ContactCard
              icon={<MessageCircle className="h-4 w-4" />}
              label="WhatsApp"
              value={site.whatsapp}
              href={getWhatsAppHref()}
            />
            <ContactCard
              icon={<Calendar className="h-4 w-4" />}
              label={hasBooking ? "Book a call" : "Schedule"}
              value={hasBooking ? "30-min intro call" : "Email to schedule"}
              href={hasBooking ? site.bookingUrl : undefined}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  me,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  me?: boolean;
}) {
  const inner = (
    <div className="rounded-md border border-[var(--border)] bg-[var(--bg)] p-4 hover:border-[var(--accent)] transition-colors h-full">
      <div className="flex items-center gap-2 text-[var(--accent)] mb-2">
        {icon}
        <span className="font-mono text-xs uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm font-medium truncate">{value}</p>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel={me ? "me noopener" : "noopener"} className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}

import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/content/site";

// Floating WhatsApp button, present on every page (bottom-right).
export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous contacter sur WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-kinesis-green text-white shadow-md transition-transform hover:scale-105 hover:bg-[#34902c]"
    >
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  );
}

import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#2A1B0A] text-[#D4AF37] border-t-2 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">The Three Broomsticks</h3>
            <p className="mb-2">Titan Plaza Avenida Boyacá 80 - 94</p>
            <p>Teléfono: 3203810987</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FFF700] transition-colors"
              >
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FFF700] transition-colors"
              >
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FFF700] transition-colors"
              >
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[#D4AF37] text-center">
          <p>&copy; {new Date().getFullYear()} The Three Broomsticks. Todos los derechos reservados.</p>
          <p className="mt-2 text-sm">Magia proporcionada por Madame Rosmerta</p>
        </div>
      </div>
    </footer>
  )
}


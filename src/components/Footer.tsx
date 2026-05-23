import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className="w-full bg-[#03100a] border-t border-[#15462E] py-4 px-6 mt-auto shrink-0 flex flex-col md:flex-row items-center justify-between gap-4 select-none">
      <div className="text-white/40 text-[10px] font-medium text-center md:text-left">
        &copy; {new Date().getFullYear()} <strong className="text-white/60 font-bold">GinialTech</strong>. Todos los derechos reservados.
      </div>

      <div className="flex items-center gap-4 text-[10px]">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="text-white/40 hover:text-white/70 transition-colors underline decoration-white/20 underline-offset-2 font-medium"
        >
          Términos y Privacidad
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#051810] border-2 border-[#15462E] rounded-xl shadow-2xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-4 text-white/50 hover:text-white transition-colors text-2xl leading-none"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide border-b border-[#15462E] pb-2">
              Términos y Privacidad
            </h3>
            <div className="space-y-3 text-sm text-white/70">
              <p>
                <strong>1. Privacidad:</strong> Esta herramienta funciona de forma local en tu navegador. 
                No guardamos, rastreamos ni enviamos ningún tipo de dato personal, imágenes o configuraciones a ningún servidor.
              </p>
              <p>
                <strong>2. Uso Gratuito:</strong> El software se provee "tal cual es" (as is), de manera libre y gratuita para la comunidad.
              </p>
              <p>
                <strong>3. Limitación de Responsabilidad:</strong> GinialTech no se responsabiliza por errores tipográficos, de diseño, problemas de exportación o costos asociados a errores de impresión derivados del uso de este generador. Recomendamos revisar siempre el PDF antes de mandarlo a imprimir.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-[#1b8555] hover:bg-[#239f67] text-white font-bold py-2 px-4 rounded transition-all mt-6"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

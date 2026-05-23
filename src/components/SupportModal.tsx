import React, { useState } from 'react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formsubmit.co/ajax/ginialtech@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#051810] border-2 border-[#15462E] rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#15462E] sticky top-0 bg-[#051810] z-10">
          <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">
            ☕ Apoyar Creador & Sugerencias
          </h2>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors p-2 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          
          {/* Column 1: Cafecito */}
          <div className="flex flex-col bg-[#072418] border border-[#15462E] rounded-lg p-5 shadow-lg">
            <h3 className="text-lg font-bold text-[#ffd700] mb-3 text-center uppercase tracking-wide">
              ¡Invitame un Cafecito!
            </h3>
            <div className="flex-grow flex flex-col items-center justify-center space-y-4">
              <p className="text-white/80 text-sm text-center">
                Por solo <strong className="text-white font-extrabold">$1.000 ARS</strong>, me ayudás un montón a seguir creando y manteniendo estos proyectos gratuitos para la comunidad.
              </p>
              <a
                href="https://cafecito.app/ginialtech" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#ffd700] hover:bg-[#ffe55c] active:bg-[#e6c200] text-black font-extrabold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-lg select-none transition-all uppercase tracking-wider text-sm mt-4"
              >
                ☕ Donar $1000
              </a>
            </div>
          </div>

          {/* Column 2: Feedback Form */}
          <div className="flex flex-col bg-[#072418] border border-[#15462E] rounded-lg p-5 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-3 text-center uppercase tracking-wide">
              🐛 Sugerencias y Reportes
            </h3>
            <form 
              onSubmit={handleSubmit}
              className="flex-grow flex flex-col space-y-3 relative"
            >
              {/* Config fields for FormSubmit */}
              <input type="hidden" name="_subject" value="Nuevo Reporte / Sugerencia (Fixture)" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              
              <input 
                type="email" 
                name="email" 
                placeholder="Tu correo electrónico" 
                required 
                className="w-full bg-black/30 border border-[#15462E] text-white p-2 rounded focus:outline-none focus:border-[#239f67] text-sm"
              />
              <textarea 
                name="mensaje" 
                placeholder="Encontré un error, tengo una idea para mejorar este proyecto..." 
                required 
                rows={4}
                className="w-full bg-black/30 border border-[#15462E] text-white p-2 rounded focus:outline-none focus:border-[#239f67] text-sm flex-grow resize-none"
              ></textarea>
              <button 
                type="submit"
                disabled={submitStatus === 'loading'}
                className="w-full bg-[#1b8555] hover:bg-[#239f67] disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-all mt-auto"
              >
                {submitStatus === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>

          {/* Column 3: New Project Form */}
          <div className="flex flex-col bg-[#072418] border border-[#15462E] rounded-lg p-5 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-3 text-center uppercase tracking-wide">
              💡 ¿Querés un Proyecto Nuevo?
            </h3>
            <form 
              onSubmit={handleSubmit}
              className="flex-grow flex flex-col space-y-3 relative"
            >
              {/* Config fields for FormSubmit */}
              <input type="hidden" name="_subject" value="Idea para Proyecto Nuevo" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              
              <input 
                type="email" 
                name="email" 
                placeholder="Tu correo electrónico" 
                required 
                className="w-full bg-black/30 border border-[#15462E] text-white p-2 rounded focus:outline-none focus:border-[#239f67] text-sm"
              />
              <textarea 
                name="idea" 
                placeholder="Me gustaría que armen un proyecto que sirva para..." 
                required 
                rows={4}
                className="w-full bg-black/30 border border-[#15462E] text-white p-2 rounded focus:outline-none focus:border-[#239f67] text-sm flex-grow resize-none"
              ></textarea>
              <button 
                type="submit"
                disabled={submitStatus === 'loading'}
                className="w-full bg-[#1b8555] hover:bg-[#239f67] disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-all mt-auto"
              >
                {submitStatus === 'loading' ? 'Enviando...' : 'Enviar Idea'}
              </button>
            </form>
          </div>

        </div>

        {/* Global Toast Message within the Modal */}
        {submitStatus === 'success' && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#1b8555] text-white px-6 py-3 rounded-lg shadow-2xl font-bold flex items-center gap-2 animate-fade-in z-50">
            <span>✅</span> ¡Mensaje enviado con éxito! Gracias por escribir.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-2xl font-bold flex items-center gap-2 animate-fade-in z-50">
            <span>❌</span> Hubo un error al enviar el mensaje. Inténtalo de nuevo.
          </div>
        )}

      </div>
    </div>
  );
};

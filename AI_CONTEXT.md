# Contexto para Asistentes de IA (AI_CONTEXT)

Este archivo contiene las preferencias y reglas generales para interactuar con este proyecto y con la usuaria.

## Preferencias Generales
- **Idioma:** Español (Argentina).
- **Trato:** Mi nombre es Marcela, pero prefiero que me digas **Marce**.

## Entorno Técnico
- **Terminal:** Usar `git bash` para la ejecución de comandos.
- **Package Manager:** Usar EXCLUSIVAMENTE `bun` (nunca npm, npx, pnpm ni yarn).

## Reglas de Desarrollo
- **Planificación:** Planificar ANTES de escribir código. Proponer arquitectura y esperar aprobación.
- **TypeScript:** Modo estricto (`strict`). Sin `any`, sin `@ts-ignore` innecesarios.
- **Idioma en el Código:**
  - UI/textos al usuario siempre en español (Argentina).
  - Código (variables, funciones, comentarios técnicos) en inglés.
- **Control de Versiones:** No hacer push a GitHub sin consentimiento explícito.
- **Criterio de "Terminado":** Nada se considera terminado sin build exitoso y TypeScript sin errores.
- **Verificación Obligatoria:** Se DEBE correr siempre `tsc` y el `build` de forma autónoma antes de confirmarle a la usuaria que una tarea está lista.

## Diseño y Pre-Prensa (Reglas de Oro)
- **Mindset de Impresión:** Este proyecto NO es para web. Es para imprimir físicamente en impresoras Ecotank, guillotinar y anillar.
- **Márgenes Físicos:** Siempre considerar un margen de seguridad (Safe Zone) de 4mm a 5mm para evitar que los textos sean cortados por la guillotina o la redondeadora de puntas.
- **Micro-Tipografía:** No usar clases web estándar como `text-xs`. Para que la información entre en las tarjetas físicas (ej. 70x100mm), usar siempre micro-tamaños personalizados en Tailwind (Ej: `text-[4px]`, `text-[5.5px]`).
- **Cajas de Escritura:** Los espacios para anotar resultados deben ser rectángulos con fondo blanco puro y una altura mínima de 14px a 18px para que el usuario pueda escribir a mano cómodamente.
- **Prohibido el Glassmorphism:** Cero desenfoques (`backdrop-blur`) o transparencias raras que arruinen los colores CMYK al imprimir. Usar fondos limpios.

## Exportación y Rendimiento
- **Compresión Extrema:** Los PDFs no deben pesar 150MB. Siempre usar `toJpeg` de `html-to-image` (quality 0.85) en lugar de PNGs pesados, y usar el parámetro 'FAST' de compresión en jsPDF.
- **Independencia de Proyecto:** Este proyecto se llama 'Fixture'. Ignorar cualquier regla cruzada o MCP que pertenezca a 'Ginialym'. Las reglas aquí son más flexibles en el CSS.

*(Se agregarán más reglas y preferencias a medida que surjan)*

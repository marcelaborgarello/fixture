# Plan de Implementación (Actualizado)

**ZINE Y PLEGABLES VIEJOS CANCELADOS Y ELIMINADOS DEFINITIVAMENTE.**

## 1. Limpieza de Código (Se eliminará todo rastro)
- **Eliminar componentes:** `LibritoZineA4.tsx`, `PlayoffHalf1Card.tsx`, `PlayoffHalf2Card.tsx`, `PlayoffHalf3Card.tsx`.
- **Limpiar `App.tsx` y `Sidebar.tsx`:** Remover los modos "Zine" y "Plegable", dejando exclusivamente:
  1. Tarjetas Individuales (`cards`)
  2. Folleto Flyer A4 Horizontal (`flyer`)
  3. Póster A4 Vertical (`poster`)
- **Sincronización:** Asegurar que colores, tipografías y logos del Sidebar se apliquen en tiempo real a los 3 formatos.

## 2. FORMATO 1: Tarjetas Individuales
- Mantener la exportación a PDF (8 por hoja) sin cambios.
- **Nuevo:** Botón "Descargar ZIP (Imágenes)". Exporta las 8 tarjetas por separado en formato PNG alta calidad para usarse en Canva.

## 3. FORMATO 2: Folleto Flyer (Media Hoja A4 Horizontal)
- **Medidas:** 297x105 mm (la mitad de una A4).
- **Layout de 2 caras (Doble faz):**
  - **Frente (4 paneles):** Portada, Finales/3er puesto, Semis, Cuartos, Octavos.
  - **Dorso (4 paneles):** Toda la Fase de Grupos.
- **Arreglo visual:** Implementar la misma lógica `flex` y cajas blancas de las Tarjetas para evitar que las cajas de equipos/resultados se corten.
- **Impresión Imprenta:** Botón "Pliego Flyer A4". Exportará un PDF de 2 páginas A4:
  - Pág 1: Dos Frentes apilados.
  - Pág 2: Dos Dorsos espejados (alineados para impresión doble faz).

## 4. FORMATO 3: Póster A4
- **Layout renovado:**
  - Mitad Superior: Los 12 grupos.
  - Mitad Inferior: Todo el cuadro de Fase Final (Dieciseisavos a Final).

---

> [!IMPORTANT]
> **ESTADO ACTUAL: ESPERANDO TU LUZ VERDE PARA PURGAR EL CÓDIGO**
> La confusión anterior fue porque yo actualizaba un archivo interno oculto y tu editor (VS Code) seguía mostrándote este archivo desactualizado con el "sprint 2". 
> Si este plan que estás leyendo en tu editor refleja EXACTAMENTE lo que quieres, por favor dame un simple "OK" y procedo a ejecutar el código para borrar los Zines.

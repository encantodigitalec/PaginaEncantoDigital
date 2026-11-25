# Plan de mejoras UX/UI — Landing Encanto Digital

**Sitio:** https://encantodigitalec.github.io/landingEncanto/  
**Destino:** Codex en VS Code  
**Estado:** Plan aprobado para implementación controlada.  
**Objetivo:** Convertir la landing en un catálogo visual atractivo, rápido e intuitivo, que permita descubrir y abrir demos de invitaciones para distintos eventos.

## Reglas de ejecución

1. Antes de modificar, inspeccionar el HTML, CSS, JavaScript, assets y enlaces existentes. No asumir nombres de archivos, selectores ni componentes.
2. Conservar arquitectura actual, funcionalidades, enlaces de demos, filtros, fichas independientes, navegación y contenido comercial vigente, salvo los cambios explícitos de este plan.
3. Trabajar por fases y verificar en desktop y móvil al terminar cada fase. Evitar dependencias pesadas.
4. No inventar capturas reales, imágenes finales, precios, categorías disponibles ni contenido de invitaciones. Si faltan assets, preparar la estructura y solicitar el recurso correspondiente.
5. Respetar accesibilidad, rendimiento, preferencias de movimiento reducido y GitHub Pages (rutas relativas correctas).
6. Antes de ejecutar, presentar lista de archivos que se modificarán y un resumen de cambios propuestos. No hacer cambios ajenos al alcance.

## Fase 1 — Header premium y jerarquía de contenido

**Meta:** Que el usuario encuentre el catálogo inmediatamente, sin un hero introductorio redundante.

- Usar como color de fondo del header **exactamente el color actualmente aplicado al botón activo «Todas»**. Identificarlo en el CSS, reutilizar una variable compartida y comprobar contraste de texto, logo e íconos.
- Conservar logo Encanto Digital con presencia visual equilibrada. Si el logo original no contrasta, utilizar variante adecuada o tratamiento de contraste, sin deformarlo.
- Mantener navegación esencial y funcional; evitar agregar elementos de menú innecesarios. En móvil, navegación compacta y accesible.
- Eliminar el bloque de presentación compuesto por «ENCANTO DIGITAL», «Invitaciones digitales para momentos especiales.» y «Explora nuestros diseños y encuentra el ideal para tu celebración.»; retirar también el espacio vacío que deja.
- Situar catálogo inmediatamente después del header. Puede conservarse un título corto de sección como «Nuestro catálogo», sin recrear el hero eliminado.
- Header sobrio pero con personalidad, sin blanco apagado como fondo principal; no usar sombras intensas ni efectos que resten protagonismo a las portadas.

**Aceptación:** Al abrir en móvil, se ve rápidamente el inicio del catálogo; header con el color correcto y navegación legible.

## Fase 2 — Catálogo visual responsive con tarjetas cuadradas

**Meta:** Mostrar varias opciones en una sola vista y facilitar la exploración por evento.

- Sustituir la presentación excesivamente vertical por un grid de tarjetas con **portada 1:1**; aplicar `aspect-ratio: 1 / 1`, sin estirar imágenes.
- Recomendación responsive: desktop 3–4 columnas según ancho real; tablet 2–3; móvil 2 cuando el ancho y la legibilidad lo permitan, o 1 en pantallas estrechas. Usar grid flexible y breakpoints probados, no columnas fijas a cualquier costo.
- Esquinas redondeadas moderadas (referencia 12–16 px), separación uniforme, texto corto y legible.
- Toda la tarjeta debe poder abrir la **ficha de detalle independiente** correspondiente, no únicamente un botón; conservar rutas y enlaces reales.
- Mantener filtros por tipo de evento y opción «Todas», incluyendo estados activos claros. Preparar la estructura para bodas, quinceañeras, cumpleaños, baby shower y nuevas categorías, **sin publicar categorías vacías ni demos inexistentes**.
- Cada tarjeta podrá mostrar nombre, etiqueta corta de estilo («Romántica», «Elegante», etc., solo si corresponde) y llamada a la acción «Descubrir invitación» o «Ver invitación».
- Implementar foco visible con teclado, estados hover y touch comprensibles, semántica de enlaces y tamaños táctiles adecuados.

**Aceptación:** Portadas uniformes; varias opciones visibles; filtros y navegación siguen funcionando; sin recortes indeseados.

## Fase 3 — Portadas Premium Mockup (principal atractivo)

**Meta:** Crear imágenes que despierten curiosidad y comuniquen la experiencia real del producto.

**Dirección artística:** Premium Editorial + mockup de smartphone en perspectiva 3D, no minimalismo plano.

- Cada portada será una **composición cuadrada 1:1 diseñada específicamente para catálogo**, no una captura vertical comprimida.
- Smartphone protagonista, ligeramente inclinado, ocupando aproximadamente **65–70 % del encuadre** como punto de partida ajustable según composición.
- Dentro de la pantalla: **captura auténtica del demo real** de esa invitación; no sustituir por una invitación ficticia.
- Agregar una segunda vista parcial o capa posterior de otra sección real del mismo demo, si mejora la composición sin saturarla.
- Fondo y ornamentos coherentes con el evento: bodas románticas con elementos florales, texturas y luz cálida; otros eventos con identidad propia. Mantener calidad y coherencia visual entre categorías.
- Sombras realistas, profundidad y contraste suficientes para reconocer la pantalla en tamaños pequeños. No saturar con textos decorativos ni elementos que oculten el celular.
- La portada debe sugerir la experiencia, **no mostrar toda la invitación**. Evitar letras diminutas dentro de la pantalla que aparenten ser legibles.
- Preferir assets exportados en WebP/AVIF con fallback si procede; generar tamaños adecuados y `srcset` cuando convenga. Definir nombres consistentes y texto alternativo útil.
- Si no existen las capturas o portadas finales, **no generarlas ficticiamente en código**: dejar mapeo de assets y especificación de captura/composición para posterior producción y aprobación.

**Aceptación:** Portada atractiva incluso como miniatura, celular claramente identificable, demo real y formato consistente.

## Fase 4 — Sección «EN TRES PASOS / Así funciona»

- Conservar el sentido del flujo comercial existente; revisar los textos actuales antes de cambiarlos.
- Presentar tres pasos con numeración 01–03, íconos coherentes y **flechas que conecten visualmente la secuencia**.
- Desktop: secuencia horizontal con flechas entre pasos. Móvil: secuencia vertical con flechas hacia abajo, sin desbordamiento.
- Usar líneas/flechas discretas pero perceptibles, con contraste adecuado.
- Opcional: animación breve y sutil de aparición o progreso; desactivarla con `prefers-reduced-motion`.
- Mantener la sección después del catálogo para no retrasar la exploración de demos.

**Aceptación:** El orden se comprende sin esfuerzo en escritorio y celular.

## Fase 5 — Botón de WhatsApp

- Fondo verde oficial **`#25D366`**; ícono y texto blancos.
- Hover verde más oscuro **`#1DA851`**; comprobar contraste de texto (ajustar tono si fuera necesario para accesibilidad).
- Conservar destino, mensaje predefinido y comportamiento actuales.
- Bordes redondeados, foco visible y tamaño táctil cómodo. Evitar que tape el contenido del catálogo o botones en móvil.

**Aceptación:** Botón reconocible y funcional en desktop/móvil, sin cambios al enlace existente.

## Fase 6 — Microinteracciones y acabado

- Hover de tarjeta: elevación ligera, sombra suave y zoom muy moderado de portada.
- Transiciones cortas y coherentes al cambiar filtros, sin saltos de layout.
- En móvil, no depender de hover para revelar la acción; la tarjeta debe ser claramente tocable.
- Respetar `prefers-reduced-motion`; evitar animaciones pesadas o efectos que ralenticen el scroll.
- Conservar identidad visual neutra en el contenido, para que el header y las portadas sean los puntos de interés.

## Fase 7 — Rendimiento, accesibilidad y QA

- Optimizar peso de portadas, dimensiones declaradas para evitar CLS y carga diferida de imágenes fuera de la primera vista; priorizar imágenes visibles inicialmente.
- Verificar legibilidad, contraste, navegación con teclado, foco, alt, enlaces, botones y filtros.
- Probar al menos anchos aproximados de **320, 375, 390, 768, 1024 y 1440 px**.
- Comprobar Safari iPhone, Chrome Android y navegadores desktop en la medida posible.
- Revisar que las rutas de assets funcionen en la subruta de GitHub Pages `/landingEncanto/`.
- Confirmar que los demos, fichas individuales, contacto y filtros funcionan como antes.
- No incorporar librerías nuevas salvo necesidad justificada.

## Orden final de la landing

1. Header premium con color del botón «Todas».
2. Catálogo de invitaciones con portadas Premium Mockup y filtros.
3. «Así funciona» con tres pasos y flechas.
4. Contacto / llamada a la acción de WhatsApp.

Conservar otros bloques imprescindibles del sitio si existen y tienen propósito claro; no eliminarlos sin revisión.

## Entregables esperados de Codex

- Código modificado por fases, manteniendo la arquitectura actual.
- Relación de archivos alterados y explicación breve de cada cambio.
- Lista de assets reales necesarios para portadas, si faltan.
- Evidencia de verificación responsive y funcional.
- Lista de asuntos pendientes antes de publicar.

## Criterio global de éxito

En pocos segundos el visitante debe identificar que está ante un catálogo de invitaciones digitales, ver varias opciones atractivas, distinguir estilos/eventos y abrir intuitivamente el demo que le interese. El diseño debe sentirse premium y expresivo sin sacrificar velocidad, claridad o facilidad de uso.

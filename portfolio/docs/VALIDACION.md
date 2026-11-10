# Prueba glitch, Spotify y navegación — 10 de noviembre de 2026

- TypeScript y producción correctos. Catorce pruebas sobre contenido, traducciones, PDF, gráficos, límites del carrusel, atribución de imágenes y carga opcional de Spotify.
- Navegador: modos claro/oscuro y ES/EN; 320, 768 y 1280 px sin desbordes horizontales. Panel de Spotify sin desborde a 320 px.
- Playlist Night visions cargada desde el enlace proporcionado. Sin iframe antes de abrir Música. Probados reproducción de muestra, minimización conservando el mismo iframe, indicador real y pausa desde el dock. La reproducción completa depende de Spotify y la sesión del visitante.
- Carrusel: tres tarjetas, flechas y extremos desactivados, desplazamiento con teclado y detalle de ambas imágenes con crédito/licencia; Escape cierra y devuelve el foco. Imágenes provisionales diferenciadas del único proyecto real.
- Dock: aparición al dejar atrás la cabecera, indicador por sección y adaptación a dos filas en móvil; área segura y espacio inferior reservados.
- Escultura: giro inicial, cambio de forma con interferencia, arrastre real con mouse que pausa, reanudación y reinicio. El dibujo se suspende fuera de pantalla y con la pestaña oculta.
- Glitch limitado a interacciones; sin destellos de pantalla completa. Revisión de las condiciones de movimiento reducido en CSS y código, sin cambiar las preferencias del sistema.
- Consola sin errores de la aplicación durante la revisión. Interacción táctil implementada con eventos de puntero y desplazamiento nativo; pendiente probar en un teléfono físico.
- No se añadieron dependencias. Bundle JS comprimido aproximado: 84,83 kB, frente a 81,08 kB de la versión anterior. Esta medida es tamaño de descarga, no porcentaje de CPU ni de cupo de Codex. Fotos: unos 249 kB en total; carga diferida y caché del navegador para las copias visuales del glitch.

## Validación histórica de la base

# Validación de Portfolio V3 y evolución de gráficos

## Gráficos interactivos — noviembre 2026

- TypeScript y compilación de producción completados; nueve pruebas aprobadas.
- Las pruebas comprueban traducciones, contenido, anclas, contactos, PDF, sombras, límites del giro, geometría 3D finita y encuadre de todos los patrones en los extremos de ambos controles.
- Navegador: Nudo, Anillo y Flor visibles; arrastre real con mouse, giro con flechas, reinicio, animación activable y pausa al iniciar el giro manual. La orientación se conserva al cambiar la forma y el tema.
- Laboratorio: Roseta, Órbitas y Moiré; controles de densidad y deformación con teclado, Variar y Restablecer. Densidad 72 produce 144 trazas; Restablecer vuelve a Roseta / 24 / 48.
- Revisión de ES/EN y claro/oscuro a anchos efectivos de 320, 768 y 1280 px. Sin desborde horizontal en las comprobaciones del documento. Botones y deslizadores con 44 px de alto mínimo.
- Consola de navegador sin errores durante las pruebas.
- Contraste claro, sobre colores sólidos: texto 14,69:1; secundario sobre superficie 5,32:1; coral de texto 5,48:1; violeta sobre superficie 6,55:1; texto del botón coral 9,89:1.
- Contraste oscuro: texto 17,34:1; secundario sobre superficie 7,98:1; violeta sobre superficie 6,98:1; lima sobre superficie 15,77:1. Las líneas de los gráficos son decorativas y usan profundidad por opacidad.
- Movimiento reducido: revisado en código; bloquea la animación automática y conserva el giro manual directo. No se cambiaron preferencias del sistema del usuario.
- Interacción táctil implementada con Pointer Events y captura del puntero; requiere una prueba final en un teléfono físico. El gesto se captura dentro del gráfico y la página se desplaza desde el exterior.
- Fondo de retícula CSS estático, sin otro bucle de animación. Los eventos, captura, observadores y cuadros pendientes se limpian al desmontar o cambiar los gráficos.

## Base V3 previamente revisada

Se conservan el PDF y los flujos de contacto y proyecto. En la validación de la base se comprobaron navegación por anclas; persistencia de preferencias; apertura del detalle, foco inicial, Escape y retorno de foco; copia del correo con confirmación; descarga real del CV y revisión visual de sus dos páginas.

El PDF público conserva 85.760 bytes y SHA-256 `aa07821099ba8e89d3be1e6aa8edd52ca7f18f92230f97c03c4f9d760c9b4115`. La interfaz inglesa indica que el documento está en español. Los contactos de referencias fueron reemplazados por “Referencias disponibles a solicitud”.

La rama v2-base y los ZIP anteriores se conservan. No se incorporaron proyectos ficticios ni el escritorio interactivo pospuesto.

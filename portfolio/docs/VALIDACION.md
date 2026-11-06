# Validación de Portfolio V3

- `pnpm run check`: TypeScript sin errores.
- `pnpm run test`: seis pruebas aprobadas, sobre traducciones, registro extensible, proyectos, destinos de contacto y presencia del PDF, sombras y geometría.
- `pnpm run build`: compilación estática completada. Fuentes locales incluidas.
- Navegador: ES/EN y claro/oscuro; persistencia tras recargar; navegación por anclas; gráficos visibles; animación activable y pausable; densidad 43 produce 86 trazas SVG.
- Detalle de proyecto: apertura, foco inicial, cierre con Escape y retorno del foco a la tarjeta.
- Contacto: enlaces reales y copia del correo con confirmación visible.
- Diseño: revisado a 320, 768 y 1280 px; sin desbordes horizontales. Ajustado el correo para evitar una letra aislada a 320 px.
- Contraste claro, calculado con los colores efectivos: texto 15.94:1; secundario sobre superficie 5.84:1; violeta 7.21:1; verde de texto 7.00:1; botón lima 16.11:1.
- Contraste oscuro: texto 17.34:1; secundario sobre superficie 7.98:1; violeta 7.51:1; lima 16.97:1.
- Sombra probada con movimiento real del puntero: desplazamientos observados dentro de ±4 px. Sin transición con arrastre; actualización mediante requestAnimationFrame.
- Movimiento reducido y puntero táctil: condiciones de desactivación revisadas en CSS y hooks; no se alteraron preferencias del sistema del usuario para emularlas.
- Consola del navegador: sin errores de ejecución durante la revisión.
- Descarga real del CV desde la web local: dos páginas, 85.760 bytes, hash idéntico al PDF público revisado. SHA-256: `aa07821099ba8e89d3be1e6aa8edd52ca7f18f92230f97c03c4f9d760c9b4115`.
- El PDF público se revisó visualmente en sus dos páginas y se verificó la eliminación real de los contactos de referencias.

El CV está en español; la interfaz inglesa lo indica. No se incorporan proyectos ficticios ni un nuevo escritorio interactivo.

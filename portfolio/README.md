# Mauro Radesca — Portfolio V3

Portfolio de desarrollo e IT con React, TypeScript y Vite. La marca personal es Mauro Radesca; ebisu queda reservado como nombre del dominio. La rama v2-base conserva el prototipo anterior y su respaldo ZIP.

## Desarrollo local

Requisitos: Node.js 24 o posterior y pnpm 11.25.0. Desde esta carpeta:

```sh
pnpm install --frozen-lockfile
pnpm run dev
```

Abrir la dirección local indicada por Vite. Esta versión requiere un servidor local: no se inicia haciendo doble clic en el HTML.

```sh
pnpm run check    # TypeScript
pnpm run test     # Contratos de contenido y gráficos
pnpm run build    # Comprobar tipos y compilar a dist/
pnpm run preview  # Revisar producción
```

La configuración de pnpm copia dependencias y mantiene un almacén local ignorado por Git para permitir su uso en Windows sin enlaces simbólicos. Las versiones se conservan en el lockfile. Usar `pnpm run check`, no el comando interno `pnpm check`.

## Organización

- `src/app/`: composición, preferencias y registro de secciones.
- `src/sections/`: Home, About, Projects, Lab y Contact, cada uno con su CSS Module.
- `src/components/`: interfaz compartida y escultura.
- `src/content/`: perfil, contactos, textos ES/EN, proyectos y tipos.
- `src/hooks/`: navegación, medios y sombras.
- `src/graphics/`: Canvas y geometría SVG.
- `src/styles/`: variables del sistema visual y estilos globales.
- `src/tests/`: contratos de contenido y límites de los gráficos.
- `public/`: favicon, CV público y futuras portadas de proyectos.

El registro controla el contenido y el menú. No hay textos con HTML incrustado ni manipulación del contenido de React mediante el DOM. Los gráficos dibujan en Canvas, y sus eventos se limpian al desmontarse.

**Guía práctica:** [Cómo editar y ampliar el portfolio](docs/EDICION.md).

## Funcionalidades

Inicio con nombre protagonista y firma; temas claro/oscuro; ES/EN; preferencias persistentes compatibles con V2; contacto y copia con alternativa manual; CV local reutilizado desde cabecera, inicio y contacto; detalle de proyectos accesible; escultura Canvas con tres formas y giro por arrastre o teclado; laboratorio SVG con Roseta, Órbitas y Moiré, densidad y deformación; retícula de fondo estática; paleta coral/violeta en claro y lima/violeta en oscuro; sombras de hasta 4 px sin inercia artificial. Fuentes alojadas junto al sitio. Los gráficos, fuentes y CV son locales. Spotify es una integración externa opcional que se carga al abrir Música.

Se mantienen las anclas #inicio, #sobre-mi, #proyectos, #laboratorio y #contacto. El escritorio interactivo alternativo queda para otra etapa. El único proyecto es el propio portfolio, identificado en desarrollo.

## CV público

Dos páginas en español, a partir del CV General IT v1. Conserva antecedentes y fechas, actualiza LinkedIn y sustituye los contactos de referencias por “Referencias disponibles a solicitud”. Se retiró la duración aproximada del perfil y se conservaron las fechas exactas de Sabre. La fuente privada no se incluye en el repositorio. La interfaz inglesa indica que el PDF está en español.

## Validación y publicación

Comprobar tipos, pruebas y compilación; revisar ambos temas e idiomas a 320 px, tableta y escritorio. Probar navegación, foco, Escape, contacto, PDF y gráficos. El resultado dist/ se sirve por HTTP en Sites u otro alojamiento estático. No hay servidor, base de datos ni autenticación propia.

Conservar v2-base; trabajar en ramas y revisar los cambios antes de integrarlos en main. node_modules/, .sites-runtime/ y dist/ son generados e ignorados por Git.

## Prueba de navegación y movimiento

La rama feat/portfolio-glitch añade Bienvenido/Welcome, un dock inferior que aparece al salir de la cabecera, giro 3D inicial y un carrusel con cortes por franjas y desfasajes de color. Las seis tarjetas de electrónica son guías educativas basadas en tutoriales reales, no proyectos construidos por Mauro. Cada detalle incluye materiales, conexiones, programación, pasos y fuentes.

Spotify usa la playlist configurada en src/content/music.ts. No inicia audio automáticamente; minimizar conserva la reproducción. La cápsula flotante de música permite pausarla y alternar entre reproductor compacto y playlist. La reproducción completa o las muestras dependen de Spotify, su disponibilidad y la sesión del visitante.

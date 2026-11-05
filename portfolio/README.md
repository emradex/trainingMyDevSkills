# Mauro Radesca — Portfolio

Portfolio personal de desarrollo y exploración creativa. La marca visible es **Mauro Radesca**; **ebisu** es el nombre previsto para el dominio.

## Versión base V2

La referencia `v2-base` conserva el prototipo original de esta etapa: negro profundo, lima ácido y violeta eléctrico, con tipografía editorial e interacciones generativas. Los cambios futuros pueden desarrollarse en ramas y revisarse antes de incorporarlos a `main`.

El ZIP original `mauro-radesca-v2.zip` se conserva como respaldo independiente fuera de este repositorio. No es necesario modificarlo para seguir desarrollando.

## Abrir el sitio

1. Descargar el repositorio y descomprimirlo, o clonarlo con Git.
2. Abrir `index.html` en un navegador actual.

No requiere instalación, servidor, cuenta ni conexión a Internet. Los archivos `index.html`, `style.css`, `app.js` e `icon.svg` deben mantenerse juntos. También se puede servir esta carpeta con cualquier servidor de archivos estáticos.

## Qué incluye

- Tema oscuro y claro.
- Contenido en español e inglés.
- Escultura de líneas en Canvas que responde al puntero y permite activar o pausar la animación.
- Laboratorio de trama geométrica en SVG con densidad regulable.
- Caso del propio portfolio, identificado como proyecto en desarrollo.
- Diseño adaptable, navegación por teclado y respeto de la preferencia de movimiento reducido.

## Tecnología actual

HTML, CSS, JavaScript, Canvas y SVG. Sin dependencias externas ni servicios de terceros en tiempo de ejecución.

React, TypeScript y una arquitectura de componentes forman parte de una etapa futura; no están implementados en esta base.

## Archivos

| Archivo | Responsabilidad |
| --- | --- |
| `index.html` | Estructura, secciones y contenido inicial |
| `style.css` | Identidad visual, temas y adaptación a pantallas |
| `app.js` | Idiomas, temas, gráficos e interacciones |
| `icon.svg` | Icono del sitio |

## Próximas etapas

- Revisar la biografía y completar los canales reales de contacto.
- Incorporar proyectos reales con objetivos, decisiones, capturas y enlaces a su código.
- Migrar a React y TypeScript conservando esta base como referencia.
- Definir el dominio y la publicación definitiva.

Los textos de presentación siguen siendo borradores. No se atribuyen experiencia profesional ni proyectos que todavía no existen.

## Comprobar un cambio

Revisar navegación, español/inglés, ambos temas, apertura y cierre del detalle, gráficos y deslizador. Probar escritorio y móvil, incluyendo un ancho de 320 px y el cierre del detalle con Escape.

La sintaxis de JavaScript puede comprobarse, si Node.js está instalado, con `node --check app.js`.

## Versionado

`main` contiene la versión de referencia. Cada funcionalidad nueva puede trabajarse en una rama, por ejemplo `feat/contacto`. La referencia `v2-base` debe conservarse en su commit original para poder comparar o recuperar este punto de partida.

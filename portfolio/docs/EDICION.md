# Cómo editar el portfolio

## Textos, contactos y colores

Editar los textos en `src/content/translations.ts`, completando español e inglés. El tipo `Copy` avisa si falta una traducción. Usar texto plano; la estructura visual pertenece a los componentes.

Perfil, contactos y configuración del CV están en `src/content/site.ts`; proyectos en `src/content/projects.ts`. Los colores, tipografía y anchos comunes están en `src/styles/tokens.css`. Cada sección y componente tiene su CSS Module para cambios particulares.

## Añadir una sección

1. Crear la carpeta en `src/sections/`, con el componente y su `.module.css`. El componente debe recibir el identificador desde el registro y usar un encabezado con identificador propio:

```tsx
import { SectionLabel } from '../../components/SectionHeading';
export default function Education({ id }: { id: string }) {
  return <section id={id} className="section wrap" aria-labelledby="education-title">
    <SectionLabel text="FORMACIÓN" />
    <h2 id="education-title">Mi formación</h2>
  </section>;
}
```

2. Para hacerlo bilingüe, agregar las claves en ambos diccionarios de `translations.ts` y leerlas con `useCopy()`, como en las secciones existentes. Agregar `formacion: { es: 'Formación', en: 'Education' }` a `sectionLabels`.
3. Importar el componente en `src/app/sections.ts` y añadirlo al arreglo:

```ts
{ id: 'formacion', label: sectionLabels.formacion, component: Education,
  enabled: true, showInNavigation: true },
```

Mover esa entrada cambia el orden de la página y del menú. `enabled: false` retira ambos; `showInNavigation: false` conserva el contenido sin enlace. Usar IDs únicos y estables; conservar las anclas originales. No es necesario modificar Layout o App.

## Añadir un proyecto

Duplicar una entrada en `src/content/projects.ts` y completar datos reales, con un ID único:

```ts
{
  id: 'mi-aplicacion',
  title: { es: 'Mi aplicación', en: 'My application' },
  summary: { es: 'Qué resuelve.', en: 'What it solves.' },
  status: 'in-development', // o 'published'
  technologies: ['React', 'TypeScript'],
  repository: 'https://github.com/emradex/mi-repositorio',
  cover: 'projects/mi-aplicacion.webp', // opcional, archivo en public/
  story: [{ title: { es: 'El problema', en: 'The problem' },
    body: { es: 'Contexto y decisiones reales.', en: 'Actual context and decisions.' } }]
}
```

El tipo `Project` define los campos. La tarjeta y su detalle se generan automáticamente, junto con numeración y contador. La portada es decorativa porque el título y resumen están en el botón. No presentar proyectos de muestra como experiencia real.

## Reemplazar el CV

1. Revisar la versión pública: antecedentes correctos, LinkedIn actualizado y sin contactos de referencias de terceros.
2. Reemplazar el archivo de `public/cv/`, o agregar otro y actualizar `profile.resume.path` y `downloadName` en `src/content/site.ts`. Usar ruta relativa a `public/`, sin barra inicial.
3. Actualizar `cvLanguage` en ambos idiomas si cambia el idioma o la cantidad de páginas.
4. Compilar y descargar desde producción. Cabecera, inicio y contacto reutilizan `CvLink` y la misma configuración.

No enlazar un archivo temporal de un chat o que solo exista en una PC: el PDF debe quedar dentro de public/.

## Preferencias y movimiento

`PreferencesProvider` centraliza tema e idioma. Usa `mr-theme` y `mr-language` y recupera también `mr-v2-*`. Sin almacenamiento disponible, los controles funcionan en memoria. Por defecto: oscuro y español.

`usePointerShadow` limita el efecto a 4 px y al siguiente cuadro, sin inercia. Solo se habilita con ratón y sin movimiento reducido; no sustituir el cursor. La escultura inicia con giro lento; suspende el dibujo fuera de pantalla o con la pestaña oculta, sin perder la preferencia de reproducción. Con movimiento reducido se desactiva la animación automática; el giro manual sigue disponible. Los deslizadores se pueden operar con las flechas del teclado.

## Comprobar y versionar

Ejecutar `pnpm run check`, `pnpm run test`, `pnpm run build` y `pnpm run preview`. Probar ES/EN, claro/oscuro, 320 px, tableta y escritorio. Revisar navegación, teclado y foco, sombras, gráficos, deslizador, detalle con Escape y retorno de foco, copia del correo, enlaces externos y descarga del PDF.

Crear una rama por cambio y una propuesta de cambios antes de integrar en main. Conservar v2-base. Los directorios node_modules/, .sites-runtime/ y dist/ son generados e ignorados por Git.

## Figuras y laboratorio

La escultura ofrece Nudo, Anillo y Flor. Arrastrar con mouse o dedo gira la figura; la orientación se conserva al soltar, cambiar la forma o alternar el tema. Al enfocarla con Tab, las flechas rotan e Inicio reinicia. Reiniciar vista detiene la animación y recupera la orientación inicial. Arrastrar también pausa la animación. El área del gráfico captura el gesto táctil; para desplazar la página, usar el espacio exterior.

En `src/graphics/sculpture.ts`, `sculptureShapes` registra las figuras, `surface` define su geometría y `drawSculpture` proyecta las líneas con profundidad. Los controles y el ciclo de vida están en `Sculpture.tsx`. Para añadir una figura, incorporar su clave, geometría y traducciones. No añadir eventos globales sin su limpieza correspondiente.

El laboratorio conserva Moiré y suma Roseta y Órbitas. Densidad controla las líneas; Deformación cambia la geometría. Variar pasa al siguiente patrón con parámetros aleatorios acotados; Restablecer vuelve a Roseta / 24 / 48. La geometría está en `src/graphics/moire.ts`, separada de la interfaz de `Lab.tsx`. No hay animación automática en el laboratorio.

`ChoiceGroup` es el selector compartido, con botones accesibles de estado pulsado. Todos los controles tienen textos ES/EN y un área mínima de 44 px de alto.

El modo oscuro conserva lima y violeta. El claro tiene coral y violeta sobre base cálida. `--art-primary` y `--art-secondary` controlan las figuras; los tokens históricos `--lime*` siguen siendo el acento semántico de la interfaz. La retícula general usa `--page-grid` y `--page-grid-major`; la de los paneles usa `--grid`. Son fondos CSS estáticos, sin un bucle Canvas adicional.

## Dock, música y tarjetas de prueba

La cabecera muestra Bienvenido/Welcome. El dock reutiliza el registro de secciones y aparece cuando la cabecera sale de pantalla. Sus estilos reservan espacio al final de la página y usan el área segura en móvil. La sección activa se calcula al cruzar el 35% superior del viewport y también funciona al volver hacia arriba.

Para sustituir la música, cambiar únicamente playlistId en src/content/music.ts. Modificar los temas de esa misma playlist en Spotify no requiere recompilar. El iframe se carga al abrir Música; minimizarlo lo conserva montado y el audio sigue. El estado y la pausa usan la API oficial, sin cuentas ni credenciales propias. Si la API falla, queda el enlace externo. No se garantiza reproducción completa: Spotify puede ofrecer muestras o pedir inicio de sesión. El cambio de idioma y tema conserva el reproductor.

El carrusel usa desplazamiento nativo, scroll-snap, flechas, teclado y gesto horizontal táctil; no avanza solo ni hace un bucle. Los cortes glitch duran 400 ms al cambiar la tarjeta central. La figura 3D usa una silueta previa durante 400 ms al cambiar de forma; gira aproximadamente una vuelta cada 48 segundos, a un máximo aproximado de 30 dibujos por segundo. Arrastrar o usar flechas la deja pausada; Animar reanuda y Reiniciar vista la deja quieta en la orientación inicial. Movimiento reducido elimina giro inicial e interferencias.

Las seis guías de electrónica están en src/content/electronics.ts y se incorporan desde projects.ts. Usan status: 'guide' y guide con parts, wiring, programming, steps (ES/EN) y sources. El proyecto propio conserva su story. Las referencias educativas se contabilizan por separado; no son trabajos construidos por Mauro. Cada guía enlaza el tutorial original y documentación del fabricante. Los dibujos guide-*.svg son diagramas funcionales originales, no esquemas de cableado completos ni montajes probados físicamente. Para una nueva guía, agregar contenido en ambos idiomas, una portada y fuentes; no agregar un repositorio ajeno como si fuera propio.

El reproductor ahora tiene una cápsula fija en la esquina inferior derecha, vista compacta de 152 px y lista ampliable de 352 px. El mismo iframe se conserva al minimizar o cambiar de tamaño. La carcasa recorta las esquinas a 12 px sobre fondo oscuro y evita el fondo blanco del iframe. Mantener al menos 280 px útiles para Spotify. Su interfaz interna pertenece a Spotify; las opciones, previsualizaciones y reproducción completa dependen del servicio y de la sesión del visitante. La reproducción nunca se inicia automáticamente.

El nudo principal utiliza sculptureFaces() y una superficie opaca con trama para distinguir los cruces. La curva trefoil y el grosor están en graphics/sculpture.ts; initialOrbit define la vista al reiniciar. La geometría se calcula al cambiar de forma, no por fotograma. Se conserva el límite aproximado de 30 dibujos/segundo, la pausa fuera de pantalla y el respeto a movimiento reducido.

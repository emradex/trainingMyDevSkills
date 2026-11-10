import type { Project } from './types';

export const projects: Project[] = [{
  id: 'portfolio', title: { es: 'Portfolio personal', en: 'Personal portfolio' },
  summary: { es: 'Identidad, interfaz y exploración visual. Un proyecto que crece conmigo.', en: 'Identity, interface and visual exploration. A project that grows with me.' },
  status: 'in-development', technologies: ['React', 'TypeScript', 'Vite', 'CSS Modules', 'Canvas', 'SVG'],
  repository: 'https://github.com/emradex/trainingMyDevSkills/tree/main/portfolio',
  story: [
    { title: { es: 'El objetivo', en: 'The goal' }, body: { es: 'Crear una identidad personal como desarrollador, combinando claridad, criterio visual e interacciones que se puedan probar.', en: 'Create a personal developer identity, combining clarity, visual judgment and interactions you can actually try.' } },
    { title: { es: 'La dirección visual', en: 'The visual direction' }, body: { es: 'Negro profundo, tipografía contundente, lima ácido y violeta eléctrico. Mi nombre al frente, con Lógica. Forma. Carácter. como firma.', en: 'Deep black, bold typography, acid lime and electric violet. My name comes first, with Logic. Form. Character. as a signature.' } },
    { title: { es: 'De V2 a V3', en: 'From V2 to V3' }, body: { es: 'La V2 fue un prototipo en HTML, CSS y JavaScript. Esta V3 incorpora React y TypeScript, contenido independiente y un registro de secciones. La base original se conserva en GitHub como v2-base.', en: 'V2 was an HTML, CSS and JavaScript prototype. V3 introduces React and TypeScript, independent content and a section registry. The original baseline is preserved on GitHub as v2-base.' } },
    { title: { es: 'Lo que funciona hoy', en: 'What works today' }, body: { es: 'Temas claro y oscuro, español e inglés, descarga del CV, contacto y copia del correo, escultura interactiva y un experimento de trama regulable. Los gráficos se dibujan localmente, sin servicios externos.', en: 'Light and dark themes, Spanish and English, CV download, contact links and email copying, an interactive sculpture and an adjustable line experiment. Graphics are rendered locally, without external services.' } },
    { title: { es: 'Lo próximo', en: 'What’s next' }, body: { es: 'Seguir afinando el contenido e incorporar proyectos reales, con su proceso, decisiones técnicas y resultados. El modo de escritorio interactivo queda para una etapa posterior.', en: 'Keep refining the content and add real projects with their process, technical decisions and results. An interactive desktop mode is reserved for a later stage.' } },
  ],
}, {
  id: 'esp32-board-reference',
  title: { es: 'ESP32 · La placa', en: 'ESP32 · The board' },
  summary: { es: 'Fotografía de referencia para probar el carrusel. Placa de desarrollo ESP32 de SparkFun.', en: 'A reference photo for testing the carousel. An ESP32 development board by SparkFun.' },
  status: 'placeholder', technologies: ['ESP32', 'SparkFun', 'Hardware'],
  cover: 'projects/esp32-board.jpg', coverAlt: { es: 'Placa SparkFun Thing Plus ESP32 WROOM con antena externa sobre fondo blanco', en: 'SparkFun Thing Plus ESP32 WROOM board with an external antenna on a white background' },
  attribution: { author: 'SparkFun Electronics', url: 'https://commons.wikimedia.org/wiki/File:SparkFun_Thing_Plus_SkeleBoard_-_ESP32_WROOM.jpg', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' }, story: [],
}, {
  id: 'esp32-project-reference',
  title: { es: 'ESP32 · Sensores en acción', en: 'ESP32 · Sensors in action' },
  summary: { es: 'Montaje externo de referencia: Security Box, con una placa ESP32, sensores y un display. Imagen provisional.', en: 'An external reference build: Security Box, with an ESP32 board, sensors and a display. Temporary image.' },
  status: 'placeholder', technologies: ['ESP32', 'IoT', 'Display'],
  cover: 'projects/esp32-sensors.jpg', coverAlt: { es: 'Montaje Security Box con ESP32, sensores, servos, cables y un display que indica OPEN', en: 'Security Box assembly with ESP32, sensors, servos, wires and a display reading OPEN' },
  attribution: { author: 'Taqiya Chowdhury', url: 'https://commons.wikimedia.org/wiki/File:Security_Box.png', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' }, story: [],
}];

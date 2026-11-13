import type { Project } from './types';

export const electronics: Project[] = [
  {
    id: 'esp32-button',
    title: { es: 'Un botón, una respuesta', en: 'A button, a response' },
    summary: {
      es: 'Un pulsador y un LED: el primer puente entre una acción física y una respuesta programada.',
      en: 'A pushbutton and an LED: a first bridge between a physical action and a programmed response.',
    },
    status: 'guide', technologies: ['ESP32', 'GPIO', 'Arduino'],
    cover: 'projects/guide-button.svg',
    coverAlt: {
      es: 'Diagrama educativo de un ESP32 conectado a un pulsador y un LED con resistencia',
      en: 'Educational diagram of an ESP32 connected to a pushbutton and an LED with a resistor',
    },
    story: [],
    guide: {
      parts: {
        es: ['ESP32 DevKit clásico y cable USB', 'LED de 5 mm y resistencia de 330 Ω', 'Pulsador y resistencia de 10 kΩ', 'Protoboard y cables'],
        en: ['Classic ESP32 DevKit and USB cable', '5 mm LED and 330 Ω resistor', 'Pushbutton and 10 kΩ resistor', 'Breadboard and jumper wires'],
      },
      wiring: {
        es: 'El tutorial usa GPIO5 para el LED, con 330 Ω en serie. El pulsador conecta GPIO4 a 3,3 V; una resistencia de 10 kΩ entre GPIO4 y GND mantiene la entrada en LOW cuando está libre.',
        en: 'The tutorial uses GPIO5 for the LED, with 330 Ω in series. The pushbutton connects GPIO4 to 3.3 V; a 10 kΩ resistor between GPIO4 and GND holds the input LOW when released.',
      },
      programming: {
        es: 'En Arduino IDE, setup() configura entrada y salida. loop() lee el botón con digitalRead() y actualiza el LED con digitalWrite(). El LED permanece encendido mientras se pulsa: no es un interruptor con memoria.',
        en: 'In Arduino IDE, setup() configures input and output. loop() reads the button with digitalRead() and updates the LED with digitalWrite(). The LED stays on while pressed; this is not a latching switch.',
      },
      steps: {
        es: ['Montar el circuito con la placa desconectada.', 'Seleccionar placa y puerto en Arduino IDE.', 'Cargar el ejemplo y probar el pulsador.'],
        en: ['Build the circuit with the board disconnected.', 'Select the board and port in Arduino IDE.', 'Upload the example and test the button.'],
      },
      sources: [
        { title: 'Random Nerd Tutorials · Digital Inputs and Outputs', url: 'https://randomnerdtutorials.com/esp32-digital-inputs-outputs-arduino/' },
        { title: 'Espressif · Arduino ESP32 GPIO API', url: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/api/gpio.html' },
      ],
    },
  },
  {
    id: 'esp32-adc',
    title: { es: 'Del giro al dato', en: 'From a turn to a value' },
    summary: {
      es: 'Leer una perilla con el convertidor analógico-digital y observar sus valores en tiempo real.',
      en: 'Read a knob through the analog-to-digital converter and watch its values change in real time.',
    },
    status: 'guide', technologies: ['ESP32', 'ADC', 'Arduino'],
    cover: 'projects/guide-adc.svg',
    coverAlt: {
      es: 'Diagrama educativo de un potenciómetro conectado a la entrada analógica GPIO34 del ESP32',
      en: 'Educational diagram of a potentiometer connected to the ESP32 GPIO34 analog input',
    },
    story: [],
    guide: {
      parts: {
        es: ['ESP32 DevKit clásico y cable USB', 'Potenciómetro de 10 kΩ', 'Protoboard y cables'],
        en: ['Classic ESP32 DevKit and USB cable', '10 kΩ potentiometer', 'Breadboard and jumper wires'],
      },
      wiring: {
        es: 'Conectar los extremos del potenciómetro a 3,3 V y GND, y su terminal central a GPIO34, una entrada ADC1 del ESP32 clásico. La posición de la perilla cambia la tensión que recibe esa entrada.',
        en: 'Connect the potentiometer ends to 3.3 V and GND, and its middle terminal to GPIO34, an ADC1 input on classic ESP32. Turning the knob changes the voltage reaching that input.',
      },
      programming: {
        es: 'analogRead(34) devuelve una lectura sin calibrar. Con 12 bits, el rango es 0–4095. El programa imprime muestras para verlas en el trazador serie. Es una lectura de control, no un voltímetro preciso: el ADC puede saturarse antes de 3,3 V.',
        en: 'analogRead(34) returns an uncalibrated reading. At 12 bits, values range from 0 to 4095. The sketch prints samples for the serial plotter. This is a control input, not a precision voltmeter: the ADC may saturate below 3.3 V.',
      },
      steps: {
        es: ['Conectar la perilla con la placa desconectada.', 'Cargar el ejemplo de lectura analógica.', 'Abrir el trazador serie y girar lentamente.'],
        en: ['Wire the knob with the board disconnected.', 'Upload the analog-reading example.', 'Open the serial plotter and turn slowly.'],
      },
      sources: [
        { title: 'Random Nerd Tutorials · ESP32 Analog Input', url: 'https://randomnerdtutorials.com/esp32-adc-analog-read-arduino-ide/' },
        { title: 'Espressif · Arduino ESP32 ADC API', url: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/api/adc.html' },
      ],
    },
  },
  {
    id: 'esp32-bme280',
    title: { es: 'El ambiente en tres datos', en: 'Three readings of the room' },
    summary: {
      es: 'Temperatura, humedad y presión con un BME280: una introducción a sensores digitales e I²C.',
      en: 'Temperature, humidity and pressure with a BME280: an introduction to digital sensors and I²C.',
    },
    status: 'guide', technologies: ['ESP32', 'BME280 · I²C', 'Arduino'],
    cover: 'projects/guide-bme280.svg',
    coverAlt: {
      es: 'Diagrama educativo de un sensor BME280 conectado al ESP32 mediante el bus I²C',
      en: 'Educational diagram of a BME280 sensor connected to the ESP32 through the I²C bus',
    },
    story: [],
    guide: {
      parts: {
        es: ['ESP32 DevKit clásico y cable USB', 'Módulo BME280 I²C compatible con 3,3 V', 'Protoboard y cuatro cables'],
        en: ['Classic ESP32 DevKit and USB cable', '3.3 V-compatible I²C BME280 breakout', 'Breadboard and four jumper wires'],
      },
      wiring: {
        es: 'Alimentar el módulo con 3,3 V y GND. Conectar SDA a GPIO21 y SCL a GPIO22, los valores habituales del ESP32 genérico. Comprobar el pinout del módulo: algunos rotulan estas líneas como SDI y SCK.',
        en: 'Power the breakout from 3.3 V and GND. Connect SDA to GPIO21 and SCL to GPIO22, the usual generic ESP32 defaults. Check the module pinout: some label these lines SDI and SCK.',
      },
      programming: {
        es: 'Instalar Adafruit_BME280 y sus dependencias. El ejemplo inicializa el sensor y consulta sus mediciones periódicamente. La dirección I²C, 0x76 o 0x77 según el módulo, debe coincidir con begin(). Un BMP280 similar no mide humedad.',
        en: 'Install Adafruit_BME280 and its dependencies. The example initializes the sensor and periodically reads its measurements. The I²C address, 0x76 or 0x77 depending on the breakout, must match begin(). A similar BMP280 does not measure humidity.',
      },
      steps: {
        es: ['Conectar el sensor por I²C.', 'Instalar las bibliotecas y abrir bme280test.', 'Comprobar la dirección y observar las lecturas por serie.'],
        en: ['Wire the sensor through I²C.', 'Install the libraries and open bme280test.', 'Check the address and watch readings over serial.'],
      },
      sources: [
        { title: 'Random Nerd Tutorials · ESP32 with BME280', url: 'https://randomnerdtutorials.com/esp32-bme280-arduino-ide-pressure-temperature-humidity/' },
        { title: 'Adafruit · BME280 Arduino Test', url: 'https://learn.adafruit.com/adafruit-bme280-humidity-barometric-pressure-temperature-sensor-breakout/arduino-test' },
      ],
    },
  },
  {
    id: 'esp32-oled',
    title: { es: 'Una pantalla de bolsillo', en: 'A pocket-sized display' },
    summary: {
      es: 'Texto, figuras e indicadores en una OLED de 128×64 píxeles, sin depender del monitor serie.',
      en: 'Text, shapes and indicators on a 128×64-pixel OLED, without relying on the serial monitor.',
    },
    status: 'guide', technologies: ['ESP32', 'OLED · SSD1306', 'Arduino'],
    cover: 'projects/guide-oled.svg',
    coverAlt: {
      es: 'Diagrama educativo de una pantalla OLED SSD1306 conectada al ESP32 mediante I²C',
      en: 'Educational diagram of an SSD1306 OLED display connected to the ESP32 through I²C',
    },
    story: [],
    guide: {
      parts: {
        es: ['ESP32 DevKit clásico y cable USB', 'OLED SSD1306 I²C de 0,96″ y 128×64 compatible con 3,3 V', 'Protoboard y cuatro cables'],
        en: ['Classic ESP32 DevKit and USB cable', '3.3 V-compatible 0.96-inch 128×64 I²C SSD1306 OLED', 'Breadboard and four jumper wires'],
      },
      wiring: {
        es: 'Usar la versión I²C de cuatro pines: alimentación a 3,3 V, GND común, SDA a GPIO21 y SCL a GPIO22. Las variantes SPI tienen otras conexiones; conviene identificar el modelo antes de montarlo.',
        en: 'Use the four-pin I²C version: power from 3.3 V, common GND, SDA to GPIO21 and SCL to GPIO22. SPI variants use different connections; identify the model before wiring it.',
      },
      programming: {
        es: 'Adafruit_SSD1306 controla la pantalla y Adafruit_GFX aporta texto y figuras. El programa prepara un búfer y lo envía con display(). Configurar resolución y dirección I²C según el módulo: 0x3C es habitual, pero debe comprobarse.',
        en: 'Adafruit_SSD1306 drives the display, while Adafruit_GFX provides text and shapes. The sketch prepares a buffer and sends it with display(). Set resolution and I²C address for the actual module: 0x3C is common but should be checked.',
      },
      steps: {
        es: ['Conectar la pantalla con la placa apagada.', 'Instalar SSD1306 y GFX desde el gestor.', 'Probar el ejemplo 128×64 y cambiar sus textos.'],
        en: ['Wire the display with the board powered off.', 'Install SSD1306 and GFX from the manager.', 'Try the 128×64 example and change its text.'],
      },
      sources: [
        { title: 'Random Nerd Tutorials · ESP32 OLED Display', url: 'https://randomnerdtutorials.com/esp32-ssd1306-oled-display-arduino-ide/' },
        { title: 'Adafruit · OLED Arduino Library and Examples', url: 'https://learn.adafruit.com/monochrome-oled-breakouts/arduino-library-and-examples' },
      ],
    },
  },
  {
    id: 'esp32-wifi',
    title: { es: 'Del navegador al circuito', en: 'From browser to circuit' },
    summary: {
      es: 'Una página servida por el propio ESP32 permite controlar dos LEDs desde el móvil en la red local.',
      en: 'A page served by the ESP32 itself lets a phone control two LEDs on the local network.',
    },
    status: 'guide', technologies: ['ESP32', 'Wi-Fi · HTTP', 'Arduino'],
    cover: 'projects/guide-wifi.svg',
    coverAlt: {
      es: 'Diagrama educativo de un navegador conectado por Wi-Fi a un ESP32 que controla dos LEDs',
      en: 'Educational diagram of a browser connected over Wi-Fi to an ESP32 controlling two LEDs',
    },
    story: [],
    guide: {
      parts: {
        es: ['ESP32 DevKit clásico y cable USB', 'Dos LEDs y dos resistencias de 220 Ω', 'Protoboard y cables', 'Red Wi-Fi de 2,4 GHz'],
        en: ['Classic ESP32 DevKit and USB cable', 'Two LEDs and two 220 Ω resistors', 'Breadboard and jumper wires', '2.4 GHz Wi-Fi network'],
      },
      wiring: {
        es: 'Conectar un LED con su resistencia en serie a GPIO26 y otro a GPIO27, ambos con retorno a GND. El móvil o la computadora deben estar en la misma red local que el ESP32.',
        en: 'Connect one LED with its series resistor to GPIO26 and another to GPIO27, both returning to GND. The phone or computer must share the ESP32’s local network.',
      },
      programming: {
        es: 'El ejemplo actualizado usa WiFi.h y WebServer.h. Tras conectarse, imprime su IP. Cada botón del navegador solicita una ruta cuya función cambia un LED y devuelve la página actualizada. server.handleClient() atiende peticiones en loop().',
        en: 'The updated example uses WiFi.h and WebServer.h. After connecting, it prints its IP. Each browser button requests a route whose handler changes an LED and returns the updated page. server.handleClient() processes requests in loop().',
      },
      steps: {
        es: ['Montar los dos LEDs.', 'Configurar la red en el ejemplo y cargarlo.', 'Leer la IP por serie y abrirla en el navegador.'],
        en: ['Build the two-LED circuit.', 'Set the example’s network and upload it.', 'Read the IP over serial and open it in a browser.'],
      },
      sources: [
        { title: 'Random Nerd Tutorials · ESP32 Web Server Beginners Guide', url: 'https://randomnerdtutorials.com/esp32-web-server-beginners-guide/' },
        { title: 'Espressif · Arduino ESP32 Wi-Fi API', url: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/api/wifi.html' },
      ],
    },
  },
  {
    id: 'esp32-touch',
    title: { es: 'Un botón de papel aluminio', en: 'An aluminium-foil button' },
    summary: {
      es: 'Una superficie conductora se convierte en sensor táctil: experimentar con capacitancia sin un botón mecánico.',
      en: 'A conductive surface becomes a touch sensor: experiment with capacitance without a mechanical button.',
    },
    status: 'guide', technologies: ['ESP32', 'Touch', 'Arduino'],
    cover: 'projects/guide-touch.svg',
    coverAlt: {
      es: 'Diagrama educativo de una superficie de aluminio conectada a GPIO4 como sensor táctil del ESP32',
      en: 'Educational diagram of an aluminium pad connected to GPIO4 as an ESP32 touch sensor',
    },
    story: [],
    guide: {
      parts: {
        es: ['ESP32 clásico con sensor táctil y cable USB', 'Cable con extremo conductor', 'Pequeño trozo de papel aluminio'],
        en: ['Classic ESP32 with touch support and USB cable', 'Jumper wire with a conductive end', 'Small aluminium-foil pad'],
      },
      wiring: {
        es: 'Conectar un cable desde GPIO4, llamado T0 en el ESP32 clásico, a la lámina de aluminio. El dedo modifica la capacitancia que mide el circuito. No todas las familias ESP32 incluyen este periférico ni comparten sus pines.',
        en: 'Connect a wire from GPIO4, called T0 on classic ESP32, to the foil pad. A finger changes the capacitance measured by the circuit. Not every ESP32 family includes this peripheral or shares its pins.',
      },
      programming: {
        es: 'touchRead(4) permite observar las lecturas por serie. Comparar reposo y contacto antes de elegir un umbral propio. En el ESP32 clásico el valor normalmente disminuye al tocar; en S2/S3 el sentido cambia, por lo que no existe un umbral universal.',
        en: 'touchRead(4) lets you inspect readings over serial. Compare idle and touched values before choosing a threshold. On classic ESP32, the value normally decreases when touched; S2/S3 use the opposite direction, so there is no universal threshold.',
      },
      steps: {
        es: ['Conectar el cable a la lámina.', 'Cargar el ejemplo TouchRead y abrir el monitor serie.', 'Comparar lecturas y ajustar el umbral del montaje.'],
        en: ['Connect the wire to the pad.', 'Upload TouchRead and open the serial monitor.', 'Compare readings and set a threshold for the setup.'],
      },
      sources: [
        { title: 'Random Nerd Tutorials · ESP32 Capacitive Touch Pins', url: 'https://randomnerdtutorials.com/esp32-touch-pins-arduino-ide/' },
        { title: 'Espressif · Arduino ESP32 Touch API', url: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/api/touch.html' },
      ],
    },
  },
];

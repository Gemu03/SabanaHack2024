# Reto y Escenario del Desafío de Lavado de Manos en la UCI

## Escenario
El personal sanitario del hospital debe seguir un protocolo de lavado de manos que incluye **5 momentos** esenciales para prevenir infecciones asociadas a la atención en salud (IAAS). Estos momentos son:

1. **Antes de tocar al paciente**
2. **Antes de realizar una tarea limpia/aséptica**
3. **Después del riesgo de exposición a líquidos corporales**
4. **Después de tocar al paciente**
5. **Después del contacto con el entorno del paciente**

Cada uno de estos momentos requiere que el personal cumpla con una **técnica específica de lavado de manos**, la cual incluye posturas, movimientos y tiempos específicos para cada postura.

Actualmente, se emplean **observadores humanos** para monitorear el cumplimiento de estos momentos y técnicas, lo cual representa un esfuerzo significativo y no cubre todo el tiempo a todos los trabajadores.

## Desafío
El reto consiste en desarrollar una **solución tecnológica** que permita monitorear y registrar de manera automatizada la **adherencia al protocolo de lavado de manos**, enfocándose en la **técnica de ejecución** dentro de la **Unidad de Cuidados Intensivos (UCI)** del Instituto Nacional de Cancerología (INC). 

### Requisitos para la Solución
1. **Ingreso de Información Visual**: 
   - Utilizar una cámara para la captura visual.
   - Realizar pruebas experimentales con videos.

2. **Interfaz Gráfica Informativa**: 
   - Proveer visualización de información como gesto, tiempo por gesto, tiempo total de la técnica y evaluación general.

3. **Reconocimiento e Identificación del Personal**: 
   - Inicialmente mediante teclado numérico.
   - Optimización futura para reconocimiento facial.

4. **Funcionalidades del Sistema**:
   - Reconocimiento de las **posturas de las manos**.
   - **Detección de objetos no permitidos** (e.g., anillos, relojes).
   - Medición del **tiempo total de lavado** (mínimo 60 segundos).
   - **Realimentación al usuario** sobre el cumplimiento de la técnica.

### Recursos Disponibles
- **Base de datos** con videos y documentación para el desarrollo.
- **Guía de lavado de manos** de la World Health Organization (WHO).

Enlaces a recursos:
- [Base de datos en Zenodo](https://zenodo.org/records/4537209)
- [Guía de lavado de manos de la WHO](https://cdn.who.int/media/docs/default-source/documents/health-topics/hand-hygiene-why-how-and-when-brochure.pdf)

## Objetivo
Implementar una solución que monitoree de manera efectiva la adherencia del personal sanitario al protocolo de lavado de manos en la UCI del INC, permitiendo reducir la carga de trabajo de los observadores y mejorar la cobertura y precisión del monitoreo.



# Solución propuesta

## Descripción
Nuestra solución consiste en un **sistema de visión artificial** que permite monitorear y registrar de manera automatizada la **adherencia al protocolo de lavado de manos** en la UCI del INC. Para ello, se emplea un sistema embebido para cada lavamanos de la UCI, el cual consta de una **cámara** para la captura visual. Luego, se realiza un procesamiento de imágenes en tiempo real para reconocer las posturas de las manos, detectar objetos no permitidos y medir el tiempo total de lavado.

Tras el procesamiento de las imágenes, se provee una **interfaz gráfica informativa** que muestra al usuario el gesto actual, el tiempo por gesto, el tiempo total de la técnica y una evaluación general del lavado.

Luego estos datos son almacenados en una base de datos local en cada sistema embebido(micro SD) y se envían a un servidor central para su posterior análisis y seguimiento. En este servidor se almacenan los datos de todos los lavamanos de la UCI y se generan reportes de cumplimiento del protocolo de lavado de manos por cada trabajador. 

## Componentes
1. **Cámara de Captura**: Dispositivo para la captura de imágenes.
2. **Sistema Embebido**: Dispositivo que procesa las imágenes y provee la interfaz gráfica. - Raspberry Pi 4
3. **Servidor Central**: Almacena los datos y genera reportes de cumplimiento. - Servidor en la nube

tenía pensado que las raspberry pi no estuvieran conectadas a internet, sino que se conectaran a un servidor local que se encargara de enviar la información al servidor central, quiero que en el txt me digas si es posible hacer esto o si es mejor que las raspberry pi estén conectadas a internet. dandome ventajas y desventajas.
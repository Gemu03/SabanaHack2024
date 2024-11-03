# Ficha Técnica - Monitor Inteligente de Lavado de Manos (MILM)

## Descripción breve
**Monitor Inteligente de Lavado de Manos (MILM)** es una solución innovadora basada en **visión artificial** y **machine learning federado** diseñada para monitorear y optimizar la adherencia al protocolo de lavado de manos en entornos hospitalarios. Mediante un sistema embebido con un **espejo inteligente** y una interfaz de realidad aumentada, MILM guía a los usuarios en tiempo real, asegurando el cumplimiento de cada paso y el tiempo adecuado de lavado. Esta solución permite una reducción significativa de infecciones asociadas a la atención en salud (IAAS) y una mejora continua en la higiene hospitalaria sin la necesidad de observadores humanos.

## Nivel de desarrollo
**Prototipo funcional avanzado**: El sistema MILM se encuentra en su fase funcional, con todos los componentes integrados, incluyendo el reconocimiento de gestos, retroalimentación en tiempo real, y sincronización local para su operación autónoma sin dependencia constante de Internet.

## Link al video
[Video de presentación](URL)

## Ventajas o fortalezas de nuestra propuesta
1. **Autonomía y Flexibilidad**: MILM opera de manera autónoma sin necesidad de conexión constante a Internet, lo que lo hace ideal para entornos hospitalarios con conectividad variable.
2. **Innovación Tecnológica**: Incorpora machine learning federado, visión artificial avanzada, y realidad aumentada, ofreciendo una experiencia completamente innovadora para el usuario.
3. **Monitoreo en Tiempo Real con Retroalimentación Inmediata**: La realidad aumentada guía y corrige al usuario durante el lavado, asegurando el cumplimiento del protocolo y minimizando errores.
4. **Optimización de Recursos**: Elimina la necesidad de observadores humanos y genera reportes de cumplimiento automáticos, lo que facilita el análisis de adherencia sin carga adicional de trabajo.
5. **Adaptabilidad**: La tecnología federada permite que el sistema mejore de manera continua según los patrones de uso, haciendo que el modelo de reconocimiento sea cada vez más preciso.

6. **Costo de Implementación**: Por menos de $2.000.000, MILM ofrece una solución completa y efectiva para un entorno hospitalario, adicionalmente, usando Cloud Computing, el costo de mantenimiento y actualización de software es mínimo en comparación con un sistema centralizado. 

## Desventajas o debilidades de nuestra propuesta
1. **Costo Inicial de Implementación**: La integración de tecnología avanzada en un espejo inteligente puede requerir una inversión inicial significativa.
2. **Requiere Capacitación**: El personal debe estar capacitado para utilizar y entender la retroalimentación del sistema, especialmente en el uso de la realidad aumentada.

## Detalles técnicos
- **Tecnologías utilizadas**: Python, OpenCV, TensorFlow Lite (para Machine Learning Federado), Flask (backend HTTP), ARKit/ARCore (para realidad aumentada), SQLite (base de datos local).
- **Herramientas usadas**: Docker (para entornos virtualizados), Figma (prototipo UI), ReportLab (para generación de reportes PDF), GitHub (control de versiones), Raspberry Pi 4 (sistema embebido).
- **Alcance del prototipo**: 
  - Actualmente, el prototipo incluye reconocimiento de gestos básicos y avanzados de lavado de manos, detección de objetos no permitidos, y sincronización local de datos en la microSD.
  - Implementación de realidad aumentada en la interfaz para guiar al usuario en la técnica de lavado.
  - Generación de reportes automáticos que se almacenan localmente y pueden ser visualizados en la pantalla del dispositivo.
  - Soporte para machine learning federado, permitiendo que cada unidad aprenda de su entorno y mejore la precisión del reconocimiento sin necesidad de un servidor central.

## Repositorio del proyecto
[Repositorio del equipo](URL)

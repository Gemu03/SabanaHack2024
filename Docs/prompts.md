# Solución Propuesta: Sistema de Monitoreo de Adherencia al Protocolo de Lavado de Manos sin Servidor Central

## Descripción General
Esta solución elimina la dependencia de un servidor central al distribuir el procesamiento y almacenamiento de datos entre los **sistemas embebidos** (Raspberry Pi) en cada estación de lavado de manos. Los dispositivos Raspberry Pi monitorean y registran de manera autónoma el cumplimiento del protocolo de lavado de manos, almacenan los datos localmente, y sincronizan la información a través de **HTTP** solo cuando hay conectividad disponible.

El sistema emplea **visores de datos locales** en cada Raspberry Pi para que el personal de salud pueda ver información sobre su adherencia al protocolo de higiene sin depender de una conexión constante a Internet. 

## Componentes del Sistema

1. **Raspberry Pi con Cámara y Almacenamiento Local**
   - **Dispositivo**: Raspberry Pi 4 con cámara de alta resolución.
   - **Función**: Captura de video e imágenes durante el lavado de manos y análisis en tiempo real mediante visión artificial.
   - **Procesamiento en Tiempo Real**: Se usan modelos de visión artificial locales que reconocen los gestos específicos de la técnica de lavado y detectan objetos no permitidos.
   - **Almacenamiento Local**: La Raspberry Pi almacena todos los registros y análisis de lavado de manos en una tarjeta microSD.
   
2. **Interfaz Gráfica Local en Raspberry Pi**
   - **Pantalla de Visualización**: Una interfaz gráfica basada en **HTML5** y **CSS** permite mostrar información de cumplimiento en tiempo real.
   - **Visualización de Datos**:
     - Gesto actual y nivel de cumplimiento de la técnica.
     - Tiempo por gesto y tiempo total de la técnica.
     - Retroalimentación visual indicando éxito o error en la técnica de lavado.
   - **Generación de Reportes Locales**: Se implementa una pequeña aplicación en **Python** que genera reportes locales en formato PDF o CSV, almacenados en la microSD.

3. **Comunicación y Sincronización de Datos (HTTP)**
   - **HTTP Requests**: Cuando la conexión a Internet está disponible, las Raspberry Pi envían los reportes y datos recopilados a un servidor externo (si se opta por mantener una copia central) o a un sistema de respaldo en la red interna.
   - **Servidor HTTP Local (Flask)**: Cada Raspberry Pi opera con un servidor HTTP local simple (usando **Flask** en Python) que permite consultar datos y realizar descargas de reportes mediante una API RESTful.

## Tecnologías Utilizadas

1. **Visión Artificial**: 
   - **OpenCV**: Biblioteca de visión computacional que permite realizar el reconocimiento de posturas de las manos y gestos específicos del protocolo.
   - **Modelo de Red Neuronal**: Se emplea un modelo de red neuronal ligero, como MobileNet, pre-entrenado y ajustado para el reconocimiento de gestos específicos del protocolo de lavado.

2. **Interfaz Gráfica y Generación de Reportes**:
   - **Flask**: La Raspberry Pi actúa como un servidor HTTP, donde Flask sirve como backend para la interfaz gráfica local y para la generación de reportes en PDF o CSV.
   - **HTML5 y CSS**: La interfaz de usuario es sencilla y clara, con elementos visuales que guían al personal de salud a seguir el protocolo de manera correcta.
   - **Python ReportLab**: Generación de reportes en formato PDF. ReportLab permite que los datos se formateen y generen informes locales que pueden descargarse o imprimirse directamente desde la Raspberry Pi.

3. **Sincronización de Datos**:
   - **HTTP Requests (GET, POST)**: Cuando la conexión a Internet está disponible, las Raspberry Pi utilizan solicitudes POST para enviar datos a un servidor externo o nube. 
   - **SQLite**: Base de datos ligera local en cada Raspberry Pi para almacenar todos los registros históricos de lavado de manos, incluyendo cada gesto registrado, tiempo y evaluación de cumplimiento.

4. **Almacenamiento Local**:
   - **MicroSD de alta capacidad**: Cada Raspberry Pi tiene una tarjeta de almacenamiento que guarda videos, imágenes y reportes generados. Estos datos permanecen en la microSD hasta que se puedan sincronizar, proporcionando un respaldo confiable de los registros.

## Funcionamiento del Sistema

1. **Monitoreo y Procesamiento Local en Tiempo Real**
   - Cuando un trabajador comienza a lavarse las manos, la cámara de la Raspberry Pi captura el proceso. La Raspberry Pi analiza en tiempo real los gestos de lavado de manos utilizando el modelo de visión artificial.
   - La interfaz gráfica proporciona retroalimentación inmediata sobre la técnica y el tiempo de cada gesto, y al finalizar, muestra una evaluación general del cumplimiento del protocolo.

2. **Generación y Almacenamiento de Reportes Locales**
   - Después de cada sesión de lavado, el sistema genera automáticamente un reporte de cumplimiento. Este reporte se guarda en la microSD en formato PDF y CSV, accesible desde la interfaz gráfica.
   - Los reportes incluyen:
     - Nombre del trabajador (opcional, si hay identificación con código).
     - Fecha y hora del lavado.
     - Tiempo de lavado total y tiempo por gesto.
     - Errores o cumplimientos específicos en la técnica.
     - Evaluación final de la adherencia al protocolo.

3. **Sincronización de Datos vía HTTP (opcional)**
   - Cuando la conexión a Internet está disponible, la Raspberry Pi verifica si existen reportes pendientes de sincronización.
   - Mediante HTTP POST requests, los datos se envían a un servidor externo o de respaldo. Estos datos pueden consolidarse en una base de datos central (SQLite o MySQL) para facilitar el análisis y auditoría futura.
   - Si no se puede establecer conexión, los datos se retienen en la microSD hasta el próximo intento exitoso de sincronización.

4. **Consulta Local de Datos**
   - El servidor Flask permite que el personal de supervisión consulte reportes directamente desde el navegador de la Raspberry Pi, o desde cualquier dispositivo en la red interna (con permisos).
   - Se pueden realizar consultas específicas, como registros de cumplimiento por día o trabajador, y descargar reportes históricos en PDF o CSV.

## Ventajas de esta Solución

- **Autonomía Total de Conectividad**: La Raspberry Pi opera de manera autónoma sin depender de conexión a Internet, lo cual es ideal para áreas con conectividad limitada.
- **Bajo Costo**: No se requiere infraestructura adicional (como servidores externos), lo que simplifica la implementación y reduce costos.
- **Mantenimiento Simplificado**: La solución es modular y cada dispositivo es autosuficiente, por lo que cualquier problema se puede resolver en el dispositivo específico sin impactar al sistema completo.
- **Acceso a Reportes**: La interfaz local permite que el personal de la UCI consulte y revise reportes directamente en la Raspberry Pi, optimizando la disponibilidad de los datos.

## Desafíos y Consideraciones

- **Capacidad de Almacenamiento Local**: Almacenar video e imágenes de cada sesión de lavado de manos podría requerir tarjetas microSD de alta capacidad. Se deben establecer políticas de retención de datos para evitar el uso excesivo de almacenamiento.
- **Consumo de Energía**: Aunque la Raspberry Pi es de bajo consumo, se debe asegurar una fuente de energía confiable en cada estación de lavado.
- **Capacitación en Uso de Interfaz**: Es crucial capacitar al personal de la UCI para que comprendan cómo interactuar con la interfaz y cómo consultar reportes cuando sea necesario.

## Conclusión

Este sistema basado en visión artificial y sistemas embebidos autónomos permite un monitoreo preciso y seguro del protocolo de lavado de manos en la UCI del INC sin necesidad de un servidor central ni dependencia constante de Internet. La solución reduce la carga de trabajo de los observadores humanos y garantiza un acceso confiable a los datos de adherencia al protocolo, mejorando la higiene y reduciendo el riesgo de infecciones en el entorno hospitalario.


Esta solución hace lo que se le pide, pero es lo que todos los grupos están haciendo. No se destaca por nada en particular. quiero que me digas opciones que tengo para destacar mi solución. dame unas 20 opciones de la mas impactante a la menos impactante.


eres un asistente de lavado de manos, responderás a la calidad de lavado de manos suponiendo un escenario que te dirá en que paso vas.
tendrás estos pasos:
0. enjuagar las manos.
1. poner jabon.
2. gestos de manos
2.1. activar jabon
2.2. entrelazar dedos
2.3. dorso de la mano
2.4. nudillos
2.5. pulgar y dedos


Somos un producto que ofrece a las clínicas y hospitales un sistema de monitoreo de lavado de manos. Nuestro sistema se basa en la instalación de estaciones de lavado de manos equipadas con cámaras y sensores que monitorean el proceso de lavado de manos de los trabajadores de la salud. El sistema registra el tiempo de lavado, los movimientos realizados y la efectividad del lavado de manos. Teniendo una interfaz de usuario (Cleany) que permite a los trabajadores de la salud ver su desempeño y recibir retroalimentación en tiempo real. Además, el sistema genera informes detallados sobre el cumplimiento del protocolo de lavado de manos, lo que ayuda a las clínicas y hospitales a mejorar la higiene y reducir la propagación de infecciones. Nuestro sistema es fácil de instalar y usar, y ofrece una solución efectiva y rentable para mejorar la higiene en entornos de atención médica.
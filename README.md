# Repositorio oficial de Webelopers 2024

## Integrantes
- Giovanni Esteban Moreno Urbina
- John Jairo Rojas 
- Héctor José Guzmán
- Tomás Barón
- Samuel Esteban Ramirez

## Descripción
Este repositorio es el oficial de Webelopers para la SabanaHack 2024, en el cual se encuentran los archivos necesarios para el desarrollo del proyecto y su documentación.

## Estructura del repositorio
- **/Docs**: Los archivos dados por la organización de la hackathon.
- **/UniSabana**: Los archivos dados por la organización de la hackathon.
- **/Tests**: Archivos pruebas pruebas con las APIs y todo eso.
- **/Venv**: Entorno virtual de Python.
- **README.md**: Este archivo.  
- **.gitignore**: Archivo de configuración de Git.

### Venv
1. Para crear el entorno virtual, se debe ejecutar el siguiente comando:
    ```bash
    python -m venv venv
    ```

2. Para activar el entorno virtual, se debe ejecutar el siguiente comando:
    #### Powershell
    ```bash
    .\venv\Scripts\Activate.ps1
    ```
    #### Linux/MacOS
    ```bash
    source venv/bin/activate
    ```

3. Para instalar las dependencias, se debe ejecutar el siguiente comando:
    ```bash
    pip install -r .\Docs\requirements.txt
    ```

4. Para desactivar el entorno virtual, se debe ejecutar el siguiente comando:
    ```bash
    deactivate
    ```

### Env Variables
#### Powershell
```bash
$env:OPENAI_API_KEY="API_KEY"
$env:

```

## Prototipos desarrollados

### Link de Figma
[Link de Figma](https://www.figma.com/design/3rWAhdLMbZaNEDgxKxILj9/SabanaHack-2024?node-id=0-1&t=2bD2VlNjpefAaXRP-1)

### Modelos de Machine Learning
#### Modelo de identificación de personas
[Modelo de identificación de personas](https://drive.google.com/file/d/1hJsS1MYbnOHjkAYQYaFe38Js6_CGeHax/view?usp=sharing)

#### Modelo de identificación de objetos no permitidos
[Modelo de identificación de objetos no permitidos](https://drive.google.com)

#### Modelo de reconocimiento de gestos
[Modelo de reconocimiento de gestos](https://drive.google.com)

### Sistema Embebido

![](<Imagen de WhatsApp 2024-11-02 a las 19.24.16_39b500e1.jpg>)
#### 0. Infraestructura
El sistema embebido se compone de una Raspberry Pi 4 con 2 cámaras, una para el reconocimiento de personas y otra para el reconocimiento de gestos y objetos no permitidos. 
Además, va a estar montado en un espejo inteligente con una pantalla LCD y un sistema de altavoces para la retroalimentación en tiempo real.

#### 1. Implementacion de identificación de personas
El modelo de identificación de personas se encarga de reconocer a los usuarios que se encuentran frente al espejo inteligente. Cada persona almacenada tiene un peso de 15 MB y se almacena en la memoria interna de la Raspberry Pi 4. 

##### Proceso para correr el modelo
Se hace Localhost y se corre el modelo de identificación de personas, no permite subirse directamente a la nube por que el modelo requiere de un sistema local para funcionar.
> El modelo se encuentra en la carpeta 'CleanyFacial' 


#### 2. Implementacion de identificación de objetos no permitidos y reconocimiento de gestos
[Modelo de identificación de objetos no permitidos](https://universe.roboflow.com/handwash-j49en/hand_wansh./model/1?webcam=true)
1. Entrar
2. Ir a pestaña que dice [Model]
3. Try with Webcam.

#### 3. Envio de datos a la nube y visualización de datos
Los datos recolectados por el sistema embebido se envían a la nube para su posterior análisis y visualización.

##### Comandos para correr el gestor de datos
```bash
cd plataforma_administrativa_de_cleany 
npm install
npm start
```
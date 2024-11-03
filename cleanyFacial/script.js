// Point to the model folder
const URL = "./model/";

let model, webcam, labelContainer, maxPredictions;
const statusDiv = document.getElementById('status');

// Load the image model and setup the webcam
async function init() {
    let start = document.getElementById('Start');
    try {
        start.style.display = 'none';
        statusDiv.textContent = 'Loading model...';
        
        // Construct the full URLs for model and metadata
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        statusDiv.textContent = 'Initializing webcam...';
        
        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        const webcamContainer = document.getElementById("webcam-container");
        webcamContainer.innerHTML = ''; // Clear previous content
        webcamContainer.appendChild(webcam.canvas);
        
        labelContainer = document.getElementById("label-container");
        labelContainer.innerHTML = ''; // Clear previous content
        for (let i = 0; i < maxPredictions; i++) {
            const predictionDiv = document.createElement("div");
            predictionDiv.classList.add('prediction');
            labelContainer.appendChild(predictionDiv);
        }

        statusDiv.textContent = 'Model running - classify objects in view!';
    } catch (error) {
        statusDiv.textContent = 'Error: ' + error.message;
        console.error('Initialization error:', error);
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    try {
        const predictions = await model.predict(webcam.canvas);
        let highestPrediction = predictions[0];
        
        // Find the highest probability prediction
        predictions.forEach((prediction) => {
            if (prediction.probability > highestPrediction.probability) {
                highestPrediction = prediction;
            }
        });

        // Update the label container to show only the highest prediction
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction = 
                `${predictions[i].className}: ${(predictions[i].probability * 100).toFixed(2)}%`;

            // Set content and visibility
            labelContainer.childNodes[i].innerHTML = classPrediction;
            labelContainer.childNodes[i].style.display = 
                predictions[i] === highestPrediction ? 'block' : 'none';
        }

        // Update the h1 element with the highest prediction
        const h1 = document.querySelector("#contenedorPantalla h1");
        const profession = document.getElementsByClassName('profession')[0];
        const idnumber = document.getElementsByClassName('id-number')[0];    


        h1.textContent = `Bienvenidos ${highestPrediction.className}`;
        if (highestPrediction.className === 'Gio') {
            profession.textContent = 'Médico General';
            idnumber.textContent = 'ID: 1234567890';
        }
        if (highestPrediction.className === 'Tomas') {
            profession.textContent = 'Médico General';
            idnumber.textContent = 'ID: 3234567890';
        }
        if (highestPrediction.className === 'Samuel') {
            profession.textContent = 'Médico General';
            idnumber.textContent = 'ID: 4234567890';
        }
        if (highestPrediction.className === 'Nada') {
            h1.textContent = 'Bienvenido Invitado';
            profession.textContent = 'Usuario sin registro';
            idnumber.textContent = 'ID: 0000000000';
        }
            
    } catch (error) {
        console.error('Prediction error:', error);
    }

}



// Función para verificar y solicitar permisos de cámara
async function requestCameraPermission() {
    try {
        // Primero verificamos si ya tenemos permiso
        const result = await navigator.permissions.query({ name: 'camera' });
        
        if (result.state === 'denied') {
            throw new Error('El acceso a la cámara está bloqueado. Por favor, permite el acceso en la configuración de tu navegador.');
        }

        // Intentamos obtener acceso a la cámara con configuración básica
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                width: 640,
                height: 480
            } 
        });

        // Si llegamos aquí, tenemos acceso
        stream.getTracks().forEach(track => track.stop()); // Liberamos la cámara
        return true;
    } catch (error) {
        console.error('Error al solicitar permiso de cámara:', error);
        throw error;
    }
}

async function startVideo() {
    const video = document.getElementById('video');
    const cameraStatus = document.getElementById('camera-status');
    const errorContainer = document.getElementById('error-container');

    try {
        // Limpiar mensajes anteriores
        errorContainer.style.display = 'none';
        cameraStatus.textContent = 'Verificando acceso a la cámara...';

        // Verificar y solicitar permisos
        await requestCameraPermission();

        // Configuración de la cámara
        const constraints = {
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: 'user'
            },
            audio: false
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;

        return new Promise((resolve) => {
            video.onloadedmetadata = () => {
                video.play()
                    .then(() => {
                        cameraStatus.textContent = 'Cámara iniciada correctamente';
                        cameraStatus.className = 'success-message';
                        detectFaces();
                        resolve();
                    })
                    .catch(error => {
                        throw new Error(`Error al reproducir video: ${error.message}`);
                    });
            };
        });
    } catch (error) {
        let errorMessage = '';
        
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
            errorMessage = 'Acceso a la cámara denegado. Por favor, permite el acceso en la configuración de tu navegador.';
        } else if (error.name === 'NotFoundError') {
            errorMessage = 'No se encontró ninguna cámara. Por favor, conecta una cámara y vuelve a intentarlo.';
        } else if (error.name === 'NotReadableError') {
            errorMessage = 'La cámara está siendo usada por otra aplicación. Cierra otras aplicaciones que puedan estar usando la cámara.';
        } else {
            errorMessage = `Error al acceder a la cámara: ${error.message}`;
        }

        errorContainer.textContent = errorMessage;
        errorContainer.style.display = 'block';
        cameraStatus.textContent = '';
        console.error('Error detallado:', error);
    }
}

async function loadModel() {
    const button = document.querySelector('button');
    const statusDiv = document.getElementById('status');
    
    try {
        button.disabled = true;
        statusDiv.textContent = 'Inicializando...';

        // Verificar soporte de MediaDevices
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('Tu navegador no soporta el acceso a la cámara');
        }

        await init();
        await startVideo();
        
    } catch (error) {
        statusDiv.textContent = `Error: ${error.message}`;
        button.disabled = false;
    }
}

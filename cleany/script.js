// Seleccionar el elemento de video
const videoElement = document.getElementById("background-video");

// Solicitar acceso a la cámara
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        videoElement.srcObject = stream; // Asignar el flujo de la cámara al video de fondo
    })
    .catch(error => {
        console.error("Error al acceder a la cámara: ", error);
    });

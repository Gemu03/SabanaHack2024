const URL = "./model_hands/";
        let model, webcam, labelContainer, maxPredictions;
        const statusDiv = document.getElementById('status');

        async function init() {
            try {
                statusDiv.textContent = 'Cargando modelo...';
                const modelURL = URL + "model_hands.json";
                const metadataURL = URL + "metadata_hands.json";

                model = await tmImage.load(modelURL, metadataURL);
                maxPredictions = model.getTotalClasses();

                statusDiv.textContent = 'Inicializando cámara...';
                webcam = new tmImage.Webcam(window.innerWidth, window.innerHeight, true);
                await webcam.setup();
                await webcam.play();
                window.requestAnimationFrame(loop);

                document.getElementById("webcam-container").appendChild(webcam.canvas);
                labelContainer = document.getElementById("label-container");

                labelContainer.innerHTML = '';
                for (let i = 0; i < maxPredictions; i++) {
                    const predictionBar = document.createElement("div");
                    predictionBar.className = 'prediction-bar';
                    
                    const labelName = document.createElement("div");
                    labelName.className = 'label-name';
                    
                    const progressBar = document.createElement("div");
                    progressBar.className = 'progress-bar';
                    
                    const progressFill = document.createElement("div");
                    progressFill.className = 'progress-fill';
                    progressBar.appendChild(progressFill);
                    
                    const probability = document.createElement("div");
                    probability.className = 'probability';
                    
                    predictionBar.appendChild(labelName);
                    predictionBar.appendChild(progressBar);
                    predictionBar.appendChild(probability);
                    labelContainer.appendChild(predictionBar);
                }

                statusDiv.textContent = '¡Modelo activo!';
            } catch (error) {
                statusDiv.textContent = 'Error: ' + error.message;
                console.error('Error de inicialización:', error);
            }
        }

        async function loop() {
            webcam.update();
            await predict();
            window.requestAnimationFrame(loop);
        }

        async function predict() {
            try {
                const prediction = await model.predict(webcam.canvas);
                for (let i = 0; i < maxPredictions; i++) {
                    const percentage = prediction[i].probability * 100;
                    const predictionBar = labelContainer.childNodes[i];
                    
                    predictionBar.querySelector('.label-name').textContent = prediction[i].className;
                    predictionBar.querySelector('.progress-fill').style.width = `${percentage}%`;
                    predictionBar.querySelector('.probability').textContent = `${percentage.toFixed(0)}%`;
                    
                    const progressFill = predictionBar.querySelector('.progress-fill');
                    progressFill.style.background = getProgressColor(percentage);
                }
            } catch (error) {
                console.error('Error de predicción:', error);
            }
        }

        function getProgressColor(percentage) {
            if (percentage > 80) return 'rgba(76, 175, 80, 0.9)';
            if (percentage > 50) return 'rgba(33, 150, 243, 0.9)';
            if (percentage > 30) return 'rgba(255, 193, 7, 0.9)';
            return 'rgba(244, 67, 54, 0.9)';
        }

        window.addEventListener('resize', () => {
            if (webcam) {
                webcam.canvas.style.width = window.innerWidth + 'px';
                webcam.canvas.style.height = window.innerHeight + 'px';
            }
        });


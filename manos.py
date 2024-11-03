import cv2
from inference_sdk import InferenceHTTPClient

# Initialize the Inference client
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="Nz6zxxFiBxW3zn9Gd4yx"
)

model_id = "hand-washing-tlve7/1"

# Start webcam
cap = cv2.VideoCapture(0)

while True:
    # Capture frame from webcam
    ret, frame = cap.read()
    if not ret:
        break

    # Convert frame to JPG format
    _, img_encoded = cv2.imencode('.jpg', frame)

    # Send frame to Roboflow for inference
    predictions = CLIENT.infer(img_encoded.tobytes(), model_id=model_id)

    # Draw bounding boxes for predictions
    for pred in predictions['predictions']:
        x1 = int(pred['x'] - pred['width'] / 2)
        y1 = int(pred['y'] - pred['height'] / 2)
        x2 = int(pred['x'] + pred['width'] / 2)
        y2 = int(pred['y'] + pred['height'] / 2)
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

    # Display the frame
    cv2.imshow('Webcam', frame)

    # Exit on 'q' key
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release resources
cap.release()
cv2.destroyAllWindows()
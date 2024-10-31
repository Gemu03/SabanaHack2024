from pathlib import Path
import openai

speech_file_path = Path(__file__).parent / "speech.mp3"
response = openai.audio.speech.create(
  model="tts-1",
  voice="alloy",
  input="UNO, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez.",
)
response.stream_to_file(speech_file_path)

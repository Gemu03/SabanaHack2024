from openai import OpenAI
import openai
client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "Que hay en esta imagen?"},
        {
          "type": "image_url",
          "image_url": {
            "url": "https://w7.pngwing.com/pngs/834/67/png-transparent-goku-bald-dragon-ball-anime-meme-shitpost-japanese-vegeta-character-dragon.png",
          },
        },
      ],
    }
  ],
  max_tokens=300,
)
texto = response.choices[0].message.content
print(response.choices[0].message.content)

from pathlib import Path

speech_file_path = Path(__file__).parent / "speech.mp3"
response = openai.audio.speech.create(
  model="tts-1",
  voice="echo",
  input=texto,
)
response.stream_to_file(speech_file_path)

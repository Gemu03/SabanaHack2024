from openai import OpenAI

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

print(response.choices[0].message.content)
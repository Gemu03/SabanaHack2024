from openai import OpenAI
client = OpenAI(api_key="sk-LSjlPLeieIpOTI0QB30X5l1eZcx9tWZE4WcAQFDfCFT3BlbkFJREw1jW5Dskr9Z-bTVmN8FhM23GDWotzUj4jGK3yXcA")


response = client.images.generate(
  model="dall-e-3",
  prompt="trabajador costeño colombiano",
  size="1024x1024",
  quality="standard",
  n=1,
)

image_url = response.data[0].url

print(image_url)
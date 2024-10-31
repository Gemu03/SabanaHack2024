from openai import OpenAI
client = OpenAI(api_key="sk-LSjlPLeieIpOTI0QB30X5l1eZcx9tWZE4WcAQFDfCFT3BlbkFJREw1jW5Dskr9Z-bTVmN8FhM23GDWotzUj4jGK3yXcA")


context=[
    {"role": "system", "content": "You are a helpful assistant."},
]



while True:
    user_input = input("You: ")
    context += [{"role": "user", "content": user_input}]
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=context
        
    )
    print(completion.choices[0].message.content)


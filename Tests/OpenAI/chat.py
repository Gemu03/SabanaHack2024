from openai import OpenAI
client = OpenAI()


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


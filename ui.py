import chainlit as cl

@cl.action_callback("handle_button_click")
async def handle_button_click(action):
    text = action.payload.get("message", "")
    msg = cl.Message(content=f"Button clicked with message: {text}")
    await msg.send()

@cl.on_chat_start
async def start():
    hello_world = cl.CustomElement(
        name="helloWorld",
        props = {
            "button_text": "I love you"
        }
    )

    cl.user_session.set("element", hello_world)
    await cl.Message(content="Please select the PDF files you want to upload", elements=[hello_world]).send()

    selfie_component = cl.CustomElement(
        name="selfieComponent",
        props = {
            "button_text": "Take a selfie"
        }
    )       

    cl.user_session.set("element", selfie_component)
    await cl.Message(content="Please select the PDF files you want to upload", elements=[selfie_component]).send()

@cl.on_message
async def handle(message: cl.Message):
    
    response = await cl.Message(content=f"Received message: {message.content}").send()
    
    element = cl.user_session.get("element")
    element.props["button_text"] = "Whatsup"
    await element.update()

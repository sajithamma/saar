import chainlit as cl
from chainlit.input_widget import Select, Switch, Slider


commands = [
    {"id": "Checkin", "icon": "image", "description": "Check In"},
    {"id": "Checkout", "icon": "globe", "description": "Check Out"},
    {
        "id": "Apply-Leave",
        "icon": "pen-line",
        "description": "Apply Leave",
    },
]

@cl.set_chat_profiles
async def chat_profile():
    return [
        cl.ChatProfile(
            name="GPT-3.5",
            markdown_description="The underlying LLM model is **GPT-3.5**.",
            icon="https://picsum.photos/200",
        ),
        cl.ChatProfile(
            name="GPT-4",
            markdown_description="The underlying LLM model is **GPT-4**.",
            icon="https://picsum.photos/250",
        ),
    ]

@cl.action_callback("handle_button_click")
async def handle_button_click(action):
    text = action.payload.get("message", "")
    msg = cl.Message(content=f"Button clicked with message: {text}")
    await msg.send()

@cl.action_callback("add_list")
async def add_list(action):
    group = action.payload.get("group", {})
    msg = cl.Message(content=f"List added: {group}")
    await msg.send()

@cl.action_callback("add_todo")
async def add_todo(action):
    todo = action.payload.get("todo", {})
    msg = cl.Message(content=f"Todo added: {todo}")
    await msg.send()

@cl.action_callback("toggle_todo")
async def toggle_todo(action):
    todo = action.payload.get("todo", {})
    msg = cl.Message(content=f"Todo toggled: {todo}")
    await msg.send()

@cl.on_chat_start
async def start():

    await cl.context.emitter.set_commands(commands)

    hello_world = cl.CustomElement(
        name="helloWorld",
        props = {
            "button_text": "I love you"
        }
    )

    cl.user_session.set("element", hello_world)
    await cl.Message(content="Please select the PDF files you want to upload", elements=[hello_world]).send()

    calendar_component = cl.CustomElement(
        name="calendarComponent",
        props = {
            "button_text": "I love you"
        }
    )

    cl.user_session.set("element", calendar_component)
    await cl.Message(content="Calendar", elements=[calendar_component]).send()   
    
    gallery_component = cl.CustomElement(
        name="galleryComponent",
        props = {
            "button_text": "I love you"
        }
    )

    cl.user_session.set("element", gallery_component)
    await cl.Message(content="Gallery", elements=[gallery_component]).send()

    todo_component = cl.CustomElement(
        name="todoComponent",
        props = {
            "button_text": "I love you"
        }
    )

    cl.user_session.set("element", todo_component)
    await cl.Message(content="Todo", elements=[todo_component]).send()

    youtube_component = cl.CustomElement(
        name="youtubeComponent",
        props = {
            "button_text": "I love you"
        }
    )

    cl.user_session.set("element", youtube_component)
    await cl.Message(content="Youtube", elements=[youtube_component]).send()    
    
    


    settings = await cl.ChatSettings(
        [
            Select(
                id="Model",
                label="OpenAI - Model",
                values=["gpt-3.5-turbo", "gpt-3.5-turbo-16k", "gpt-4", "gpt-4-32k"],
                initial_index=0,
            ),
            Switch(id="Streaming", label="OpenAI - Stream Tokens", initial=True),
            Slider(
                id="Temperature",
                label="OpenAI - Temperature",
                initial=1,
                min=0,
                max=2,
                step=0.1,
            ),
            Slider(
                id="SAI_Steps",
                label="Stability AI - Steps",
                initial=30,
                min=10,
                max=150,
                step=1,
                description="Amount of inference steps performed on image generation.",
            ),
            Slider(
                id="SAI_Cfg_Scale",
                label="Stability AI - Cfg_Scale",
                initial=7,
                min=1,
                max=35,
                step=0.1,
                description="Influences how strongly your generation is guided to match your prompt.",
            ),
            Slider(
                id="SAI_Width",
                label="Stability AI - Image Width",
                initial=512,
                min=256,
                max=2048,
                step=64,
                tooltip="Measured in pixels",
            ),
            Slider(
                id="SAI_Height",
                label="Stability AI - Image Height",
                initial=512,
                min=256,
                max=2048,
                step=64,
                tooltip="Measured in pixels",
            ),
        ]
    ).send()


@cl.on_settings_update
async def setup_agent(settings):
    print("on_settings_update", settings)

@cl.on_message
async def handle(message: cl.Message):
    
    response = await cl.Message(content=f"Received message: {message.content}").send()
    
    element = cl.user_session.get("element")
    element.props["button_text"] = "Whatsup"
    await element.update()

import chainlit as cl
from chainlit.input_widget import Select, Switch, Slider
from agents import Agent, Runner, function_tool
from dotenv import load_dotenv
from openai.types.responses import ResponseTextDeltaEvent


load_dotenv()


commands = [
    {"id": "Summarize", "icon": "image", "description": "Summarize"},
    {"id": "Planning", "icon": "globe", "description": "Planning"},
    {
        "id": "Manage-Tasks",
        "icon": "pen-line",
        "description": "Manage Tasks",
    },
]

@cl.set_chat_profiles
async def chat_profile():
    return [
        cl.ChatProfile(
            name="Agentic Layer",
            markdown_description="Resource Manager Agentic Layer",
            icon="https://picsum.photos/200",
        ),
        cl.ChatProfile(
            name="Report Generation",
            markdown_description="Report Generation Agent",
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

    # cl.user_session.set("element", hello_world)
    # await cl.Message(content="Please select the PDF files you want to upload", elements=[hello_world]).send()


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


@function_tool
async def show_gallery_component() -> str:
    """Show the gallery component"""
    gallery_component = cl.CustomElement(
        name="galleryComponent",
        props = {
            "button_text": "I love you"
        }
    )

    cl.user_session.set("element", gallery_component)
    await cl.Message(content="Gallery", elements=[gallery_component]).send()

    return "Gallery component shown"


@function_tool
async def show_calendar_component() -> str:
    """Show the calendar component"""
    calendar_component = cl.CustomElement(
        name="calendarComponent",
        props = {
            "button_text": "I love you"
        }
    )

    cl.user_session.set("element", calendar_component)
    await cl.Message(content="Calendar", elements=[calendar_component]).send()

    return "Calendar component shown"



@function_tool
async def show_todo_component() -> str:
    """Show the todo component"""

    todo_component = cl.CustomElement(
        name="todoComponent",
        props = {
            "button_text": "I love you"
        }
    )

    cl.user_session.set("element", todo_component)
    await cl.Message(content="Todo", elements=[todo_component]).send()

    return "Todo component shown"
    

@function_tool
async def show_youtube_component() -> str:
    """Show the youtube component"""
    youtube_component = cl.CustomElement(
        name="youtubeComponent",
        props = {
            "button_text": "I love you"
        }
    )

    cl.user_session.set("element", youtube_component)
    await cl.Message(content="Youtube", elements=[youtube_component]).send()    

    return "Youtube component shown"


agent = Agent(
    name="UI Agent",
    instructions="""You are a helpful assistant that can help with tasks and questions.
    Understand the right ui component based on the need and use tool functions to show the right component
    You need to call proper tools to trigger the right UI element for the user
    """,
    tools=[show_todo_component, show_calendar_component, show_gallery_component, show_youtube_component]
)

@cl.on_settings_update
async def setup_agent(settings):
    print("on_settings_update", settings)

@cl.on_message
async def handle(message: cl.Message):

    global agent
    
    result = Runner.run_streamed(starting_agent=agent, input=message.content)
    msg = cl.Message(content="")

    async for event in result.stream_events():
        if event.type == "raw_response_event" and isinstance(event.data, ResponseTextDeltaEvent):
            await msg.stream_token(event.data.delta)

    await msg.update()
            

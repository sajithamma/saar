import { Button } from "@/components/ui/button";

export default function MyComponent() {

    const { button_text } = props;

    const handleClick = (text) => {
        console.log("Button clicked");
        callAction({
            name: "handle_button_click",
            payload: {
                message: text
            }
        });

        sendUserMessage("Whats up?");

        updateElement({
            button_text: "I love you too"
        });

        //deleteElement();
    }
    return (
        <>
            <Button onClick={() => handleClick('I too')}>{button_text}</Button>
        </>
    )
}
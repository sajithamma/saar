# Chainlit Custom Components Demo

This project demonstrates the implementation of custom components in Chainlit with various interactive features including callbacks, actions, and dynamic updates.

## Features

- Custom React components integration with Chainlit
- Interactive button components with callbacks
- Dynamic element updates
- Action handling
- User message sending
- Element deletion capabilities

## Component Example

The project includes a sample component (`HelloWorld.jsx`) that demonstrates:

- Button click handling
- Action dispatching
- Dynamic text updates
- User message sending
- Element property updates

```jsx
// Example usage
<Button onClick={() => handleClick('I too')}>{button_text}</Button>
```

## Available Actions

The component demonstrates several Chainlit actions:

1. `callAction`: Triggers custom actions with payload
2. `sendUserMessage`: Sends messages to the chat
3. `updateElement`: Updates component properties dynamically
4. `deleteElement`: Removes the component from the UI

## API Reference

### updateElement
```typescript
updateElement: (nextProps: Record<string, any>) => Promise<{success: boolean}>;
```

### callAction
```typescript
callAction: (action: { name: string, payload: any }) => void;
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pip install chainlit
   ```
3. Run the application:
   ```bash
   chainlit run app.py
   ```

## Project Structure

```
public/
  elements/
    HelloWorld.jsx    # Custom component example
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License

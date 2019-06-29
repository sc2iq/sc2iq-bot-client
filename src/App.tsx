import React from 'react'
import './App.css'
import { DirectLine } from 'botframework-directlinejs';

const directLine = new DirectLine({
  secret: 'secret',
  domain: `//localhost:3978`,
  webSocket: false,
})

interface IMessage {
  value: string
}

const App: React.FC = () => {
  const [input, setInput] = React.useState('')
  const [messages, setMessages] = React.useState<IMessage[]>([])
  const addMessge = (m: string) => {
    const newMessage: IMessage = {
      value: m
    }
    // Add message
    setMessages(msgs => {
      msgs.push(newMessage)
      return msgs
    })
    // Clear input
    setInput('')

    directLine.postActivity({
      from: {
        id: 'myUserId',
        name: 'myUserName'
      },
      type: 'message',
      text: m
    }).subscribe(
      id => console.log("Posted activity, assigned ID ", id),
      error => console.log("Error posting activity", error)
    )
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    setInput(text)
  }

  const onKeyDownInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter': {
        addMessge(input)
      }
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h2>SC2IQ Bot Client</h2>
      </header>
      <div className="chat">
        <div className="chat-messages">
          {messages.map((m, i) =>
            <div key={i} className="chat-message">
              Message: {m.value}
            </div>
          )}
        </div>
        <div className="chat-input">
          <input type="text" value={input} placeholder="Type your message..." onChange={onChangeInput} onKeyDown={onKeyDownInput} />
        </div>
      </div>
    </div>
  );
}

export default App;

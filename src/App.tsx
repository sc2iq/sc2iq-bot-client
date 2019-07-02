import React from 'react'
import './App.css'
import WebChat, { createDirectLine } from 'botframework-webchat'

const App: React.FC = () => {
  const [token, setToken] = React.useState()
  React.useEffect(() => {
    async function getToken() {
      const res = await fetch('https://webchat-mockbot.azurewebsites.net/directline/token', { method: 'POST' });
      const { token } = await res.json()
      setToken(token)
    }

    getToken()
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h2>SC2IQ Bot Client</h2>
      </header>

      {!token
        ? <div>Getting token...</div>
        : <WebChat
          directLine={createDirectLine({
            token,
            websocket: false,
          })}
          storeKey="webchat"
        />}
    </div>
  );
}

export default App;

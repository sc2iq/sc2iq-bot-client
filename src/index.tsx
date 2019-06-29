import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'
import WebChat, { createStore, createDirectLine } from 'botframework-webchat'
import { Provider } from 'react-redux'

(async () => {
    const res = await fetch('https://webchat-mockbot.azurewebsites.net/directline/token', { method: 'POST' });
    const { token } = await res.json();
    const store = createStore();
    
    ReactDOM.render(
        <Provider store={store}>
            <WebChat
                directLine={createDirectLine({ token })}
                storeKey="webchat"
            />
        </Provider>,
        document.getElementById('webchat')
    );
})()

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

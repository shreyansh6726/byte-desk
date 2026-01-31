import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const globalStyles = `
  html, body, #root {
    margin: 0; padding: 0; width: 100%; height: 100%;
    overflow: hidden; background-color: #f8f9fa;
  }
  * { box-sizing: border-box; user-select: none; }
  input, textarea { user-select: text !important; }
  button, a { cursor: pointer !important; }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
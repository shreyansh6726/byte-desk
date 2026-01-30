import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Creating a global style tag to fix alignment and selection app-wide
const globalStyles = `
  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden; /* Prevents scrollbars on all pages */
    background-color: #f8f9fa; /* Matches your landing page bg */
  }

  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    user-select: none; /* Prevents text selection globally */
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }

  /* Critical: Allow users to type in input fields */
  input, textarea {
    user-select: text !important;
    -webkit-user-select: text !important;
    cursor: text !important;
  }

  button, a {
    cursor: pointer !important;
  }
`;

// Injecting the styles into the document head
const styleSheet = document.createElement("style");
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const stringUrl: string = window.location.href.replace("#", "?");
  const urlParser: URL = new URL(stringUrl);
  const accessToken: string | null = urlParser.searchParams.get("access_token");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>The below is an Supabase access token allows you access in the application:</p>
        <div style={{
          width: "100px",
          height: "100px",
          alignItems: 'center',
          display: 'contents'
        }}>
          <pre
            style={{
              wordBreak: "break-all",
              overflowWrap: "break-word",
              whiteSpace: 'break-spaces',
              width: '800px',
              height: '100%'
            }}
          >{accessToken}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;

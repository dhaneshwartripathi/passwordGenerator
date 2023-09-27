import { useCallback, useEffect, useRef, useState } from "react";
import './App.css'
function App() {
  const [length, setLength] = useState(6);
  const [numAllowed, setNumAllowed] = useState(false);
  const [CharAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerated = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (CharAllowed) str += "!@#$%^&*(){}?~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, CharAllowed, setPassword]);

  useEffect(() => {
    passwordGenerated();
  }, [length, numAllowed, CharAllowed, passwordGenerated]);

  const passwordRef = useRef(null); 

  const copyToClipboard=useCallback(()=> {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-10 py-4 text-orange-500 bg-gray-600">
        <h1 className="text-white text-center">Password Generator </h1>
        <div className="flex shadow rounded-lg overfow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full  py-2 my-4 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
          id="copybutton"
          onClick={copyToClipboard} 
          className="outline-none bg-blue-700 text-white px-3 py-2 my-4 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-centergap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numInput"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={CharAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Charectors</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

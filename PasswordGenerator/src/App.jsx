import { useState, useCallback, useEffect, useRef } from "react";

/*useCallback function === 
useEffect hook ===sync function 
useRef == This is a Reference hook
*/

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnop[qrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    /* passwordRef.current?.selectSelectionRange(0,4) */
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [
    length,
    numberAllowed,
    charAllowed,
    passwordGenerator,
  ]); /* for running the code*/
  return (
    <>
      <div className="w-full max-w-md px-6 py-6 mx-auto mt-10 text-lg text-orange-500 bg-gray-700 rounded-lg">
        <h1>Password Generator</h1>

        <div className="flex mb-4 overflow-hidden rounded-lg shadow">
          <input
            type="text"
            value={password}
            className="w-full px-3 py-1 outline-none"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="px-3 text-white bg-blue-700 py-0.5 shrink-0"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            ></input>
            <label className="gap-y-5">length: {length}</label>
            <input
              type="checkbox"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />{" "}
            <label className="gap-y-5">Numbers</label>
            <input
              type="checkbox"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />{" "}
            <label className="gap-y-5">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

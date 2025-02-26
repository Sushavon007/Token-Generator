import { useCallback, useEffect, useState } from "react";
import "./index.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const [token, setToken] = useState("");

  const generateToken = useCallback(()=>{
    let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let numbers = "0123456789"
    let symbols = "!@#$%^&*_+-=;:"
    let str = ""

    if(numberAllowed) alphabets+=numbers
    if(symbolAllowed) alphabets+=symbols

    for(let i=0; i<length; i++){
      let char = Math.floor(Math.random() * alphabets.length + 1)
      str += alphabets.charAt(char) 
    }
    setToken(str)

  }, [length, numberAllowed, symbolAllowed, setToken])

  useEffect(()=>{
    generateToken()
  },[length, numberAllowed, symbolAllowed, generateToken])

  return (
    <>
      <div className="bg-[#121212] text-[#fff] h-screen flex flex-col items-center p-10">
        {/* <div className=""></div> */}
        <h2 className="py-5 lg:text-3xl md:text-2xl text-xl">Token Generator</h2>
        <div className="bg-[#333] lg:p-10 p-5 gap-5 rounded-xl flex flex-col lg:w-[50%]">
          <div className="flex w-full drop-shadow-2xl">
            <input type="text" value={token} readOnly className="bg-[#555] outline-none w-[90%] px-3 p-1 rounded-l-lg"/>
            <button className="bg-[#0084ff] rounded-r-lg px-3 cursor-pointer hover:bg-[#0070da]" onClick={()=>{navigator.clipboard.writeText(token)}}>Copy</button>
          </div>
          <div className="flex lg:gap-5 gap-2 lg:flex-row flex-col">
            <div className="flex items-center gap-1  lg:flex-row md:flex-row flex-col"><input type="range" min={4} max={100} value={length} onChange={(e) => {setLength(e.target.value)}} className="cursor-pointer"/> <label> Length: {length}</label></div>
            <div><input type="checkbox" onClick={()=>{setNumberAllowed((prev) => !prev)}} className="cursor-pointer"/> <label> Numbers</label></div>
            <div><input type="checkbox" onClick={()=>{setSymbolAllowed((prev) => !prev)}} className="cursor-pointer"/> <label> Symbols</label></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

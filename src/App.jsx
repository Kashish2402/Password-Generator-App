import { useState, useCallback , useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  // const [copy, setCopy] = useState("Copy")
//REf hook
const passref=useRef(null)

  //useCallback hook helps to cache a function definition between re-renders. 
  // useCallback 
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()+}{:><~";

    for (let i = 1; i <= length; i++) {
      let char = Math.random() * str.length + 1;
      pass += str.charAt(char);
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword]);

  //COPY EFFECT
  const copyToClipboard=useCallback(()=>{
    passref.current?.select();
    passref.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
    document.querySelector('#copy').innerHTML="Copied !"
    document.querySelector('#copy').style.backgroundColor='blue'
    setTimeout(()=>{
      document.querySelector('#copy').innerHTML="Copy"
      document.querySelector('#copy').style.backgroundColor='rgb(30 58 138)'
    },6000)
    
  },[password])

  //PAGE RELOAD
  const pageReload=useCallback(()=>{
    window.navigator.vibrate(100)
    window.location.reload(false)
  })


  useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <h1
        className=
        'text-8xl text-center text-white font-black bg-green-400  p-10 font-serif subpixel-antialiased tracking-wider'
      >Password Generator</h1>

      <div
        className=
        'w-full max-w-xl mx-auto shadow-md rounded-lg px-8 py-5 my-8 text-orange-500 bg-gray-700 mt-20'
      >
        <div
          className='flex '>
          <input
            className='outline-none text-red-700 w-full py-1 px-3 rounded'
            type="text"
            value={password}
            placeholder='Password'
            readOnly
            ref={passref}
          />

          <button
            onClick={copyToClipboard}
            id='copy'
            className=
            'outline-none rounded bg-blue-900 text-white py-1 px-3 shrink-0'>
            Copy</button>
        </div>
        <div className='flex text-sm gap-x-2 my-5'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                 setLength(e.target.value) 
                }}
            />

            <label
              className='font-bold text-[1rem]'>Length: {length}</label>
          </div>
          <div
            className='flex items-center gap-x-1'>
            <input
              className='text-[2em] cursor-pointer rounded outline-none p-2'
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={(e) => { 
                setNumberAllowed((prev) => !prev) 
              }}
            />
            <label
              className='text-white font-bold '
              htmlFor="numberInput">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              className='text-[2em] cursor-pointer rounded outline-none p-2'
              type="checkbox"
              id='specialcharchters'
              defaultChecked={charAllowed}
              onChange={(e) => { 
                setCharAllowed((prev) => !prev) 
              }}
            />
            <label
              className='text-white font-bold '
              htmlFor="charinput">Special Characters</label>

              <button
              onClick={pageReload}
              className='font-bold text-xl ml-2 text-blue-400 hover:animate-spin'><i class="ri-restart-line"></i></button>
          </div>


        </div>
      </div>
    </>
  )
}

export default App

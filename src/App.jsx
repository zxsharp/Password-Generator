import { useState, useMemo, memo } from 'react'
import './App.css'
import {password} from './password.js'

function App() {

  // checkboxes
  const [smallCheck, setSmallCheck] = useState(true);
  const [capitalCheck, setCapitalCheck] = useState(true);
  const [numberCheck, setNumberCheck] = useState(true);
  const [specialCheck, setSpecialCheck] = useState(true);

  const [passwordLength, setPasswordLength] = useState(12);
  const [generatedPassword, setGeneratedPassword] = useState(password(passwordLength, smallCheck, capitalCheck, numberCheck, specialCheck));
  const [lengthErrorMessage, setLengthErrorMessage] = useState("");

  function decreaseLength(){
    if(passwordLength === 4){
      setLengthErrorMessage("Min. length is 4");
      return;
    }
    setLengthErrorMessage("");
    setPasswordLength((prevPasswordLength) => prevPasswordLength-1);
  }

  function increaseLength(){
    if(passwordLength === 64){
      setLengthErrorMessage("Max. length is 64");
      return;
    }
    setLengthErrorMessage("");
    setPasswordLength((prevPasswordLength) => prevPasswordLength+1);
  }

  // update password whenever passwordLength changes
  useMemo(() => {
    setGeneratedPassword(password(passwordLength, smallCheck, capitalCheck, numberCheck, specialCheck));
  }, [passwordLength, smallCheck, capitalCheck, numberCheck, specialCheck]);


  return (
    <>
    <div className="heading" >
      <Heading/>
    </div>
    
    <div className="description">
      <Description />
    </div>

    <div className="note">
      <Note />
    </div>

    <div className="password-container">
      <DisplayPassword generatedPassword={generatedPassword}/>
      <CopyButton generatedPassword={generatedPassword}/>
      <button onClick={() => setGeneratedPassword(password(passwordLength, smallCheck, capitalCheck, numberCheck, specialCheck))}>
        Re-Generate🔄
      </button>
    </div>

    <div className="length-container">
      <div>
        Length: 
      </div>
      <button onClick={() => decreaseLength()}>-</button>
      <input value={passwordLength} readOnly/>
      <button onClick={() => increaseLength()}>+</button>
    </div>

    <div className="length-error-message">{lengthErrorMessage}</div>

    <div className="checkbox-container">
      <label>
        <input 
          type="checkbox"
          name="abc"
          checked={smallCheck}
          onChange={() => setSmallCheck((prev) => !prev)}
        />
        abc
      </label>
      <label>
      <input 
          type="checkbox"
          name="ABC"
          checked={capitalCheck}
          onChange={() => setCapitalCheck((prev) => !prev)}
        />
          ABC
      </label>
      <label>
      <input 
          type="checkbox"
          name="123"
          checked={numberCheck}
          onChange={() => setNumberCheck((prev) => !prev)}
        />
        123
      </label>
      <label>
      <input 
          type="checkbox"
          name="@$#"
          checked={specialCheck}
          onChange={() => setSpecialCheck((prev) => !prev)}
        />
        @$#
      </label>
    </div>

    </>
  )
}


// components

const Heading = memo(() => {
  return<div>Generate Strong Passwords</div>
})

const Description = memo(() => {
  return <div>Secure your accounts by using strong, 100% randomly generated passwords. Make sure to save them.</div>
})

const Note = memo(() => {
  return <div>Note - Once you refresh the page or click Re-generate, the password will be completely lost.</div>
})

function DisplayPassword({generatedPassword}) {
  return <>
    <input type="text" value={generatedPassword} readOnly/>
  </>
}

function CopyButton({generatedPassword}){
  const [copyState, setCopyState] = useState("Copy");

  // re renderes "Copy" when generatedPassword changes
  useMemo(() => {
    setCopyState("Copy");
  }, [generatedPassword]);

  function handleOnClick(){
    navigator.clipboard.writeText(generatedPassword).then(() => {
      if(copyState == "Copy"){
        setCopyState("Copied ✅")
      }
      else{
        setCopyState("Copy")
      }
    })
  }

  return <button onClick={handleOnClick}>{copyState}</button>
}




export default App


import { useEffect } from "react"


function App() {

useEffect(()=>{
  async function featchToken(){
    const mysession = await fetch('/mysession');
    const jsonData = await mysession.json();
    console.log(jsonData)
  }
  featchToken();
},[])
  return (
    <>
      <div>
        Hello World
      </div>
    </>
  )
}

export default App

import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react';
function App() {

  const[data,setData]=useState("");
  useEffect(async()=>{
    const req = await fetch("/demo");
    const res = await req.text();
    console.log(res);
    setData(res);
  },[])
  return (
    <div className="App">
      Welcome to expense tracker!!!!
      {data && <p>{data}</p>}
    </div>
  );
}

export default App;

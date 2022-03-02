import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react';
function App() {

  const[data,setData]=useState("");
  useEffect(()=>{
    const req = await fetch("/demo");
    const res = await req.text();
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

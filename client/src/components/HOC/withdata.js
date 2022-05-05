  import React, { useEffect, useState } from "react";
function withData(WrappedComponent, requestUrl) {
    const WithFetch = (props) => {
      const [data, setData] = useState([]);
      
      useEffect(() => {
        if (requestUrl) fetchData(requestUrl);
      }, []);
      
      const fetchData = async (requestUrl) => {
        const req = await fetch(requestUrl,{
          method:"POST",
          body:JSON.stringify({month:new Date().getMonth()+1,year:new Date().getFullYear()}),
          headers : {"content-type":"application/json"}
        })
       const res = await req.json();
       setData(res);
      };
  
      return (
        <WrappedComponent
         fdata={data} 
        {...props}	
         
        />
      );
    };
  
    return WithFetch;
  }
  
  export default withData;
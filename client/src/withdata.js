import React, { useEffect, useState } from "react";
function withData(WrappedComponent, requestUrl) {
    const WithFetch = (props) => {
      const [data, setData] = useState([]);
      
      
      useEffect(() => {
        if (requestUrl) fetchData(requestUrl);
        console.log(data);
      }, []);
      
      const fetchData = async (requestUrl) => {
        
        
        try {
          const response = await fetch(requestUrl,{
          	method:"POST",
          	body:JSON.stringify({month:new Date().getMonth()+1,year:new Date().getFullYear()}),
          	headers: { 'Content-Type': 'application/json' },
          });
          if (response.ok) {
            const data = await response.json();
        	
            setData(data);
          } else {
            throw new Error("Fetch request error");
          }
        } catch (err) {
          
        }
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
import React,{useEffect, useState,useRef} from 'react';
import News from './News';

function NewsApp() {
    let [newsList,setNewsList]=useState([]);
    let [query,setQuery]=useState("tesla");

    const apiKey='cfa7883e8089440387e462d78ce445c9';
    const apiUrl=`https://newsapi.org/v2/everything?q=${query}&from=2023-06-09&sortBy=publishedAt&apiKey=${apiKey}`; 
    let reference=useRef(null);

    useEffect(()=>
    {
            fetchData();
    },[query]);


    async function fetchData()
    {
        try {
            const response=await fetch(apiUrl);
            const jsonData=await response.json();
            setNewsList(jsonData.articles);
        } 
        
        catch (error) {
            alert("some error occured");
        }
       

    }
    function handleSubmit(event)
    {
        event.preventDefault();
        let input=reference.current.value;
        setQuery(input);
    }
    let appStyle=
    {
        marginLeft:"5%",
        marginTop:"2.5%",
        display:"grid",
        gridTemplateColumns:"repeat(3,30%)",
        gap:"20px",
       
        
        // justifyContents:"space-between",
    }
    let formStyle=
    {
        // border:"2px solid black",
        width:"20%",
        marginLeft:"40%",
        padding:"20px",
    }
  return (
    <div>
        <div style={{backgroundColor:"rgb(5, 51, 51)",height:"180px"}}>
        <form style={formStyle} onSubmit={handleSubmit}>
            <label><h2 style={{color:'bisque'}}>News Daily </h2></label>
        <input style={{width:"100%",height:" 30px",padding:"10px"}} type="text" ref={reference} placeholder='search the topic here...'/>
        <button style={{margin:"15px 15px 15px 15px",padding:"2px 2px 2px 2px",height:"30px",width:"60px",}} onClick={handleSubmit}> Search </button>
        </form>
        </div>
        
     <div style={appStyle}>
         {newsList.map((news)=>
        {
            // return <News news={news}/>
           return <News key={news.url} news={news}/>
        })}
        
        </div>
    </div>
  )
}

export default NewsApp;
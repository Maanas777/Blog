import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PostCard from './postCard'
import axios from 'axios';
const DisplayPost = () => {


    const downloadBlog = () => {
        // Make a GET request to the API endpoint for downloading blogs
        axios({
          method: 'get',
          url: 'http://localhost:7000/api/blog/downloadAll',
          responseType: 'blob', 
        })
          .then((response) => {
            // Handle the successful response
            const blob = new Blob([response.data], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'blogs.csv'; // Set the desired file name here
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          })
          .catch((error) => {
            // Handle errors
            console.error('Error downloading blogs:', error);
          });
      }




    const [posts, setPosts] = useState([])
    
    useEffect(()=>{
        const fetchData = async () => {
            const res = await fetch("http://localhost:7000/api/blog/", {
                method: "GET",
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            const data = await res.json()
            if(res.ok){
                setPosts(data)
                // console.log(data);
            }else{
                console.log(data);
            }
        }
        fetchData()
    }, [posts])

   

    return (
        <Box sx={{ maxWidth: "600px", display: "flex", flexDirection: "column", margin: "auto", gap: 3, py:2 }}>
             <button
  onClick={downloadBlog}
  style={{
    backgroundColor: '#6483a1', 
    color: 'white',          
    width: '100px',          
    padding: '8px 16px',    
    border: 'none',          
    borderRadius: '4px',   
    cursor: 'pointer',       
  }}
>
  Download all Blogs
</button>
            {posts && posts.map(post=>(
                <PostCard post={post} key={post._id} />
            ))}
        </Box>
    )


}

export default DisplayPost
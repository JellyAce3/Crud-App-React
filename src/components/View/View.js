import React, { useState, useEffect } from "react";
import axios from "axios";//HTTP request : 
import { Link,useParams } from "react-router-dom";//Imports the Link component and useParams hook from react-router-dom for navigation and accessing URL parameters.

function View() {
    const [data, setData]= useState([])
    const {id}=useParams();
//the useEffect hook is used to fetch contact data from server based on the provided 'id' parameter mounts
    useEffect (() => {
        axios.get('http://localhost:4000/contact/'+id)
        .then(res=> setData(res.data))
        .catch(err => console.log(err))

    }, [id]) //the effect will be triggered whenever any independencies listed in array change

    return (
        <div className="
        d-flex 
        w-100 
        vh-100 
        justify-content-center 
        align-items-center
        " >
            <div className="
            w-90
            border
            bg-light
            p-5 me-2" style={{borderRadius:"10px"}}>
                <div>
                    <header style={{textAlign:"center", backgroundColor:"#FFE5F4", color:"black", fontSize:"20px", marginBottom:"15px", padding:"5px", borderRadius:"5px", justifyContent:"space-around"}}>Contact
                    </header>
                </div>
                <div className="mb-3">
                    <strong>Name: {data.name}</strong> {/*retrieved details will be display */}
                </div>
                <div className="mb-3">
                    <strong>Number: {data.number}</strong>
                </div>
                <div className="mb-3">
                    <strong>Email: {data.email}</strong>
                </div>
                <div style={{margin:"0px 65px"}}>
                <Link 
                  to={`/update/${id}`}
                  className="btn btn-success" style={{backgroundColor:"#E6D7FF", color:"black"}}>Edit</Link> {/* link is used to create a portal...*/}
                <Link 
                  to={'/'}
                  className="btn btn-primary ms-3" style={{backgroundColor:"#E6D7FF", color:"black"}}>Back</Link>
                </div>
            </div>

        </div>
    )
}

export default View


// for viewing the contact list
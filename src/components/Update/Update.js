import axios from "axios";//for making HTTP request
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function Update () {

    const {id}=useParams();// uses the useParams hook to extract the 'id' parameter from the URL
    const navigate=useNavigate() //TELEPORT TIME NA!!! WEEEE!!!
    const[data, setData]=useState ([]) //initialize a state variable 'data' to stare the contact info

    //Defines the Input function that updates the data state based on user input. 
    //It uses the spread operator to update the corresponding field based on the name attribute of the input
    function Input (e) {
        const trial = {...data, [e.target.name]: e.target.value}
        setData(trial)
    }
    // get the data for update
    //hook to fetch existing contact data from the server based on the id parameter. 
    //The retrieved data is then stored in the data state.
    useEffect(()=> {
        axios.get('http://localhost:4000/contact/' +id)
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    },[id])
     //a function to handle submission,once the required data are all inputted 
    //it sends PUT to the server using axios 
    //display success alert and navigates back to homepage  
    function handleSubmit(event) {
        event.preventDefault()
        if(
            data.name === "" || 
            data.number === "" ||
            data.email ===""){
                alert("All the fields are mandatory!");
                return;
            }
        if(
            !/^\S+@\S+\.\S+$/.test(data.email)) {
                alert('Invalid email format');
                return;
              }
        if(
            !/^\d+$/.test(data.number)){
                alert('Invalid Number');
                return;
            }
        // put data to json server
        axios.put('http://localhost:4000/contact/' +id , data)
        .then(res => {
            alert ("Successfully Updated")
            navigate('/')
        },[])
    }
    return (

        <div 
        className="
        d-flex 
        w-100 
        vh-100 
        justify-content-center 
        align-items-center">
            <div className="
            w-50
            border
            bg-light
            p-5" style={{borderRadius:"10px"}}>
                {/* onSubmit event to trigger th 'handleSubmit' function when the form is submitted */}
                <form onSubmit={handleSubmit}>
                <div>
                    <label >Name:</label>
                    {/*input element: pre-filled  with contact data from 'data' state allowing the user to edit the info
                    onChange: event handlers call the 'input' function to update the 'data' state as user types  */}
                    <input
                    type="text"
                    name="name"
                    value={data.name}
                    className="form-control"
                    onChange={Input}/>
                    <label >Number:</label>
                    <input
                    type="text"
                    name="number"
                    value={data.number}
                    className="form-control"
                    onChange={Input}/>
                    <label >Email:</label>
                    <input
                    type="text"
                    name="email"
                    value={data.email}
                    className="form-control"
                    onChange={Input}/>
                </div>
                {/* triggers the form submission when clicked*/}
                <button className="btn btn-info"style={{marginTop:"10px", backgroundColor:"#E6D7FF"}}>Submit</button>
                </form>
            </div>
        </div>
    )
}
export default Update;

//for editing contact information
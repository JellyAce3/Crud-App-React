import React,{useState} from "react";
import axios from "axios"; //for making Http request
import { useNavigate } from "react-router-dom"; //like a portal to another pages

function Add() {
    //create state variable with initial values
    const [inputData, setInputData]= useState({
        name:'',
        number:'',
        email:''
})

    const navigate=useNavigate(); 
    //a function to handle submission,once the required data are all inputted 
    //it sends POST to the server using axios 
    //display success alert and navigates back to homepage  
    function handleSubmit(event){
        event.preventDefault()
        if(
            inputData.name === "" || 
            inputData.number === "" ||
            inputData.email ===""){
                alert("All the fields are mandatory!");
                return;
            }
        if(
            !/^\S+@\S+\.\S+$/.test(inputData.email)) {
                alert('Invalid email format');
                return;
              }
        if(
            !/^\d+$/.test(inputData.number)){
                alert('Invalid Number');
                return;
            }
      

        axios.post('http://localhost:2828/contact', inputData)
        .then(res => {
            alert("Data Added Successfully!")
            navigate('/')
        }).catch(err => console.log)


    
    

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
                {/* onSubmit: handleSubmit function for submitted*/}
                <form onSubmit={handleSubmit}>
                <div>
                    <label >Name:</label>
                {/* input: element for fields. onChange: to update the state using spread operator and set corresponding fields value*/}
                    <input
                    type="text"
                    name="name"
                    
                    className="form-control"
                    onChange={e=>setInputData({
                        ...inputData,
                        name: e.target.value
                    })}/>
                    <label >Number:</label>
                    <input
                    type="text"
                    name="number"
                    className="form-control"
                    onChange={e=>setInputData({
                        ...inputData,
                        number: e.target.value
                    })}/>
                    <label >Email:</label>
                    <input
                    type="text"
                    name="email"
                    className="form-control"
                    onChange={e=>setInputData({
                        ...inputData,
                        email: e.target.value
                    })}/>
                </div>
                <button className="btn btn-info"style={{marginTop:"10px", backgroundColor:"#E6D7FF"}}>Submit</button>
                </form>
            </div>
        </div>
    )
}
export default Add //exports the Add component as default export of the module

// for adding contact information
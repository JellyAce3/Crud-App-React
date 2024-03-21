import axios from "axios"; //HHTP request
import React, { useEffect, useState } from "react"; //from react library
import { Link } from "react-router-dom"; //for creating navigation link

function App() {
  const [records, setRecords] = useState([]); //initializes a state variasble 'record' to store the contacts records.
  // const navigate=useNavigate();
  //useEffect hook is used to fetch contact records from the server when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:4000/contact`) //retrieve contact data
      .then((res) => {
        console.log(Object.keys(res.data[0])); // to get an array of keys from the first object within data array of the response.
        setRecords(res.data);
      });
  }, []);
  // for delete
  const getData = () => {
    axios
      .get(`http://localhost:4000/contact/`) // the function makes a GET request to reload contact record after a deletion
      .then((getData) => {
        setRecords(getData.data);
      });
  };
  const handleSubmit = (id) => {
    axios
      .delete(`http://localhost:4000/contact/${id}`) //funvtion is called when the 'delete' button is clicked.
      .then(() => {
        //it sends a 'delete' request to the server to remove a contact byt its 'id'
        //and and then it calls get data to reload the updated records
        getData();
      });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex w-70 vh-100 justify-content-center align-items-center">
        <div className="border bg-lightp-5">
          <div
            style={{
              justifyContent: "space-between",
              backgroundColor: "cornsilk",
              display: "flex",
              padding: "10px",
            }}
          >
            <header>
              <h3> Contact Manager</h3>
              <Link
                to="/create"
                className="btn btn-primary"
                style={{ marginLeft: "550px" }}
              >
                Add +
              </Link>
            </header>
          </div>

          <table className="table">
            {" "}
            {/* a table is rendered to display the contact records */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Number</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{ border: "none", backgroundColor: "blue" }}>
              {/* function is used to iterate over 'records' state and render each contact record in table row */}
              {records.map((d, i) => (
                <tr key={i}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.number}</td>
                  <td>{d.email}</td>
                  <td>
                    <Link
                      to={`/update/${d.id}`}
                      className="btn btn-sm ms-1 btn-success"
                      style={{ width: "70px" }}
                    >
                      Update
                    </Link>{" "}
                    {/*is used to create navigation links for adding, updating and viewing contact records */}
                    <button
                      onClick={(e) => handleSubmit(d.id)}
                      className="btn btn-sm ms-1 btn-danger"
                      style={{ width: "70px" }}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/read/${d.id}`}
                      className="btn btn-sm  btn-info ms-1"
                      style={{ width: "70px" }}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default App;

// to implement a contact manager application

import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";// for Routing
import Add from "../Create/Add"; // statement for various component
import NotFound from "../PagenotFound/Error";
import '../../App.css'; 
import App from "../Details/App";
import View from "../View/View";
import Update from "../Update/Update";

function AppRouter() {

    return (
            <BrowserRouter > {/*used to wrap the routing config */}
                <Routes> {/*wraps the 'Route */}
                    {/*path specifies the URL path for which the corresponding component should be rendered.  */}
                    {/*The element prop in each Route specifies the React component that should be rendered when the URL matches the specified path. */}
                    <Route path='/' element={<App />} /> {/*main page */}
                    <Route path='/create' element={<Add />}/>{/*Adding New Contact*/}
                    <Route path='/update/:id' element={<Update />}/>{/* Updating Contact*/}
                    <Route path='/read/:id' element={<View />}/>{/* View Contact*/}
                    <Route path="/notfound" element={<NotFound />}/>{/* 404 error page*/}
                     
                </Routes>
            </BrowserRouter>
        
        
    )
}

export default AppRouter

// It defines routes for different parts of your application and maps those routes to corresponding components
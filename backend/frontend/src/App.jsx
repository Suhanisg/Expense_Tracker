import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Login from './pages/Auth/Login.jsx';
import SignUp from './pages/Auth/SignUp.jsx';
import Home from "./pages/dashboard/Home.jsx";
import Income from "./pages/dashboard/Income.jsx";
import Expense from "./pages/dashboard/Expense.jsx";
import UserProvider from "./context/userContext.jsx";
import {Toaster} from "react-hot-toast";

const App = () => {
    return(
        <UserProvider>
            <div>
                <Router>
                    <Routes>
                        <Route path="/" element={<Root/>}/>
                        <Route path="/login" exact element={<Login/>}></Route>
                        <Route path="/signup" exact element={<SignUp/>}></Route>
                        <Route path="/dashboard" exact element={<Home/>}></Route>
                        <Route path="/income" exact element={<Income/>}></Route>
                        <Route path="/expense" exact element={<Expense/>}></Route>
                    </Routes>

                </Router>
            </div>

            <Toaster
                toastOptions={{
                    className:"",
                    style: {
                        fontSize: "13px"
                    },
                }}
            />
        </UserProvider>
    )
}
export default App;

const Root = () => {

    const isAuthenticated = !!localStorage.getItem('token');

    return isAuthenticated ? (
        <Navigate to="/dashboard" />
    ):(
        <Navigate to="/login" />
    );
};
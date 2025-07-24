import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
import Login from './pages/Auth/Login.jsx';
import SignUp from './pages/Auth/SignUp.jsx';
import Home from "./pages/dashboard/Home.jsx";
import Income from "./pages/dashboard/Income.jsx";
import Expense from "./pages/dashboard/Expense.jsx";
import UserProvider from "./context/userContext.jsx";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer/Footer.jsx";


const App = () => {
    return (
        <UserProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <div className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Root />} />
                            <Route path="/login" exact element={<Login />} />
                            <Route path="/signup" exact element={<SignUp />} />
                            <Route path="/dashboard" exact element={<PageWithFooter><Home /></PageWithFooter>} />
                            <Route path="/income" exact element={<PageWithFooter><Income /></PageWithFooter>} />
                            <Route path="/expense" exact element={<PageWithFooter><Expense /></PageWithFooter>} />
                        </Routes>
                    </div>
                </div>
            </Router>

            <Toaster
                toastOptions={{
                    className: "",
                    style: {
                        fontSize: "13px"
                    },
                }}
            />
        </UserProvider>
    );
};

export default App;

const Root = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

// ✅ This will wrap only pages that need a footer
const PageWithFooter = ({ children }) => {
    const location = useLocation();
    const hideFooterOn = ['/login', '/signup'];

    return (
        <>
            {children}
            {!hideFooterOn.includes(location.pathname) && <Footer />}
        </>
    );
};

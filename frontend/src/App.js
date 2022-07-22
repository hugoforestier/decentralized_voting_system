import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Error404 from "./Error404/Error404";
import Landing from "./Landing/Landing";
import LoginForm from "./Login/LoginForm";

function App() {
    return (
        <div className="App">
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route exact path="/login" element={<LoginForm />} />
                    <Route exact path="/404/" element={<Error404 />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

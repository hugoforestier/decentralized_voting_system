import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../GenericComponents/Auth/Auth";
import "./LoginForm.css";

const Login = ({ history }) => {
    const handleLogin = useCallback(
        async (event) => {
            /*event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }*/
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Navigate to="/" />;
    }

    return (
        <div
            className="background-image"
            style={{ backgroundImage: "url(/mountains.jpg)" }}
        >
            <div className="container-login">
                <h3 className="login-text">Login Now.</h3>
                <form onSubmit={handleLogin}>
                    <div className="font-email">
                        <input
                            className="email-login"
                            name="email"
                            type="email"
                            placeholder="Email"
                        />
                        <i>
                            <FontAwesomeIcon
                                icon="envelope"
                                color="white"
                                size="sm"
                                opacity="50%"
                            />
                        </i>
                    </div>
                    <div className="font-password">
                        <input
                            className="password-login"
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                        <i>
                            <FontAwesomeIcon
                                icon="lock"
                                color="white"
                                size="sm"
                                opacity="50%"
                            />
                        </i>
                    </div>
                    <p id="message-create-account">
                        Don't have an account ? <a href="/signup">Create one</a>
                    </p>
                    <button className="button-login" type="submit">
                        LOGIN
                    </button>
                    <hr className="separator" />
                    {/* <img className="area-montains" src={process.env.PUBLIC_URL + '/area-logo/vector/montagne.svg'} alt="logo" /> */}
                </form>
            </div>
        </div>
    );
};

// withRouter ?
export default Login;

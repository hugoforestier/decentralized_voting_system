import Button from "@material-ui/core/Button";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

class Landing extends Component {
    state = {};
    render() {
        return (
            <div>
                <h1 className="landing-title">Dashboard</h1>
                <Button
                    component={Link}
                    to="./404"
                    variant="contained"
                    color="secondary"
                >
                    CLICK
                </Button>
            </div>
        );
    }
}

export default Landing;

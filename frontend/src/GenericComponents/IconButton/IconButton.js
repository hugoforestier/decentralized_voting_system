import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const IconButton = (props) => {
    var divStyle = {
        height: "150px",
        borderRadius: "100%",
        backgroundColor: "black",
        width: "150px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "4vw",
        color: "white",
    };

    if (props.bgColor !== undefined) divStyle.backgroundColor = props.bgColor;
    if (props.iconColor !== undefined) divStyle.color = props.iconColor;

    if (props.size === "mid") {
        divStyle.height = "75px";
        divStyle.width = "75px";
        divStyle.fontSize = "2vw";
    } else if (props.size === "small") {
        divStyle.height = "30px";
        divStyle.width = "30px";
        divStyle.fontSize = "1vw";
    }
    return (
        <div
            className={`icon-button-container ${props.className}`}
            onClick={props.onClick}
            style={divStyle}
        >
            <FontAwesomeIcon icon={props.icon} />
        </div>
    );
};

export default IconButton;

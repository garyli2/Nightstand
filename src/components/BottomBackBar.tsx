import { Typography } from "@material-ui/core";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { goBack } from "../pages/utils";

export default () => {
    return <div className="backBarContainer" onClick={goBack}>
        <IoMdArrowRoundBack color="white" size={50} />
        <Typography style={{ color: 'white', fontWeight: 'bold' }} variant="h5">
            Go Back
        </Typography>
    </div>;
};

import React from "react";
import Form from "../components/common/form";
import Joi from "joi-browser";
import {Link} from "react-router-dom";

export default function ForgotPassword(){

    const sendOTP = (number)=>{
        alert(number)
    }


    const inputs = [{
        name: "phone",
        type: "text",
        icon: "mobile-phone",
        placeholder: "Type phone number",
        action: sendOTP,
        actionText: "OTP",
        actionValidationSchema: {phone: Joi.string().min(6).max(10).required().label("Phone number")}
    },{
        name: "code",
        type: "text",
        icon: "envelope",
        placeholder: "Type OTP"
    },{
        name: "password",
        type: "password",
        icon: "key",
        placeholder: "New password"
    },{
        name: "conform_password",
        type: "password",
        icon: "key",
        placeholder: "Conform password"
    }];

    const schema = {
        phone: Joi.string().min(6).max(10).required(),
        code: Joi.string().min(6).max(6).required(),
        password: Joi.string().min(6).max(50).required(),
        conform_password: Joi.string().min(6).max(50).required()
    };

    const makeReset = (data)=>{
        console.log(data)
    }

    const links = <div>
        <Link to={"/"} className={"link"}>I know the password.</Link>
        <br/>
        <Link to={"/signup"} className={"link"}>Create new account</Link>
    </div>

    return <div>
        <br/>
        <Form inputsData={inputs} schema={schema} submitFunction={makeReset} title={"Login"} submitBtn={"Login"} links={links}/>
    </div>
}
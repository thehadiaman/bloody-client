import React from "react";
import Form from "../components/common/form";
import Joi from "joi-browser";

export default function Signup(){

    const inputs = [{
        name: "country_code",
        type: "text"
    },{
        name: "phone",
        type: "number",
        icon: "mobile-phone",
        placeholder: "Type phone number"
    },{
        name: "name",
        type: "text",
        icon: "user",
        placeholder: "Type your name"
    },{
        name: "password",
        type: "password",
        icon: "key",
        placeholder: "Type password"
    }];

    const schema = {
        country_code: Joi.string().min(2).max(5).required(),
        country: Joi.string().min(1).max(20).required(),
        phone: Joi.string().min(6).max(50).required(),
        name: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(6).max(50).required()
    };

    const makeSignup = (data)=>{
        console.log(data)
    }

    return <div>
        <br/>
        <Form inputsData={inputs} schema={schema} submitFunction={makeSignup} title={"Signup"} submitBtn={"Signup"} />
    </div>
}
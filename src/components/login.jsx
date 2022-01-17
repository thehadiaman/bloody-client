import React from "react";
import Form from "../components/common/form";
import Joi from "joi-browser";

export default function Login(){

    const inputs = [{
        name: "phone",
        type: "number",
        icon: "mobile-phone",
        placeholder: "Type phone number"
    },{
        name: "password",
        type: "password",
        icon: "key",
        placeholder: "Type password"
    }];

    const schema = {
        phone: Joi.string().min(6).max(50).required(),
        password: Joi.string().min(6).max(50).required()
    };

    const makeLogin = (data)=>{
        console.log(data)
    }

    return <div>
        <br/>
        <Form inputsData={inputs} schema={schema} submitFunction={makeLogin} title={"Login"} submitBtn={"Login"} />
    </div>
}
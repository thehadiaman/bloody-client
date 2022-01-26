import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import { Icon, InputGroup, Button, Intent } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import {FormHelperText, Grid} from "@mui/material";
import CountryCode from "./country-code";

export default function Form({inputsData, schema, submitFunction, title, submitBtn, links}){
    const [data, setData] = useState({});
    const [inputs, setInputs] = useState([]);
    const [focus, setFocus] = useState(null);
    const [showPasswordNames, setShowPasswordNames] = useState([]);

    useEffect(()=>{
        function makeInput(){
            setInputs(inputsData);
        }
        makeInput();
    }, [inputsData])

    const handleEyeClick = (name)=>{
        const copyOfShowPasswordNames = [...showPasswordNames];
        const index = copyOfShowPasswordNames.indexOf(name)
        if(copyOfShowPasswordNames.includes(name)) copyOfShowPasswordNames.splice(index, 1)
        else copyOfShowPasswordNames.push(name)
        setShowPasswordNames(copyOfShowPasswordNames)
    }

    const selectDialCode = (code, country) => {
        data['country_code'] = code;
        data['country'] = country;
        setData(data);
    }

    const eyeButton = (name) => {
        return <Tooltip2 content={`${showPasswordNames.includes(name) ? "Hide" : "Show"} Password`} position={"right"}>
            <Button
                icon={showPasswordNames.includes(name) ? "unlock" : "lock"}
                intent={showPasswordNames.includes(name) ? Intent.WARNING : Intent.SUCCESS}
                minimal={true}
                onClick={()=>handleEyeClick(name)}
            />
        </Tooltip2>
    }

    const handleChange = ({ name, value })=>{
        const copyOfInputs = [...inputs];
        const input = copyOfInputs.find(input=>input.name===name);
        input.error = false;
        setInputs(copyOfInputs);
        const copyOfData = {...data};
        copyOfData[name] = value;
        setData(copyOfData);
        setFocus(name)
    }

    const validate = ()=>{
        return Joi.validate(data, schema, {abortEarly: false})
    }

    const setError = (error) => {
        const copyOfInputs = [...inputs];
        for(let item of error.details){
            const input = copyOfInputs.find(input=>input.name===item.path[0]);
            input.error = item.message;
            const index = copyOfInputs.indexOf(input);
            console.log(input)
            copyOfInputs[index] = input;
        }
        setInputs(copyOfInputs);
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const {error} = validate();
        if(error){
            setError(error)
        }else{
            submitFunction(data)
        }
    }

    const actionValidation = (name, schema, action)=>{
        const inputValue = {[name]: data[name]}
        const {error} =  Joi.validate(inputValue, schema)
        if(error){
            setError(error)
            return;
        }
        action(data[name])
    }

    const inputAction = (name, text, schema, action)=>{
        return <Button onClick={()=>actionValidation(name, schema, action)}>OTP</Button>
    }

    return <Grid container columnSpacing={{lg: 12, md: 12, sm: 12, xs: 12}}>
        <Grid item lg={3} md={3} sm={2} xs={0}/>
        <Grid item lg={6} md={6} sm={8} xs={12}>
            <form onSubmit={handleSubmit}>
                <h1 style={{color: "white"}}>{title}</h1>
                {
                    inputs.map(input=><div key={Math.random()}>
                        {(input.name==="country_code")&&<CountryCode onSelect={selectDialCode} defaultDial={data.country||"Select"} defaultText={data.country_code||"Country"} />}
                        {(input.name!=="country_code")&&<InputGroup
                            large={true}
                            name={input.name}
                            autoFocus={input.name === focus}
                            value={data[input.name]}
                            leftElement={<Icon icon={input.icon}/>}
                            onChange={({target}) => handleChange(target)}
                            placeholder={input.placeholder}
                            rightElement={(input.type === "password" ? eyeButton(input.name): (input.action ? inputAction(input.name, input.actionText, input.actionValidationSchema, input.action): null))}
                            type={showPasswordNames.includes(input.name) ? "text" : (input.type === "password" ? "password" : input.type)}
                        />}
                        {input.error&&<FormHelperText style={{color: 'red'}}>{input.error}</FormHelperText>}
                        <br/>
                    </div>)
                }
                <Button intent={"success"} rightIcon={"arrow-right"} text={submitBtn} type={"submit"} />
                {links&&<div className={"link-right-side"}>{links}</div>}
            </form>
        </Grid>
        <Grid item lg={3} md={3} sm={2} xs={0}/>
    </Grid>
}
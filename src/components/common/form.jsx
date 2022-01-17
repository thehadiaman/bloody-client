import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import { Icon, InputGroup, Button, Intent } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import {FormHelperText, Grid} from "@mui/material";
import CountryCode from "./country-code";

export default function Form({inputsData, schema, submitFunction, title, submitBtn}){
    const [data, setData] = useState({});
    const [inputs, setInputs] = useState([]);
    const [focus, setFocus] = useState(null);
    const [showPassword, setShowPassword] = useState(null);
    useEffect(()=>{
        function makeInput(){
            setInputs(inputsData);
        }
        makeInput();
    }, [inputsData])

    const handleEyeClick = ()=>{
        setShowPassword(!showPassword)
    }

    const selectDialCode = (code, country) => {
        data['country_code'] = code;
        data['country'] = country;
        setData(data);
    }

    const eyeButton = (
        <Tooltip2 content={`${showPassword ? "Hide" : "Show"} Password`} position={"right"}>
            <Button
                icon={showPassword ? "eye-open" : "eye-off"}
                intent={showPassword? Intent.WARNING: Intent.SUCCESS}
                minimal={true}
                onClick={handleEyeClick}
            />
        </Tooltip2>
    );

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

    const handleSubmit = (e)=>{
        e.preventDefault()
        const {error} = validate();
        if(error){
            const copyOfInputs = [...inputs];
            for(let item of error.details){
                const input = copyOfInputs.find(input=>input.name===item.path[0]);
                input.error = item.message;
                const index = copyOfInputs.indexOf(input);
                copyOfInputs[index] = input;
            }
            setInputs(copyOfInputs);
        }else{
            submitFunction(data)
        }
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
                            rightElement={input.type === "password" && eyeButton}
                            type={showPassword ? "text" : (input.type === "password" ? "password" : input.type)}
                        />}
                        {input.error&&<FormHelperText style={{color: 'red'}}>{input.error}</FormHelperText>}
                        <br/>
                    </div>)
                }
                <Button intent={"success"} rightIcon={"arrow-right"} text={submitBtn} type={"submit"} />
            </form>
        </Grid>
        <Grid item lg={3} md={3} sm={2} xs={0}/>
    </Grid>
}
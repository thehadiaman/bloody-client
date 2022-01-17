import React, {useEffect, useState} from "react";
import {getCountryListMap} from "country-flags-dial-code";
import MenuList from "./menu";
import Pop from "./popover";


async function getCodes(){
    const countriesArray = [];
    const countries = await getCountryListMap();
    const keys = Object.keys(countries);

    for(let key of keys){
        countries[key].text = countries[key]['country'];
        countries[key].icon = <p>{countries[key]['dialCode']}</p>;
        countriesArray.push(countries[key]);
    }
    return countriesArray;
}

export default function CountryCode({ onSelect, defaultText, defaultDial }){
    const [countries, setCountries] = useState([]);
    const [selected, setSelected] = useState(defaultText);
    const [dialCode, setDialCode] = useState(defaultDial);

    useEffect(()=>{
        async function setCodes(){
            const countries = await getCodes();
            setCountries(countries);
        }
        setCodes().then(()=>{});
    }, [])

    const handleSelect = (item) => {
        setSelected(item['dialCode']);
        setDialCode(item['country']);
        onSelect(item['dialCode'], item['country']);
    }

    const menuContent = <MenuList list={countries} search={true} action={handleSelect} />

    return <Pop text={selected} className={"fill-it"} icon={<span>{dialCode}</span>} content={menuContent} />
}

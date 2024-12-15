import {useEffect, useState} from "react"


function useForm({initialValue, validate}){
    const [values,setValues]=useState(initialValue)
    const [touched,setTouched]=useState({})
    const [errors,setErrors]=useState({})

    const handleChangeInput = (name:string,value:number)=>{
        setValues({
            ...values,
            [name]:value
        });
    }

    const handleBlur=(name:string)=>{
        setTouched({
            ...touched,
            [name]: true
        })
    }

    const getTextInputProps=(name:string)=>{
        const value=values[name];
        const onChange=(event)=>handleChangeInput(name,event.target.value);
        const onBlur=()=>handleBlur(name);

        return {value,onChange,onBlur}
    }

    useEffect(()=>{
        const newError=validate(values);
        console.log(newError);
        setErrors(newError);
    }, [validate, values])


    return {values,errors,touched, getTextInputProps}
}

export default useForm;
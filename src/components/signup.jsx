import React, { useRef } from "react"
import { Redirect} from "react-router"
import { getData } from "../hooks/data"
export default function SignUp(){
    const {data:userData, setData:setUserData} = getData(true)
    const first_name = useRef()
    const last_name = useRef()
    const nick_name = useRef()
    const password = useRef()
    const dateForm = useRef()
    onsubmit = e => {
        e.preventDefault()
        return fetch('http://localhost:9000/login',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                first_name: first_name.current.value,
                last_name: last_name.current.value,
                nick_name: nick_name.current.value,
                password: password.current.value
            })
        })
        .then(data=>data.json())
        .then(value=>setUserData(value) || localStorage.setItem('token',value?.token))
        .then(()=>document.location.href = '/')
        .catch(error=>console.log(error))
    }
    if(userData.token)return <Redirect to='/'/>
    return (
        <div className='text-center container d-flex justify-content-center'>
            <form onSubmit={onsubmit} ref={dateForm} className="border" >
                <div className="w-75 mx-auto">
                    <i className="fa d-flex justify-content-around fa-twitter text-info fa-4x" aria-hidden="true"></i>
                    <p className="h2">Create an account</p>
                </div>
                <div className="w-75 mx-auto"> 
                    <input ref={first_name} type="text" className='form-control p-3 my-3 fs-5' placeholder='First_name'/>
                    <input ref={last_name} type="text" className='form-control p-3 my-3 fs-5' placeholder='Last_name' />
                </div>
                <div className="w-75 mx-auto">
                    <input ref={nick_name} type="text" autoComplete="username" className='form-control p-3 my-3 fs-5' placeholder='Nick_name*' required />
                    <input ref={password} type="password" autoComplete="current-password" className='form-control p-3 my-3 fs-5' placeholder='Password*' required />
                </div>
                <div className="my-4 mx-auto">
                    <div className="h5 fw-bold w-75"></div>
                    <input type='submit' value="Signup" className=' mx-auto d-block rounded btn btn-primary w-75' readOnly form={dateForm.current}/>    
                </div>
            </form> 
        </div>
    )
}

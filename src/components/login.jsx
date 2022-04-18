import React,{ useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { getData } from '../hooks/data';

const Login = () => {
    const { data, setData } = getData(true)
    const password = useRef()
    const nick_name = useRef()
    const login_fetch = e => {
        e.preventDefault()
        return fetch(`http://localhost:9000/login?nick_name=${nick_name.current.value}&password=${password.current.value}`)
        .then(data=>data.json())
        .then(value=>localStorage.setItem('data',JSON.stringify(value)) || setData(value) || <Redirect to="/"/>)
        .then(()=>document.location.href = '/')
    } 
    if(data.token)return <Redirect to='/'/>
    return (
        <form onSubmit={login_fetch} className='text-center container d-flex justify-content-center'>
            <div className='card px-2 py-4 w-50'>
            <img src="../logo192.png" alt="" className='w-25 mx-auto' />
                <div className='w-75 mx-auto' >
                <div className="">
                <p className="h2">Log in to continue...</p></div>
                <input ref={nick_name} type="text" autoComplete="username" className='form-control ml-5 p-3 my-3 fs-5 w-75' placeholder='Nickname' required/>
                <input ref={password} type="password" autoComplete="current-password" className='form-control ml-5 p-3 my-3 fs-5 w-75' placeholder='Password' required/>
                <input type="submit" value="Log in" className='btn btn-primary' />
            </div>
        </div>
    </form>
    );
}

export default Login;

import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import logo from "./assets/shopify_logo_whitebg.svg";
export default function SigninPage(){
    const navigate = useNavigate();
    
    const [formdata,setFormdata] = useState({
      email:"",
      password:"",
      shop:""
    })
    function submitformdata(e){
      e.preventDefault();
      fetch('/api/v1/mechant/signup',{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify(formdata)
      }).then((data)=>{
        return data.json();
        
      }) 
      .then((response)=>{
        navigate('/auth?shop='+response.shop)
        
      })
    }
    

  return (
    <> 
    
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sigin Shopify App</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input onChange={(e)=>{ 
                  setFormdata((previousdata)=>{
                    return {...previousdata,email:e.target.value}
                  })
                }} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
              </div>
              <div className="mt-2">
                <input
                onChange={(e)=>{ 
                  setFormdata((previousdata)=>{
                    return {...previousdata,password:e.target.value}
                  })
                }}

                id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button onClick={submitformdata} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
          </p>
        </div>
      </div>
    </>
  )
}
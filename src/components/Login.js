import React from 'react'
import Logo from '../images/logo technopartner.png'
import { useNavigate } from 'react-router-dom'

export default function Login({setLoggedIn, setToken}) {
    const navigate = useNavigate();

    const loginToApp = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch('https://soal.staging.id/oauth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    grant_type: "password",
                    client_secret: "0a40f69db4e5fd2f4ac65a090f31b823",
                    client_id: "e78869f77986684a",
                    username: "support@technopartner.id",
                    password: "1234567"
                })
            });
            //   console.log(res)
            const data = await res.json();
            console.log(data)
            setToken(data.access_token)
            setLoggedIn(true);
            navigate('/');
            } 
        catch (error) {
              console.log(error)
            }
    }

  return (
    <div className='pt-[3rem] pb-[6rem] px-[2rem] flex flex-col justify-between items-center min-h-screen'>
        <div>
            <img src={Logo} alt="logo-technopartner" />
        </div>
        <form onSubmit={(e)=>loginToApp(e)} className=' flex flex-col gap-[2rem] w-full'>
            <input type="email" required name="email" id="email" placeholder='Email' className=' py-2 px-[2rem] focus:outline-none' />
            <input type="password" required name='password' id='password' placeholder='Password' className=' py-2 px-[2rem] focus:outline-none' />
            <input type="submit" value="Login" className=' box-shadow font-bold text-lg shadow-sm py-4 px-12 mt-[3rem]' />
        </form>
    </div>
  )
}

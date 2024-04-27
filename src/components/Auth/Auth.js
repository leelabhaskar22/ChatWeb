import React from 'react'
import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth'
import {auth} from "../../config/firebase"
import GoogleButton from 'react-google-button'
import Cookies from 'universal-cookie'
const cookies = new Cookies()



const Auth = () => {
  const provider = new GoogleAuthProvider();
  const signin = async () => {
  try{
    const  response =    await signInWithPopup(auth,provider)
    cookies.set('auth-token',response.user.refreshToken
    )
    console.log(response)
    window.location.reload(true)
  }catch(error){
    console.error(error)
  }
  }
  return (
    <div  className='auth-container'>
      <h2 >Continue With Google</h2>
      <GoogleButton  onClick={signin}/>
    </div>
  )
}
export default Auth
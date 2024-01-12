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

  }catch(error){
    console.error(error)
  }
  }
  return (
    <div>
      <GoogleButton style={{margin: '20px auto'}} onClick={signin}/>
    </div>
  )
}
export default Auth
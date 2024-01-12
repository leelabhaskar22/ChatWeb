import React, { useState } from 'react'
import Auth from './components/Auth/Auth'
import { auth } from './config/firebase'
import Chat from './components/Chat/Chat'
import Cookies from 'universal-cookie'
const cookies = new Cookies()


const App = () => {
    console.log()
    const [user , setUser] = useState(cookies.get('auth-token'))
    console.log(user)
    if(!user){
        return (
            <Auth replace/>
            )
    }
    return (
        <Chat />
    )
}
export default App;
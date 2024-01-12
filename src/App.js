import React, { useState } from 'react'
import Auth from './components/Auth/Auth'
import { auth } from './config/firebase'
import Chat from './components/Chat/Chat'
import Cookies from 'universal-cookie'


const cookies = new Cookies()

const App = () => {
    const [user , setUser] = useState(cookies.get('auth-token'))
    return(
        <>
        {user? <Chat /> : <Auth />}
        </>
    )
}
export default App;
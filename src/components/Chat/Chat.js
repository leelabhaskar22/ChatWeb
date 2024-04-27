import React, { useEffect, useState } from 'react'
import { db,auth } from '../../config/firebase';
import "./Chat.css";
import { signOut } from 'firebase/auth';
import { serverTimestamp, addDoc,query,orderBy, collection, getDocs, onSnapshot } from 'firebase/firestore';
import Cookies from 'universal-cookie'
import { IoSend} from 'react-icons/io5'
const cookies = new Cookies()

const Chat = () => {
    const [message , setMessage] = useState('');
    const [array, setArray] = useState([])
    const user = auth.currentUser
    const messagesCollectionref = new collection(db, 'messages')
    
    const handleenter = (e) =>{
        if(e.key === 'Enter'){
            savefirebase()
            setMessage('')
        }
    }
    
    const savefirebase = async () => {
        if(message.length > 0){
        try{

            const messagedata = {
                text: message,
                userId : auth.currentUser.uid,
                timestamp : serverTimestamp(),
                photourl :  user.photoURL,
            }
            await addDoc(messagesCollectionref, messagedata)
            setMessage('')
        }catch(e){
            console.log(e)
        }
    }

    }
    
    const q = query(messagesCollectionref, orderBy('timestamp', 'asc'));
    useEffect(() => {
        fetchMessages();
    },[])
    const fetchMessages = async () => {
        try { 
            const querySnapshot = await getDocs(q);
    
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({ id: doc.id, ...doc.data() });
            });
    
            setArray(messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };
    
    useEffect(() => {
        const subscribeToMessages = () => {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({ id: doc.id, ...doc.data() });
            });
            
            setArray(messages);
        });
        return unsubscribe;
    }
     subscribeToMessages();
},[])

    const signout = () => {
        signOut(auth);
        cookies.set('auth-token',null)
        window.location.reload(true)

    }
  return (  
    <>
     <div className='container'>
        <div className='header'>
        <h2 >Chats</h2>
        <p className='button' onClick={signout}>Signout</p>
        </div>
        <div className='chat_box'>
    {array.map((item,index) => {
        const isCurrentUser = user.uid === item.userId;
        return (
            <div className={isCurrentUser ? 'user-message' : 'friend-message'} key={index}>
                {isCurrentUser ? (
                    <>
                        <div className='user-msg'>
                            <p>{item.text}</p>
                        </div>
                        <img src={item.photourl} alt='pic' />
                    </>
                ) : (
                    <>
                        <img src={item.photourl} alt='pic' />
                        <div className='frnd-msg'>
                            <p>{item.text}</p>
                        </div>
                    </>
                )}
            </div>
        );
    })}
</div>
    <div className='input_container'>
        <input
            placeholder='Type a message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleenter} />
        <button onClick={savefirebase}><IoSend size={24} /></button>
    </div>
      </div>
    </>
  )
}

export default Chat
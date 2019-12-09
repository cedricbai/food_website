import React from 'react';
import { signInWithGoogle } from './firebase/firebase.utils';

class SignIn extends React.Component {
    render() {
        return(
        <div className='sign-in'>
            Please sign in with your google account
            <button onClick={signInWithGoogle} >Sign in</button>            
        </div>
        )
    }
}

export default SignIn;
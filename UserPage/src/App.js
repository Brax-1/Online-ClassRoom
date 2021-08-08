
import React, { useEffect, useState } from "react"
import './App.css';
import firebase from "./utils/firebase";
import Account from "./Components/Account/Account";
import Stream from "./Components/stream/stream";

function App() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sno, setSno] = useState('');
  const [username, setUsername] = useState('');
  const [post, setPost] = useState("teacher");
  const [showloader, setShowloader] = useState(false);
  const [error, setError] = useState('');
  const [hasAccount, setHasAccount] = useState(true);

  function clearInput() {
    setSno('');
    setUsername('');
    setEmail('');
    setPassword('');
  }

  function clearError() {
    setError('');
  }

  function handleLogin() {
    clearError()
    setShowloader(true);
    firebase.database().ref(post+'/'+sno).on('value',function(snapshot){
      if (snapshot.exists()){
        if (snapshot.val().name===username && snapshot.val().email===email) {
           firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((error) => { 
          setShowloader(false);
          setError(error.message);
        });
        }
        else{
          setShowloader(false);
          setError("Enter Valid Data!");
        }
      }
      else{
        
        setShowloader(false);
        setError("Enter Valid Data!");
      }
      
    })
  }
  function handleSignup() {
    clearError()
    setShowloader(true);
    if (password.length>6) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
            firebase.database().ref(post+'/'+sno).set({
                Serial:sno,
                name:username,
                email:email,
            })
            firebase.auth().signInWithEmailAndPassword(email, password) 
            
        })
        .catch((error) => {
          setShowloader(false);
          setError(error.message);
        });
        
    }
    
    else  {
      setShowloader(false);
      setError("Enter password of length greater than 6");
    }
  }

  function forgot(){
    if(email){
      firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert('Reset link sent to your Email id')
      })
      .catch((error) => {
        document.getElementById("error").innerHTML = error.message;
      });
    }
    else{
      setError("Enter Email id");
    }
   
}

  function handleLogout() {
    setShowloader(false);
    firebase.auth().signOut();
  }

  function addListner() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        clearInput()
        user.updateProfile({
          displayName: sno,
          emailVerified:post
        })
        setUser(user);
      }
      else{
        setUser('');
      }
  })
  }
  
  useEffect(() => {
		addListner()
	}, [])

  
  return (
    <>
    
      {(!user)?
        <>
        <Account 
          sno={sno}
          setSno={setSno}
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          post={post}
          setPost={setPost}
          setPassword={setPassword}
          login={handleLogin}
          signup={handleSignup}
          hasAcc={hasAccount}
          setHasAccount={setHasAccount}
          error={error}
          showloader={showloader}
          forgot={forgot}
          />
        </>
        :
        <>
        <Stream
        logout={handleLogout}
        />
        </>
        
        }
      
    </>
  );
  
}

export default App;

import React from 'react'
import './Account.css';
import backgrond from "./login_back.png";

export default function Account(props) {
    return (
        <>
        <img className="login_back" src={backgrond}  />
           <div id="loginform" >
                <div id="heading">Serial No.</div>
                <input autoComplete='off' className="input" type="text" autoFocus value={props.sno} onChange={(e)=> props.setSno(e.target.value)} id="sno"  required />
                <div id="heading">User Name</div>
                <input autoComplete='off' className="input" type="text" autoFocus value={props.username} onChange={(e)=> props.setUsername(e.target.value)} id="name"  required />
                <div id="heading">Email</div>
                <input autoComplete='off' className="input" type="text" autoFocus value={props.email} onChange={(e)=> props.setEmail(e.target.value)} id="email"  required />
                <div id="heading">Password</div>
                <input autoComplete='off' className="input" type="password" autoFocus value={props.password} onChange={(e)=> props.setPassword(e.target.value)} id="pass"  required />
                
                <div className="main-post">
                    <input type="radio" id="teacher" name="post" value="teacher" checked='true'  onClick={()=> props.setPost('teacher')}/>
                    <label id="teach">Teacher</label>
                    <input type="radio" id="student" name="post" value="student" onClick={()=> props.setPost('student')}/>
                    <label id="stu">Student</label>
                </div>
                
                <div id="error">{props.error}</div>
                
                
                {props.hasAcc?
                    <>
                    
                <a href="#"  onClick={props.forgot}>Forgot Password</a>
                    <div className="box">
                    <button onClick={props.login}>Sign In</button>
                    </div>
                    <p className="changer">Don't have an Account?<span onClick={()=> props.setHasAccount(!props.hasAcc)}>SignUp</span></p>
                    
                    </>
                :
                    <>
                    <div className="box">
                    <button onClick={props.signup}>Sign Up</button>
                    </div>
                    <p className="changer">Already have an Account?<span onClick={()=> props.setHasAccount(!props.hasAcc)}>Login</span></p>
                    </>
                }
                
                {props.showloader?
                <>
                    <div id="load">
                        <svg> 
                            <circle cx="25" cy="25" r="25"></circle>
                        </svg>
                    </div>
                </>
                :
                <>
                </>
                
                }
                
           </div>
        </>
    )
}

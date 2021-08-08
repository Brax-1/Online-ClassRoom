import React from 'react'
import './stream.css';
import physics from "./physics.jpg";
import biology from "./biology.jfif";
import tutorchem from "./tutorchem.jpg";
import mathstutuor from "./mathstutuor.jfif";
import tutorbio from "./tutorbio.png";
import tutuorphysics from "./tutuorphysics.jpg";
import phyzip from "./physics.zip";


export default function stream(props) {
    return (
        <> 
            <div className="back">
                <div className="top">

                </div>
            </div>
            <div className="heading">
                <div className="details">
                    <div id="username">

                    </div>
                </div>
                <div className="logout_left">
                    <div id="logout" onClick={props.logout}>Logout</div>
                </div>
            </div>

            <div className="content">
                
                    <div className="status">Live Now</div>
                <div className="current">
                    <div className="card" onClick={()=>
                             window.open("http://localhost:4000/d9fca301-3ff9-4de1-b9b1-97075e52e7e3", "_blank")
                    }>
                        <img id="vedioimg" src={physics} alt="" />
                        <div id="forward">Attend Physics Lecture</div>
                    </div>
                    <div className="card" onClick={()=>
                             window.open("http://localhost:4000/44b820d2-7cb8-4f39-98e5-7bf669cf4180", "_blank")
                           }>
                        <img id="vedioimg" src={biology} alt="" />
                        <div id="forward" 
                            >Attend Biology Lecture</div>
                    </div>
                </div>
                
                    <div className="status">Upcoming Lectures</div>
                <div className="upcoming">
                    <div className="card">
                        <img id="vedioimg" src={tutorchem} alt="" />
                        <div id="forward">Today at 9:00</div>
                    </div>
                    <div className="card">
                        <img id="vedioimg" src={mathstutuor} alt="" />
                        <div id="forward">Today at 12:00</div>
                    </div>
                    <div className="card">
                        <img id="vedioimg" src={tutorbio} alt="" />
                        <div id="forward">Today at 3:00</div>
                    </div>
                    <div className="card">
                        <img id="vedioimg" src={tutuorphysics} alt="" />
                        <div id="forward">Tommorow at 12:00</div>
                    </div>
                </div>
                
                    <div className="status">Resources of Lectures</div>
                <div className="resouces">
                    <div className="card">
                    <div className="vedioStream">
                    <video controls >
                        <source src='https://firebasestorage.googleapis.com/v0/b/missioned-db4bd.appspot.com/o/Vedios%2F(19%3A14%3A27)5-7-2021.mp4?alt=media&token=4e82915d-c794-4b7c-a225-bcf8caa050ac' type="video/mp4"/>
                    </video>
                </div>
                        <div className="feature">
                        <a id="forward" href='https://firebasestorage.googleapis.com/v0/b/missioned-db4bd.appspot.com/o/Vedios%2F(19%3A14%3A27)5-7-2021.mp4?alt=media&token=4e82915d-c794-4b7c-a225-bcf8caa050ac' download='physics.mp4'>
                            Vedio
                        </a>
                        <div id="gap"></div>
                        <a id="forward"  href={phyzip} download='physicsCont.zip'>
                            Content
                        </a>
                        </div>
                        
                    </div>
                    <div className="card">
                    <div className="vedioStream">
                    <video controls >
                        <source src='https://firebasestorage.googleapis.com/v0/b/missioned-db4bd.appspot.com/o/Vedios%2F(19%3A18%3A22)5-7-2021.mp4?alt=media&token=d85688c4-d258-41cd-b3b8-4f6579502f49' type="video/mp4"/>
                    </video>
                </div>
                        <div className="feature">
                        <a id="forward" href='https://firebasestorage.googleapis.com/v0/b/missioned-db4bd.appspot.com/o/Vedios%2F(19%3A18%3A22)5-7-2021.mp4?alt=media&token=d85688c4-d258-41cd-b3b8-4f6579502f49' download='bio.mp4'>
                            Vedio
                        </a>
                        <div id="gap"></div>
                        <a id="forward" href={phyzip} download='bioCont.zip'>
                            Content
                        </a>
                        </div>
                        
                    </div>
                  
                    
                    </div>
                </div>
                
           
            
            
        </>
    )
}


const socket = io('/')
const teachervideoGrid = document.getElementById('video-grid')
const studentvideoGrid = document.getElementById('list-student')
var toggleModeState = true;
var isRec = false;
var Statepageload = false;
let audioData;
let vedioData;


const firebaseConfig = {
    apiKey: "AIzaSyCkotqgoUnPq69ZkJ6mLtYBm9G8f60WmhU",
    authDomain: "missioned-db4bd.firebaseapp.com",
    projectId: "missioned-db4bd",
    storageBucket: "missioned-db4bd.appspot.com",
    messagingSenderId: "935426434877",
    appId: "1:935426434877:web:65d1f70d1355f638afc754",
    measurementId: "G-WD155RRX0Y"
};
firebase.initializeApp(firebaseConfig);





let audiodataArray = [];
let vediodataArray = [];
let mediaRecorder ;
let vediomediaRecorder ;
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
  })
  let myVideoStream,myid;
  const myVideo = document.createElement('video')
  myVideo.muted = true;
  const peers = {}
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  }).then(stream => {
    
    vediomediaRecorder = new MediaRecorder(stream)
    console.log(stream)
    myVideoStream = stream;
    addVideoStream(myVideo, stream,teachervideoGrid)
    myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream,studentvideoGrid)
        })
      })

    socket.on('user-connected', userId => {
        setTimeout(connectToNewUser,3030,userId, stream)
        
      })
      let text = $("input");
        $('html').keydown(function (e) {
            if (e.which == 13 && text.val().length !== 0) {
                console.log(text.val())
            socket.emit('message', text.val());
            text.val('')
            }
        });

        socket.on("createMessage", (message ,userId) => {
          console.log(message,userId)
            $(".messages").append(`<li class="newmessage"
            
            style = "background : ${toggleModeState?"black":"linear-gradient(135deg , rgb(230, 0, 255),rgb(230, 0, 255),rgb(230, 0, 255), rgb(251, 59, 242))"}"
            
            ><heading>${userId}</heading><br/><br/><mes>${message}</mes></br></li>`);
            scrollToBottom()
        })
        

        socket.on("StartUserRec", () => {
          vediomediaRecorder.start();
        })
          socket.on("StopUserRec", () => {
           
            
            vediomediaRecorder.stop();
            vediomediaRecorder.ondataavailable = function (ev) {
            vediodataArray.push(ev.data);
          }
          vediomediaRecorder.onstop = function (ev) {
          
            vedioData = new Blob(vediodataArray, 
                      { 'type': 'vedio/mp4;' });
                      
          console.log(vedioData)
            
          }
            })

  })

  //only audio
  navigator.mediaDevices.getUserMedia({
    video:false,
    audio: true
  }).then(audiostream => {
    console.log(audiostream)
    mediaRecorder = new MediaRecorder(audiostream)
    
    socket.on("StartUserRec", () => {
      console.log("open")
      const html = `
      <i class="fas fa-record-vinyl"></i>
      <span>Stop Recording</span>
      `
      isRec =true
      
      document.querySelector('.main__record_button').innerHTML = html;
      document.getElementById('cover').style.zIndex = "10";
      document.querySelector('.main__record_button').style.color = "rgb(248, 70, 70)";
      mediaRecorder.start();
      document.querySelector('.main__download_button').style.color = "#d2d2d2"
    })
      socket.on("StopUserRec", () => {
        console.log("Close")
        const html = `
        <i class="fas fa-record-vinyl"></i>
        <span>Start Recording</span>
        `
        isRec=false
        
      document.querySelector('.main__record_button').innerHTML = html;
      mediaRecorder.stop();
      mediaRecorder.ondataavailable = function (ev) {
        audiodataArray.push(ev.data);
      }
      mediaRecorder.onstop = function (ev) {
      
        audioData = new Blob(audiodataArray, 
                  { 'type': 'audio/mp3;' });
        let audioSrc = window.URL
            .createObjectURL(audioData);
            
          console.log(audioData,audioSrc)
            const audioDownload = `
            <i class="fas fa-upload"  ></i>
            <span>Upload</span>
              `
              
              document.querySelector('.main__record_button').style.color = "black";
              document.getElementById('cover').style.zIndex = "-10";
              document.querySelector('.main__download_button').innerHTML = audioDownload;
              document.querySelector('.main__download_button').style.color = "rgb(14, 177, 6)";
      
      }
        })

  })
  
  function uploadfiles(){
   
    $.when(UploadAudio()).then(UploadVedio());
    
  }
  function UploadAudio() {
    var d = new Date();
    var uploadTask = firebase.storage().ref('Audio/('+ d.getUTCHours()+':'+d.getUTCMinutes()+':'+d.getUTCSeconds() +')'+d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear() +'.mp3').put(audioData);

    uploadTask.on('state_changed',function (snapshot) {
      var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      const progressdata = `
            <i class="fas fa-upload"  ></i>
            <span>Audio Uploaded : ${parseInt(progress)}%</span>
              `
      document.querySelector('.main__download_button').innerHTML = progressdata
      
      
    },
    function(error) {
      alert(error);
    },
    function(){
      uploadTask.snapshot.ref.getDownloadURL().then(function(url){
        
        audioUrl = url;
        console.log("audio : ",url)
        firebase.database().ref('LectureAudio/('+ d.getUTCHours()+':'+d.getUTCMinutes()+':'+d.getUTCSeconds() +')'+d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()).set({
          Link : audioUrl
        })

        alert('Audio Succesfully Uploaded !!!');
      }

      )
    }

    )
  }

    function UploadVedio() {
      var d = new Date();
        uploadTask = firebase.storage().ref('Vedios/('+ d.getUTCHours()+':'+d.getUTCMinutes()+':'+d.getUTCSeconds() +')'+d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear() +'.mp4').put(vedioData);
        uploadTask.on('state_changed',function (snapshot) {
          var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          const progressdata = `
                <i class="fas fa-upload"  ></i>
                <span>Vedio Uploaded : ${parseInt(progress)}%</span>
                  `
          document.querySelector('.main__download_button').innerHTML = progressdata
        }
        ,
        function(error) {
          alert(error);
        }
        ,
        function(){
          uploadTask.snapshot.ref.getDownloadURL().then(function(url){
            vedioUrl = url;
            console.log("Vedio url : ",url)
            firebase.database().ref('LectureVedio/('+ d.getUTCHours()+':'+d.getUTCMinutes()+':'+d.getUTCSeconds() +')'+d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()).set({
              Link : vedioUrl
            })
            alert('Vedio Succesfully Uploaded !!!');
            console.log("Done Vedio")
            const uploadStatus = `
                    <i class="fas fa-upload"  ></i>
                    <span>Uploaded SuccessFully</span>
                      `
                      document.querySelector('.main__download_button').innerHTML = uploadStatus;
          }

          )
        }
        
        )
    }


  socket.on('user-disconnected', userId => {
    console.log("ok")
    if (peers[userId]) peers[userId].close()
  })
  myPeer.on('open', id => {
    myid = id;
    socket.emit('join-room', ROOM_ID, id)
  })
  
 
  

  function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const stvideo = document.createElement('video')
    stvideo.setAttribute("id", "newstudentjoined");
    call.on('stream', userVideoStream => {
      addVideoStream(stvideo, userVideoStream,studentvideoGrid)
    })
    call.on('close', () => {
      stvideo.remove()
    })
    peers[userId] = call
  }


function addVideoStream(video, stream , container) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    container.append(video)
  
  }

  const scrollToBottom = () => {
    var d = $('.main__chat_window');
    d.scrollTop(d.prop("scrollHeight"));
  }

  const leavemeeting = () => {
    console.log("pls leave")
    socket.emit('leave', myid);
    window.close()
  }
  const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getAudioTracks()[0].enabled = false;
      setUnmuteButton();
    } else {
      setMuteButton();
      myVideoStream.getAudioTracks()[0].enabled = true;
    }
  }
  const toggleMode = () => {
    if (!toggleModeState) {
      setDarkmodeOn();
      toggleModeState = true;
    } else {
      setLightmodeOn();
      toggleModeState = false;
    }
  }

  

  
  const recordtoggle = () => {
    if(!isRec){
      console.log("Start")
      socket.emit('StartRec')
    
    }
    else{
      console.log("Stop")
      socket.emit('StopRec')

    }
    
  }
  

  const pageLoad = () => {
    playStop()

    if (!Statepageload) {
      const html = `
      <i class="fas fa-paste"></i>
      <span>Unload WorkSpace</span>
    `
    document.querySelector('.main__pageload_button').innerHTML = html;
      teachervideoGrid.style.opacity=0
      Statepageload = true;

    } else {
      const html = `
      <i class="fas fa-file"></i>
      <span>Load WorkSpace</span>
    `
    document.querySelector('.main__pageload_button').innerHTML = html;
    
      teachervideoGrid.style.opacity=1
      Statepageload = false;
    }
  }


const playStop = () => {
    console.log('object')
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getVideoTracks()[0].enabled = false;
      setPlayVideo()
    } else {
      setStopVideo()
      myVideoStream.getVideoTracks()[0].enabled = true;
    }
  }

  
  const setDarkmodeOn = () => {
    const html = `
      <i class="fas fa-sun"></i>
      <span>Light Mode</span>
    `
    document.querySelector(".main__togglemode_button").innerHTML = html;
    document.querySelector('.main_list_student').style.borderRightColor = '#3D3D42';
    document.querySelector('.main_list_student').style.background = '#242324';
    document.querySelector('.main__right').style.borderLeftColor = '#3D3D42';
    document.querySelector('.main__right').style.background = '#242324';
    document.querySelector('.main__videos').style.background = 'black';

    elements = document.getElementsByClassName('messages');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.borderLeftColor="white";
    }
    
    elements = document.getElementsByClassName('main__header');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.color="#F5F5F5";
    }
    
    
    elements = document.getElementsByClassName('newmessage');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.background="black";
    }

    document.querySelector('.main__message_container input').style.color = '#F5F5F5';
    document.querySelector('.main__message_container input').style.borderTopColor = '#d2d2d2';
    
    
  }
  const setLightmodeOn = () => {
    const html = `
      <i class="fas fa-moon"></i>
      <span>Dark Mode</span>
    `
    document.querySelector('.main__togglemode_button').innerHTML = html;
    document.querySelector('.main_list_student').style.borderRightColor = '#942bf7';
    document.querySelector('.main_list_student').style.background = 'whitesmoke';
    document.querySelector('.main__right').style.borderLeftColor = '#942bf7';
    document.querySelector('.main__right').style.background = 'whitesmoke';
    document.querySelector('.main__videos').style.background = 'white';
    elements = document.getElementsByClassName('messages');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.borderLeftColor="#942bf7";
    }
    
    elements = document.getElementsByClassName('main__header');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.color="#fa34f7";
    }
    

    elements = document.getElementsByClassName('newmessage');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.background="linear-gradient(135deg , rgb(230, 0, 255),rgb(230, 0, 255),rgb(230, 0, 255), rgb(251, 59, 242))";
    }

    document.querySelector('.main__message_container input').style.color = '#fa34f7';
    document.querySelector('.main__message_container input').style.borderTopColor = '#cc34fa';

  }
  const setMuteButton = () => {
    const html = `
      <i class="fas fa-microphone"></i>
      <span>Mute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
  }
  
  const setUnmuteButton = () => {
    const html = `
      <i class="unmute fas fa-microphone-slash"></i>
      <span>Unmute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
  }
  
  const setStopVideo = () => {
    const html = `
      <i class="fas fa-video"></i>
      <span>Stop Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
  }
  
  const setPlayVideo = () => {
    const html = `
    <i class="stop fas fa-video-slash"></i>
      <span>Play Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
  }
  
  
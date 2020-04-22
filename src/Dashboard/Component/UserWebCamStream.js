import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import styles from "./UserWebCamStream.css";
const socket = openSocket("https://socketio-chat-h9jt.herokuapp.com/");

socket.emit("add user", "aakarsh");

socket.on("new message", data => {
  console.log(data);
});
let myPeerConnection;
let targetUsername;

function UserWebCamStream(props) {
  const [isVideo, toggleVideo] = useState(false);
  const [myUsername, setMyUsername] = useState("");

  function stop(e) {
    var video = document.querySelector("#videoElement");
    var stream = video.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      track.stop();
    }

    video.srcObject = null;
  }

  var mediaConstraints = {
    audio: true, // We want an audio track
    video: true // ...and we want a video track
  };

  const sendToServer = msg => {
    var msgJSON = JSON.stringify(msg);

    connection.send(msgJSON);
  };
  const invite = evt => {
    if (myPeerConnection) {
      alert("You can't start a call because you already have one open!");
    } else {
      var clickedUsername = evt.target.textContent;

      if (clickedUsername === myUsername) {
        alert(
          "I'm afraid I can't let you talk to yourself. That would be weird."
        );
        return;
      }

      targetUsername = clickedUsername;
      createPeerConnection();

      navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then(function(localStream) {
          document.getElementById("local_video").srcObject = localStream;
          localStream
            .getTracks()
            .forEach(track => myPeerConnection.addTrack(track, localStream));
        })
        .catch(handleGetUserMediaError);
    }
  };
  const createPeerConnection = () => {
    myPeerConnection = new RTCPeerConnection({
      iceServers: [
        // Information about ICE servers - Use your own!
        {
          urls: "stun:stun.stunprotocol.org"
        }
      ]
    });

    myPeerConnection.onicecandidate = handleICECandidateEvent;
    myPeerConnection.ontrack = handleTrackEvent;
    myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
    myPeerConnection.onremovetrack = handleRemoveTrackEvent;
    myPeerConnection.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    myPeerConnection.onicegatheringstatechange = handleICEGatheringStateChangeEvent;
    myPeerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;
  };

  const handleNegotiationNeededEvent = () => {
    myPeerConnection
      .createOffer()
      .then(function(offer) {
        return myPeerConnection.setLocalDescription(offer);
      })
      .then(function() {
        sendToServer({
          name: myUsername,
          target: targetUsername,
          type: "video-offer",
          sdp: myPeerConnection.localDescription
        });
      })
      .catch(reportError);
  };

  const handleVideoOfferMsg = msg => {
    var localStream = null;

    targetUsername = msg.name;
    createPeerConnection();

    var desc = new RTCSessionDescription(msg.sdp);

    myPeerConnection
      .setRemoteDescription(desc)
      .then(function() {
        return navigator.mediaDevices.getUserMedia(mediaConstraints);
      })
      .then(function(stream) {
        localStream = stream;
        document.getElementById("local_video").srcObject = localStream;

        localStream
          .getTracks()
          .forEach(track => myPeerConnection.addTrack(track, localStream));
      })
      .then(function() {
        return myPeerConnection.createAnswer();
      })
      .then(function(answer) {
        return myPeerConnection.setLocalDescription(answer);
      })
      .then(function() {
        var msg = {
          name: myUsername,
          target: targetUsername,
          type: "video-answer",
          sdp: myPeerConnection.localDescription
        };

        sendToServer(msg);
      })
      .catch(handleGetUserMediaError);
  };

  const handleICECandidateEvent = event => {
    if (event.candidate) {
      sendToServer({
        type: "new-ice-candidate",
        target: targetUsername,
        candidate: event.candidate
      });
    }
  };
  const handleNewICECandidateMsg = msg => {
    var candidate = new RTCIceCandidate(msg.candidate);

    myPeerConnection.addIceCandidate(candidate).catch(reportError);
  };

  const handleTrackEvent = event => {
    document.getElementById("received_video").srcObject = event.streams[0];
    document.getElementById("hangup-button").disabled = false;
  };
  const handleRemoveTrackEvent = event => {
    var stream = document.getElementById("received_video").srcObject;
    var trackList = stream.getTracks();

    if (trackList.length == 0) {
      closeVideoCall();
    }
  };
  const hangUpCall = () => {
    closeVideoCall();
    sendToServer({
      name: myUsername,
      target: targetUsername,
      type: "hang-up"
    });
  };

  const closeVideoCall = () => {
    var remoteVideo = document.getElementById("received_video");
    var localVideo = document.getElementById("local_video");

    if (myPeerConnection) {
      myPeerConnection.ontrack = null;
      myPeerConnection.onremovetrack = null;
      myPeerConnection.onremovestream = null;
      myPeerConnection.onicecandidate = null;
      myPeerConnection.oniceconnectionstatechange = null;
      myPeerConnection.onsignalingstatechange = null;
      myPeerConnection.onicegatheringstatechange = null;
      myPeerConnection.onnegotiationneeded = null;

      if (remoteVideo.srcObject) {
        remoteVideo.srcObject.getTracks().forEach(track => track.stop());
      }

      if (localVideo.srcObject) {
        localVideo.srcObject.getTracks().forEach(track => track.stop());
      }

      myPeerConnection.close();
      myPeerConnection = null;
    }

    remoteVideo.removeAttribute("src");
    remoteVideo.removeAttribute("srcObject");
    localVideo.removeAttribute("src");
    remoteVideo.removeAttribute("srcObject");

    document.getElementById("hangup-button").disabled = true;
    targetUsername = null;
  };

  const handleICEConnectionStateChangeEvent = event => {
    switch (myPeerConnection.iceConnectionState) {
      case "closed":
      case "failed":
      case "disconnected":
        closeVideoCall();
        break;
    }
  };

  const handleSignalingStateChangeEvent = event => {
    switch (myPeerConnection.signalingState) {
      case "closed":
        closeVideoCall();
        break;
    }
  };

  const handleICEGatheringStateChangeEvent = event => {
    // Our sample just logs information to console here,
    // but you can do whatever you need.
  };

  const startVideo = () => {
    var video = document.querySelector("#videoElement");

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(function(stream) {
          video.srcObject = stream;
        })
        .catch(function(err0r) {
          console.log("Something went wrong!");
        });
    }
  };
  const toggle = () => {
    if (isVideo) {
      toggleVideo(false);
      stop();
    } else {
      toggleVideo(true);
      startVideo();
    }
  };
  useEffect(() => {});
  const makeCall = () => {
    console.log("aanames");
    try {
      socket.emit("message", { type: "username", name: "Host", text: "" });
    } catch (e) {
      console.log(e);
    }
  };
  const joinCall = () => {
    socket.emit("join", {
      name: myUsername
    });
  };
  return (
    <div>
      <div class="flexChild" id="camera-container">
        <div class="camera-box">
          <video id="received_video" autoplay />
          <video id="local_video" autoplay muted />
          <button id="hangup-button" onclick="hangUpCall();" disabled>
            Hang Up
          </button>
        </div>
      </div>

      <h2 onClick={() => makeCall()}>Call User</h2>
      <input
        type="text"
        placeholder="ENter Meeting Id"
        onChange={e => setMyUsername(e.target.value)}
        className={styles.inputBox}
      />
      <div onClick={() => joinCall()}>Join</div>

      {/* <video autoPlay id="videoElement" />
      <div onClick={() => toggle()}> Hide/SHow</div>  */}
    </div>
  );
}
export default UserWebCamStream;

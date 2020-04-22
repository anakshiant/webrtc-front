import React, { useRef, useEffect } from "react";
import openSocket from "socket.io-client";
import styles from "./MultiChat.css";

const socket = openSocket("https://7860cc1d.ngrok.io");
const VideoTrack = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div>
      <video
        ref={videoRef}
        height={300}
        width={300}
        controls={false}
        autoPlay
      />
    </div>
  );
};
// window.RTCPeerConnection =
//   window.RTCPeerConnection ||
//   window.webkitRTCPeerConnection ||
//   window.mozRTCPeerConnection;
// window.RTCIceCandidate =
//   window.RTCIceCandidate ||
//   window.mozRTCIceCandidate ||
//   window.webkitRTCIceCandidate;
// window.RTCSessionDescription =
//   window.RTCSessionDescription ||
//   window.mozRTCSessionDescription ||
//   window.webkitRTCSessionDescription;
// window.URL = window.URL || window.mozURL || window.webkitURL;
// window.navigator.getUserMedia =
//   window.navigator.getUserMedia ||
//   window.navigator.webkitGetUserMedia ||
//   window.navigator.mozGetUserMedia;
export default class MultiChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: "",
      currentId: "",
      connected: "",
      peers: []
    };
  }
  peers = [];
  peerConnections = {};
  stream = "";
  componentDidMount() {
    let isAlreadyCalling = false;
    // let peerConnection = new RTCPeerConnection({
    //   iceServers: [
    //     {
    //       urls: "stun:stun.l.google.com:19302"
    //     }
    //   ]
    // });

    window.navigator &&
      window.navigator.getUserMedia &&
      window.navigator.getUserMedia(
        { video: true, audio: false },
        stream => {
          const localVideo = document.getElementById("local-videos");
          console.log("cames in ");
          console.log(stream);
          if (localVideo) {
            localVideo.srcObject = stream;
          }
          this.stream = stream;
          //   stream
          //     .getTracks()
          //     .forEach(track => peerConnection.addTrack(track, stream));
        },
        error => {
          console.warn(error.message);
        }
      );
    // peerConnection.ontrack = function({ streams: [stream] }) {
    //   const remoteVideo = document.getElementById("remote-video");
    //   console.log(stream);
    //   if (remoteVideo) {
    //     const userContainerEl = document.createElement("video");
    //     userContainerEl.setAttribute("autoplay", true);
    //     userContainerEl.setAttribute("className", styles.userVideo);
    //     userContainerEl.srcObject = stream;
    //     remoteVideo.appendChild(userContainerEl);
    //   }
    // };
    this.addHandlers();
  }

  makeOffer = id => {
    var pc = this.getPeerConnection(id);
    pc.createOffer(
      sdp => {
        pc.setLocalDescription(sdp);
        console.log("Creating an offer for", id);
        console.log(this.state.currentId, id);
        socket.emit("msg", {
          by: this.state.currentId,
          to: id,
          sdp: sdp,
          type: "sdp-offer"
        });
      },
      function(e) {
        console.log(e);
      },
      { mandatory: { OfferToReceiveVideo: true, OfferToReceiveAudio: true } }
    );
  };

  getPeerConnection = id => {
    if (this.peerConnections[id]) {
      return this.peerConnections[id];
    }
    var iceConfig = { iceServers: [{ url: "stun:stun.l.google.com:19302" }] },
      currentId,
      roomId;

    var pc = new RTCPeerConnection(iceConfig);
    this.peerConnections[id] = pc;
    pc.addStream(this.stream);
    pc.onicecandidate = evnt => {
      socket.emit("msg", {
        by: this.state.currentId,
        to: id,
        ice: evnt.candidate,
        type: "ice"
      });
    };
    pc.onaddstream = evnt => {
      console.log("Received new stream");
      console.log(evnt.stream);
      this.onAddStream(id, evnt.stream);
    };
    return pc;
  };
  onAddStream = (id, stream) => {
    let currentPearse = this.state.peers;
    currentPearse.push({ id, stream });
    this.setState({ peers: currentPearse });
    // const remoteVideo = document.getElementById("remote-video");
    // console.log("adding");
    // let element = "";
    // console.log(this.peers);
    // for (let i = 0; i < this.peers.length; i++) {
    //   console.log("crearting data");
    //   console.log(this.peers[i]);
    //   console.log(this.peers[i].stream);
    //   const userContainerEl = document.createElement("video");

    //   //   let rm1 = document.getElementById("local-videos1");
    //   userContainerEl.setAttribute("autoplay", true);
    //   userContainerEl.srcObject = this.peers[i].stream;
    //   element += userContainerEl;
    //   //   remoteVideo.appendChild(userContainerEl);
    // }
    // remoteVideo.value = element;
  };
  onDisconnectPeer = id => {
    this.peers = this.peers.filter(function(p) {
      return p.id !== id;
    });
  };

  addHandlers = () => {
    socket.on("peer.connected", params => {
      console.log("peeer connect");
      console.log(params);
      this.makeOffer(params.id);
    });
    socket.on("peer.disconnected", data => {
      //   api.trigger("peer.disconnected", [data]);
      this.onDisconnectPeer([data]);
      //   if (!$rootScope.$$digest) {
      //     $rootScope.$apply();
      //   }
    });
    socket.on("msg", data => {
      this.handleMessage(data);
    });
  };

  createAnser = async (peerConnection, offer) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(answer));
    return answer;
  };
  handleMessage = async data => {
    var pc = this.getPeerConnection(data.by);
    console.log("in handleMessage");
    console.log(data);
    switch (data.type) {
      case "sdp-offer":
        let makeAns = await this.createAnser(pc, data.sdp);
        console.log(makeAns);
        socket.emit("msg", {
          by: this.state.currentId,
          to: data.by,
          sdp: makeAns,
          type: "sdp-answer"
        });

        // console.log("in spd offfer");
        // pc.setRemoteDescription(new RTCSessionDescription(data.sdp), () => {
        //   console.log("Setting remote description by offer");
        //   try {
        //     pc.createAnswer(sdp => {
        //       pc.setLocalDescription(sdp);
        //       console.log("sending answer");
        //       socket.emit("msg", {
        //         by: this.state.currentId,
        //         to: data.by,
        //         sdp: sdp,
        //         type: "sdp-answer"
        //       });
        //     });
        //   } catch (e) {
        //     console.log("in errro");
        //     console.log(e);
        //   }
        // });
        break;
      case "sdp-answer":
        console.log("in spd answer");
        pc.setRemoteDescription(
          new RTCSessionDescription(data.sdp),
          function() {
            console.log("Setting remote description by answer");
          },
          function(e) {
            console.error(e);
          }
        );
        break;
      case "ice":
        if (data.ice) {
          console.log("Adding ice candidates");
          pc.addIceCandidate(new RTCIceCandidate(data.ice));
        }
        break;
    }
  };
  createRoom = () => {
    socket.emit("init", null, (roomid, id) => {
      //   roomId = roomid;
      //   currentId = id;
      //   connected = true;
      this.setState({
        roomId: roomid,
        currentId: id,
        connected: true
      });
    });
  };
  joinRoom = () => {
    socket.emit("init", { room: this.state.roomId }, (roomid, id) => {
      //   roomId = roomid;
      //   currentId = id;
      //   connected = true;
      this.setState({
        roomId: roomid,
        currentId: id,
        connected: true
      });
    });
  };
  render() {
    console.log(this.state);
    console.log(this.peers);
    return (
      <div>
        <div className={styles.joinWay}>
          <input
            type="text"
            onChange={e =>
              this.setState({
                roomId: e.target.value
              })
            }
            className={styles.input}
          />
          <div className={styles.createRoom} onClick={() => this.joinRoom()}>
            Join Room
          </div>
        </div>
        <div className={styles.chatRoom}>
          {this.state.peers.length &&
            this.state.peers.map(item => {
              return <VideoTrack stream={item.stream} />;
            })}
        </div>
        <video id="local-videos" className={styles.userVideo} autoPlay />
        <div className={styles.createRoom} onClick={() => this.createRoom()}>
          Create Room
        </div>
      </div>
    );
  }
}

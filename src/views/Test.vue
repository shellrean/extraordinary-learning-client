<template>
	<section class="container">
		<div class="card">
			<div class="card-body">
				<div class="form-group">
					<label>Room ID</label>
					<input type="text" class="form-control" id="room-id" placeholder="Room ID" v-model="room_id">
				</div>
				<div class="form-group">					
					<button id="open-room" class="btn btn-primary mr-1" @click="openRoom" :disabled="disabled">Open Room</button>
					<button id="join-room" class="btn btn-primary" @click="joinRoom" :disabled="disabled">Join Room</button>
				</div>
			</div>
		</div>
		<div class="card">
			<div class="card-body">
				<div id="videos-container"></div>
			</div>
		</div>
	</section>
</template>
<script>
import RTCMultiConnection from '@/assets/js/RTCMultiConnection.js'
var connection = new RTCMultiConnection();

export default {
	data() {
		return {
			room_id: '',
			disabled: false
		}
	},
	methods: {
		openRoom() {
			connection.open(this.room_id, (isRoomOpen, roomid, error) => {
				if(isRoomOpen === true) {

				} else {
					if (error === 'Room not available') {
						alert('Someone already created this room');
						return;
					}
					alert(error);
				}
			})
		},
		joinRoom() {
			connection.open(this.room_id, (isJoinedRoom, roomid, error) => {
				if (error) {
					if (error === 'Room not available') {
						alert('This room does not exist');
						return;
					}
					alert(error)
				}
			})
		}
	},	
	mounted(){
		connection.socketURL = 'http://localhost:3000/';
		connection.socketMessageEvent = 'video-conference-demo';
		connection.session = {
			audio: true,
			video: true
		}
		connection.sdpConstraints.mandatory = {
			OfferToReceiveAudio: true,
			OfferToReceiveVideo: true
		}

		var bitrates = 512;
		var resolutions = 'Ultra-HD';
		var videoConstraints = {};

		if (resolutions == 'HD') {
			videoConstraints = {
				width: {
					ideal: 1280
				},
				height: {
					ideal: 720
				},
				frameRate: 30
			}
		}

		if (resolutions == 'Ultra-HD') {
			videoConstraints = {
				width: {
					ideal: 1920
				},
				height: {
					ideal: 1080
				},
				frameRate: 30
			}
		}

		connection.mediaConstraints = {
			video: videoConstraints,
			audio: true
		}

		var CodecsHandler = connection.CodecsHandler;

		connection.processSdp = function(sdp) {
			var codecs = 'vp8';

			if (codecs.length) {
				sdp = CodecsHandler.preferCodec(sdp, codecs.toLowerCase());
			}

			if (resolutions == 'HD') {
				sdp = CodecsHandler.setApplicationSpecificBandWidth(sdp, {
					audio: 128,
					video: bitrates,
					screen: bitrates
				});

				sdp = CodecsHandler.setVideoBitrates(sdp, {
					min: bitrates * 8 * 1024,
					max: bitrates * 8 * 1024
				});
			}

			if (resolutions == 'Ultra-HD') {
				sdp = CodecsHandler.setApplicationSpecificBandWidth(sdp, {
					audio: 128,
					video: bitrates,
					screen: bitrates
				});

				sdp = CodecsHandler.setVideoBitrates(sdp, {
					min: bitrates * 8 * 1024,
					max: bitrates * 8 * 1024
				});
			}

			return sdp;
		}

		connection.iceServers = [{
			'urls': [
				'stun:stun.1.google.com:19302',
				'stun:stun1.1.google.com:19302',
				'stun:stun2.l.google.com:19302',
        		'stun:stun.l.google.com:19302?transport=udp',
			]
		}];

		connection.videosContainer = document.getElementById('videos-container');
		connection.onstream = function(event) {
			var existing = document.getElementById(event.streamid);
			if(existing && existing.parentNode) {
				existing.parentNode.removeChild(existing);
			}

			event.mediaElement.removeAttribute('src');
			event.mediaElement.removeAttribute('srcObject');
			event.mediaElement.muted = true;
			event.mediaElement.volume = 0;

			var video = document.createElement('video');

			try {
				video.setAttributeNode(document.createAttribute('autoplay'));
				video.setAttributeNode(document.createAttribute('playsinline'));
			} catch (e) {
				video.setAttribute('autoplay', true);
				video.setAttribute('playsinline', true);
			}

			if(event.type === 'local') {
				video.volume = 0;
				try {
					video.setAttributeNode(document.createAttribute('muted'));
				} catch (e) {
					video.setAttribute('muted', true);
				}
			}

			video.srcObject = event.stream;

			var width = parseInt(connection.videosContainer.clientWidth / 3) - 20;
			var mediaElement = getHTMLMediaElement(video, {
				title: event.userid,
				buttons: ['full-screen'],
				width: width,
				showOnMouseEnter: false
			});

			connection.videosContainer.appendChild(mediaElement);

			setTimeout(function() {
				mediaElement.media.play();
			}, 5000);

			mediaElement.id = event.streamid;

			localStorage.setItem(connection.socketMessageEvent, connection.sessionid);

			chkRecordConference.parentNode.style.display = 'none';

			if (event.type === 'local') {
				connection.socket.on('disconnect', function() {
					if (!connection.getAllparticipants().length) {
						location.reload();
					}
				})
			}
		}

		connection.onstreamended = function(event) {
			var mediaElement = document.getElementById(event.stream);
			if (mediaElement) {
				mediaElement.parentNode.removeChild(mediaElement);
			}
		}

		connection.onMediaError = function(e) {
			console.log(e.message)
		}
	}
}
</script>
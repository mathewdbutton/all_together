import axios from "axios"


class SoundManager {

  static play() {
    var records = document.querySelectorAll("audio")
    for (let record of records) {
      var audio = new Audio(record.src);
      audio.play();
    }
  }

  static getCSRF() {
    return document.querySelector('#csrf-tag').dataset.csrf
  }

  static getRecordName() {
    return document.querySelector('#record-name').value
  }

  static add(path, name) {
    axios.post('/record', {
      path: path,
      name: name
    }, {
        headers: {
          "x-csrf-token": window.SoundManager.getCSRF(),
          "Content-type": "application/json"
        }
      })
  }

  static upload_to_s3(url, file, type) {
    axios.put(url, file, {
      headers: { 'Content-Type': type }
    })
  }

  static upload_url(name) {
    return axios.post('/upload_url', {
      file_name: name
    }, {
        headers: {
          "x-csrf-token": window.SoundManager.getCSRF(),
          "Content-type": "application/json"
        }
      }).then(response => {
        return { url: response.data.upload_url,
                 uuid: response.data.uuid}
      })
  }

  static record(element) {
      SoundManager.start_recording();

  }

  static stop() {

    window.recorder.stop()

  }
// Example from here https://air.ghost.io/recording-to-an-audio-file-using-html5-and-js/
  static createAudioElement(blobUrl) {
    const downloadEl = document.createElement('a');
    downloadEl.style = 'display: block';
    downloadEl.innerHTML = 'download';
    downloadEl.download = 'audio.webm';
    downloadEl.href = blobUrl;
    const audioEl = document.createElement('audio');
    audioEl.controls = true;
    const sourceEl = document.createElement('source');
    sourceEl.src = blobUrl;
    sourceEl.type = 'audio/webm';
    audioEl.appendChild(sourceEl);
    document.body.appendChild(audioEl);
    document.body.appendChild(downloadEl);
}

  static start_recording() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      // store streaming data chunks in array
      const chunks = [];
      // create media recorder instance to initialize recording
      const recorder = new MediaRecorder(stream);
      window.recorder = recorder;
      window.stream = stream;
      // function to be called when data is received
      recorder.ondataavailable = e => {
        // add stream data to chunks
        chunks.push(e.data);
        // if recorder is 'inactive' then recording has finished
        if (recorder.state == 'inactive') {
            var recordingName = SoundManager.getRecordName();
            var fileName = recordingName + ".webm"
            // convert stream data chunks to a 'webm' audio format as a blob
            const blob = new Blob(chunks, { type: 'audio/webm' });
            var myfile = new File([blob], fileName);
            SoundManager.upload_url(fileName).then( ({url,uuid}) => {

              SoundManager.add(uuid + fileName,recordingName)
              SoundManager.upload_to_s3(url, myfile, 'audio/webm');
              SoundManager.createAudioElement(URL.createObjectURL(myfile));
              window.stream.getAudioTracks()[0].stop();
            } ).catch(e => {
              console.log(e)
            });



            // convert blob to URL so it can be assigned to a audio src attribute
        }
      };
      // start recording with 1 second time between receiving 'ondataavailable' events
      recorder.start();
    }).catch(console.error);
  }

}

export default SoundManager;
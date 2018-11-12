import IndexPage from "./index_page";
import Recording from "./models/recording";


class SoundManager {

  static play() {
    var records = document.querySelectorAll("audio")
    for (let record of records) {
      var audio = new Audio(record.src);
      audio.play();
    }
  }

  static record() {
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
          var recordingName = IndexPage.getRecordName();
          var fileName = recordingName + ".webm"
          // convert stream data chunks to a 'webm' audio format as a blob
          const blob = new Blob(chunks, { type: 'audio/webm' });
          var myfile = new File([blob], fileName);
          Recording.upload_url(fileName).then(({ url, uuid }) => {

            Recording.add(uuid + fileName, recordingName)
            Recording.upload_to_s3(url, myfile, 'audio/webm');
            SoundManager.createAudioElement(URL.createObjectURL(myfile));
            window.stream.getAudioTracks()[0].stop();
          }).catch(e => {
            console.log(e)
          });
        }
      };
      recorder.start();
    }).catch(console.error);
  }

}

export default SoundManager;
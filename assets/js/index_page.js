import SoundManager from "./soundmanager";

class IndexPage {
  static getCSRF() {
    return document.querySelector('#csrf-tag').dataset.csrf
  }

  static getRecordName() {
    return document.querySelector('#record-name').value
  }

  static startRecording() {
    SoundManager.record();
  }

  static stopRecording() {
    SoundManager.stop();
  }

  static playAllRecordings(){
    let recordings = document.querySelectorAll(".record-container .recording");
    SoundManager.play(recordings);
  }
}

export default IndexPage
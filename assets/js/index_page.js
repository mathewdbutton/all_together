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
}

export default IndexPage
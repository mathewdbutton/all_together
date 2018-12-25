import { Controller } from "stimulus"
import SoundManager from "../lib/soundmanager";

export default class extends Controller {
  static targets = [ "recordName", "recording" ]

  get recordName() {
    return this.recordNameTarget.value
  }

  startRecording() {
    SoundManager.record(this.recordName);
  }

  stopRecording() {
    SoundManager.stop();
  }

  playAllRecordings(){
    let recordings = this.recordingTargets;
    SoundManager.play(recordings);
  }
}

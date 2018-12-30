import axios from "axios"

class Recording {

  static add(path, name, csrf) {
    axios.post(location.pathname + '/record', {
      path: path,
      name: name
    }, {
        headers: {
          "x-csrf-token": csrf,
          "Content-type": "application/json"
        }
      })
  }

  static upload_to_s3(url, file, type) {
    axios.put(url, file, {
      headers: { 'Content-Type': type }
    })
  }

  static upload_url(name, csrf) {
    return axios.post('/upload_url', {
      file_name: name
    }, {
        headers: {
          "x-csrf-token": csrf,
          "Content-type": "application/json"
        }
      }).then(response => {
        return {
          url: response.data.upload_url,
          uuid: response.data.uuid
        }
      })
  }
}

export default Recording
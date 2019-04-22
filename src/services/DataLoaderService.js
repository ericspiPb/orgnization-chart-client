import {json} from "d3-fetch"

class DataLoaderService {
  load(url) {
    return json(url)
  }
}

const dataLoaderInstance = new DataLoaderService()

export default dataLoaderInstance
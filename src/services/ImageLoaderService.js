import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

class ImageLoader {
  load() {
    library.add(faUser)
    library.add(faPlusCircle)
  }
}

const imageLoaderInstance = new ImageLoader()

export default imageLoaderInstance;
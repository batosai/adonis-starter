import { AttachmentConfig } from '@ioc:Adonis/Addons/AttachmentAdvanced'

const attachmentConfig: AttachmentConfig = {
  document: false,
  video: false,
  pdf: false,
  image: {
    variants: {
      thumbnail: {
        resize: 320,
        format: 'jpg'
      },
      medium: {
        resize: 640,
        format: 'jpg'
      },
      large: {
        resize: 1280,
        format: 'jpg'
      }
    }
  }
}

export default attachmentConfig

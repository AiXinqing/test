/**
 * @param {string} url
 * @returns {string}
 */
export function getFileUrl(url) {
  if (url) {
    return process.env.VUE_APP_FILE_API + url
  } else {
    return null
  }
}
/**
* @returns {string}
 */
export function getUploadUrl() {
  return process.env.VUE_APP_FILE_API + '/api/services/file/upload/upload'
}

const timestamp = Date.now()

export default function cacheBust(url) {
  return `${url}?${timestamp}`
}

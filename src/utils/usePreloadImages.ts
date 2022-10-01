import { useEffect, useState } from "react"
import useOptions from "../options/useOptions"

export default function usePreloadImages(imageURLs: string[]) {
  const preloadImages = useOptions((store) => store.preloadImages)
  const [loaded, setLoaded] = useState(!preloadImages)
  const urlsToPreload = preloadImages ? imageURLs : []
  const status = imageURLs.reduce<
    Record<string, { url: string; loaded: boolean }>
  >((record, url) => ({ ...record, url: { url, loaded: false } }), {})
  useEffect(() => {
    urlsToPreload.forEach((url) => {
      const preloader = new Image()
      preloader.addEventListener(
        "load",
        () => {
          if (status[url]) {
            status[url] = { url, loaded: true }
            setLoaded(Object.values(status).every((url) => url.loaded))
          }
        },
        {
          once: true,
          capture: true,
        }
      )
      preloader.src = url
    })
  }, [urlsToPreload])
  return {
    loaded,
  }
}

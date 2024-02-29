import { useEffect, useState } from 'react'

const useScrollVisibility = (scrollY: number): [boolean, () => void] => {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const handleVisibility = () => {
      if (window.scrollY > scrollY) {
        setShowScroll(true)
      } else {
        setShowScroll(false)
      }
    }

    window.addEventListener('scroll', handleVisibility)

    return () => {
      window.removeEventListener('scroll', handleVisibility)
    }
  })

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return [showScroll, handleScrollToTop]
}

export default useScrollVisibility

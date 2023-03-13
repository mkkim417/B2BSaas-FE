import { useState, useEffect } from 'react'

const useDetectClose = (ref: any, initialState: any) => {
  const [isOpen, setIsOpen] = useState(initialState)

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(!isOpen)
        // console.log('밖에클릭')
      }
    }
    if (isOpen) {
      window.addEventListener('click', pageClickEvent)
    }
    return () => {
      window.removeEventListener('click', pageClickEvent)
    }
  }, [isOpen, ref])
  return [isOpen, setIsOpen]
}

export default useDetectClose

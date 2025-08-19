'use client'

import { useEffect, useMemo, useState } from 'react'

const TypingText = ({ text, speed = 100 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('')
  const chars = useMemo(() => [...text], [text]) // Unicode対応を維持

  useEffect(() => {
    setDisplayedText('') // リセット
    const id = setInterval(() => {
      setDisplayedText(prev => {
        if (prev.length < chars.length) {
          return prev + chars[prev.length] // 常に現在の表示長をインデックスに
        } else {
          clearInterval(id)
          return prev
        }
      })
    }, speed)

    return () => clearInterval(id)
  }, [chars, speed])

  return <p>{displayedText}</p>
}

export default TypingText
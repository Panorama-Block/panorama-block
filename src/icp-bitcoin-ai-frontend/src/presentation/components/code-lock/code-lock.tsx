'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'

interface CodeLockProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const CodeLock = ({ isOpen, onClose, onSuccess }: CodeLockProps) => {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [error, setError] = useState(false)

  const correctCode = import.meta.env.VITE_ACCESS_CODE ?? '802040'

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [isOpen])

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)
      setError(false)

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }

      if (index === 5 && value) {
        const enteredCode = [...newCode.slice(0, 5), value].join('')
        if (enteredCode === correctCode) {
          onSuccess()
        } else {
          setError(true)
          setTimeout(() => {
            setCode(['', '', '', '', '', ''])
            inputRefs.current[0]?.focus()
          }, 500)
        }
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pastedText = event.clipboardData.getData('text')
    
    if (/^\d{6}$/.test(pastedText)) {
      const newCode = pastedText.split('')
      setCode(newCode)
      setError(false)
      
      if (pastedText === correctCode) {
        onSuccess()
      } else {
        setError(true)
        setTimeout(() => {
          setCode(['', '', '', '', '', ''])
          inputRefs.current[0]?.focus()
        }, 500)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-lg w-full max-w-md mx-4 relative border border-zinc-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Enter Early-Access Code</h2>
          <p className="text-zinc-400">Please enter the 6-digit code to continue</p>
        </div>

        <div className="flex justify-center gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`w-12 h-12 text-center text-xl font-bold bg-zinc-800 border ${
                error ? 'border-red-500' : 'border-zinc-700'
              } rounded-lg focus:outline-none focus:border-blue-500 text-white`}
              maxLength={1}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-center mt-4">
            Incorrect code. Please try again.
          </p>
        )}
      </div>
    </div>
  )
}

export default CodeLock
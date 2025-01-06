'use client'

import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import CodeLock from '../code-lock/code-lock'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation()
  const isNewLanding = location.pathname === '/new-landing'

  const initialLockState = !localStorage.getItem('isUnlocked')
  const [isLocked, setIsLocked] = useState(initialLockState)
  const [showLock, setShowLock] = useState(initialLockState)

  if (isNewLanding) {
    return <>{children}</>
  }

  const handleSuccess = () => {
    setIsLocked(false)
    setShowLock(false)
    localStorage.setItem('isUnlocked', 'true')
  }

  if (isLocked) {
    return (
      <CodeLock
        isOpen={showLock}
        onClose={() => {}}
        onSuccess={handleSuccess}
      />
    )
  }

  return <>{children}</>
}

export default ProtectedRoute

'use client'

import { useState, useCallback } from 'react'
import { useToast } from './Toast'

interface CopyButtonProps {
  text: string
  label?: string
  successMessage?: string
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function CopyButton({
  text,
  label = 'Copy',
  successMessage = 'Copied to clipboard!',
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const { showToast } = useToast()

  const handleCopy = useCallback(async () => {
    if (!text || disabled) return

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      showToast(successMessage, 'success')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      showToast('Failed to copy', 'error')
    }
  }, [text, disabled, successMessage, showToast])

  const baseStyles = 'font-medium transition-all rounded-xl flex items-center justify-center gap-2'

  const variantStyles = {
    primary: copied
      ? 'bg-green-500 text-white'
      : 'bg-forge-cyan text-forge-dark hover:bg-forge-cyan/80 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: copied
      ? 'bg-green-500 text-white'
      : 'bg-white/10 hover:bg-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: copied
      ? 'bg-green-500/20 text-green-400'
      : 'bg-transparent hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed',
  }

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button
      onClick={handleCopy}
      disabled={disabled || !text}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {copied ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {label}
        </>
      )}
    </button>
  )
}

'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'
import { ColorPalette, parseColorPalette, generateColorVariables, getContrastColor, lightenColor, darkenColor } from '@/lib/colors'

interface ColorContextType {
  colorPalette: ColorPalette
  getContrastColor: (color: string) => string
  lightenColor: (color: string, percent: number) => string
  darkenColor: (color: string, percent: number) => string
  applyColorVariables: () => void
}

const ColorContext = createContext<ColorContextType | undefined>(undefined)

interface ColorProviderProps {
  children: ReactNode
  colorPalette: string[]
}

export function ColorProvider({ children, colorPalette }: ColorProviderProps) {
  const palette = parseColorPalette(colorPalette)
  
  const applyColorVariables = () => {
    const variables = generateColorVariables(palette)
    const root = document.documentElement
    
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
    
    // Generate additional color variations
    root.style.setProperty('--color-primary-light', lightenColor(palette.primary, 20))
    root.style.setProperty('--color-primary-dark', darkenColor(palette.primary, 20))
    root.style.setProperty('--color-primary-contrast', getContrastColor(palette.primary))
    
    root.style.setProperty('--color-secondary-light', lightenColor(palette.secondary, 20))
    root.style.setProperty('--color-secondary-dark', darkenColor(palette.secondary, 20))
    root.style.setProperty('--color-secondary-contrast', getContrastColor(palette.secondary))
    
    root.style.setProperty('--color-tertiary-light', lightenColor(palette.tertiary, 20))
    root.style.setProperty('--color-tertiary-dark', darkenColor(palette.tertiary, 20))
    root.style.setProperty('--color-tertiary-contrast', getContrastColor(palette.tertiary))
  }
  
  useEffect(() => {
    applyColorVariables()
  }, [colorPalette])
  
  const value: ColorContextType = {
    colorPalette: palette,
    getContrastColor,
    lightenColor,
    darkenColor,
    applyColorVariables
  }
  
  return (
    <ColorContext.Provider value={value}>
      {children}
    </ColorContext.Provider>
  )
}

export function useColors() {
  const context = useContext(ColorContext)
  if (context === undefined) {
    throw new Error('useColors must be used within a ColorProvider')
  }
  return context
} 
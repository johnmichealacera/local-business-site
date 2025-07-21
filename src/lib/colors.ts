export interface ColorPalette {
  primary: string
  secondary: string
  tertiary: string
}

export function parseColorPalette(colorArray: string[]): ColorPalette {
  return {
    primary: colorArray[0] || '#F59E0B',
    secondary: colorArray[1] || '#000000',
    tertiary: colorArray[2] || '#FFFFFF'
  }
}

export function hexToHsl(hex: string): string {
  // Remove # if present
  hex = hex.replace('#', '')
  
  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

export function generateColorVariables(colorPalette: ColorPalette): Record<string, string> {
  return {
    '--color-primary': colorPalette.primary,
    '--color-secondary': colorPalette.secondary,
    '--color-tertiary': colorPalette.tertiary,
    '--color-primary-hsl': hexToHsl(colorPalette.primary),
    '--color-secondary-hsl': hexToHsl(colorPalette.secondary),
    '--color-tertiary-hsl': hexToHsl(colorPalette.tertiary),
  }
}

export function getContrastColor(hexColor: string): string {
  // Remove # if present
  hexColor = hexColor.replace('#', '')
  
  // Convert to RGB
  const r = parseInt(hexColor.substring(0, 2), 16)
  const g = parseInt(hexColor.substring(2, 4), 16)
  const b = parseInt(hexColor.substring(4, 6), 16)
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  
  // Return black or white based on luminance
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

export function lightenColor(hexColor: string, percent: number): string {
  // Remove # if present
  hexColor = hexColor.replace('#', '')
  
  // Convert to RGB
  const r = parseInt(hexColor.substring(0, 2), 16)
  const g = parseInt(hexColor.substring(2, 4), 16)
  const b = parseInt(hexColor.substring(4, 6), 16)
  
  // Lighten each component
  const newR = Math.min(255, Math.round(r + (255 - r) * percent / 100))
  const newG = Math.min(255, Math.round(g + (255 - g) * percent / 100))
  const newB = Math.min(255, Math.round(b + (255 - b) * percent / 100))
  
  // Convert back to hex
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
}

export function darkenColor(hexColor: string, percent: number): string {
  // Remove # if present
  hexColor = hexColor.replace('#', '')
  
  // Convert to RGB
  const r = parseInt(hexColor.substring(0, 2), 16)
  const g = parseInt(hexColor.substring(2, 4), 16)
  const b = parseInt(hexColor.substring(4, 6), 16)
  
  // Darken each component
  const newR = Math.max(0, Math.round(r * (1 - percent / 100)))
  const newG = Math.max(0, Math.round(g * (1 - percent / 100)))
  const newB = Math.max(0, Math.round(b * (1 - percent / 100)))
  
  // Convert back to hex
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
}

export function generateDynamicGradientStyle(
  direction: 'to-r' | 'to-br' | 'to-l' | 'to-bl' | 'to-t' | 'to-b',
  colorPalette: ColorPalette,
  opacity: number = 1,
  lightness: 'light' | 'normal' | 'dark' = 'normal'
): React.CSSProperties {
  const { primary, secondary, tertiary } = colorPalette
  
  let colors: string[]
  
  if (lightness === 'light') {
    colors = [
      lightenColor(primary, 80),
      lightenColor(secondary, 80),
      lightenColor(tertiary, 80)
    ]
  } else if (lightness === 'dark') {
    colors = [
      darkenColor(primary, 20),
      darkenColor(secondary, 20),
      darkenColor(tertiary, 20)
    ]
  } else {
    colors = [primary, secondary, tertiary]
  }
  
  const gradientDirection = direction.replace('to-', '')
  const gradientColors = colors.map(color => 
    opacity < 1 ? `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}` : color
  ).join(', ')
  
  return {
    background: `linear-gradient(${gradientDirection}, ${gradientColors})`
  }
}

export function generateTextGradientStyle(colorPalette: ColorPalette): React.CSSProperties {
  const { primary, secondary, tertiary } = colorPalette
  
  return {
    background: `linear-gradient(to right, ${primary}, ${secondary}, ${tertiary})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  }
}

export function generateBrightTextGradientStyle(colorPalette: ColorPalette): React.CSSProperties {
  const { primary } = colorPalette
  
  return {
    background: `linear-gradient(135deg, white 0%, ${primary} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
  }
}

export function generateButtonGradientStyle(colorPalette: ColorPalette): React.CSSProperties {
  const { primary, secondary, tertiary } = colorPalette
  
  return {
    background: `linear-gradient(to right, ${primary}, ${secondary}, ${tertiary})`,
    border: 'none'
  }
} 
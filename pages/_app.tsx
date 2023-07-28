import { useEffect, useState } from 'react'
import type { AppContext, AppProps } from 'next/app'
import { darkTheme, lightTheme, customTheme } from '@/themes'
import { CssBaseline, Theme, ThemeProvider } from '@mui/material'
import Cookies from 'js-cookie'
import '@/styles/globals.css'

interface Props extends AppProps {
  theme?: string
}

export default function App({ Component, pageProps}: Props) {

  const [currentTheme, setCurrentTheme] = useState(lightTheme)

  useEffect(() => {

    const cookieTheme = Cookies.get('theme') || 'light'
    const selectedTheme:Theme = cookieTheme === 'custom'  
    ? customTheme 
    : cookieTheme === 'dark'
    ? darkTheme
    : lightTheme 

    setCurrentTheme(selectedTheme)
  }, [])
  


  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

App.getInitialProps = async ({ ctx }: AppContext) => {

  const { theme } = ctx.req ? ( ctx.req as any ).cookies : { theme: 'light' }
  const validThemes = ['light', 'dark', 'custom'];

  return {
    theme: validThemes.includes(theme) ? theme : 'light'
  }
}
'use client'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../chakra/theme'
import Layout from '../components/Layout/Layout'
import { ReactNode } from 'react'
import '../styles/globals.css'

function MyApp({children}: {children: ReactNode}) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        {children}
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp;
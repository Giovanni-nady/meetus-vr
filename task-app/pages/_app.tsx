import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ABeeZee } from 'next/font/google'

const abeeZee = ABeeZee({
  weight: '400',
  subsets: ['latin']
})

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <main className={abeeZee.className}>
      <Component {...pageProps} />
    </main>
  )
}

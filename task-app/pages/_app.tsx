import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ABeeZee } from 'next/font/google'

const abeeZee = ABeeZee({
  weight: '400', // Specify the font weight (e.g., 400 for regular)
  subsets: ['latin'] // Specify the subset (e.g., latin)
})

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <main className={abeeZee.className}>
      <Component {...pageProps} />
    </main>
  )
}

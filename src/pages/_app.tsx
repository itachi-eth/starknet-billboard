import '../../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import type { AppProps } from 'next/app'
import Providers from '../Providers'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      < Component {...pageProps} />
    </Providers>
  )
}

export default MyApp

import type { NextPage } from 'next'
import Head from 'next/head'
import Mapbox from '../components/Map/Mapbox'
import WalletConnect from '../components/WalletConnect'
import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
import { FaTwitter, FaGithub, FaReadme } from 'react-icons/fa'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>World Map Billboard</title>
        <meta name="description" content="Starknet World Map Billboards is a game to occupy your favourite cities on earth and post some ads with it. It's built-in with dynamic token nomics and NFT minting mechanism to trade and compete with each players. And it utilized Layer2 technology to make it accessible to global crypto fans." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box sx={{
          height: '100vh',
          padding: "0 50px",
          margin: "0 auto"
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              width: '100%',
              flex: 1
            }}>
              <h1>Starknet World Map Billboard</h1>

              <IconButton size="large" onClick={() => window.open("https://twitter.com/cryptoleek", "_blank")}>
                <FaTwitter color="#0092e9" />
              </IconButton>

              <IconButton size="large" onClick={() => window.open("https://github.com/cryptoleek-team/starknet-worldmap-billboard", "_blank")}>
                <FaGithub color='black' />
              </IconButton>

              <IconButton size="large" onClick={() => window.open("https://github.com/cryptoleek-team/starknet-worldmap-billboard#readme", "_blank")}>
                <FaReadme color='black' />
              </IconButton>
            </Box>

            <WalletConnect />
          </Box>
          <Mapbox />
        </Box>

      </main>
    </div >
  )
}

export default Home

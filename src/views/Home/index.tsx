import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import { Box, Button, Stack, Text } from '@chakra-ui/react'
import Layout from '@/components/Layout'
import Banner from './components/Banner'
import AppSection from './components/AppSection'
import dynamic from 'next/dynamic'
import Footer from '@/components/Layout/Footer'
import ModalDisclaimer from './components/ModalDisclaimer'
import { useEffect } from 'react'
import { appStore } from '@/stores/app.store'
// const Banner = dynamic(() => import('./components/Banner'), { ssr: false })

export const HomePage: NextPage = () => {
  const { setVisibleDisclaimer } = appStore()

  useEffect(() => {
    handleCheckDisclaimer()
  }, [])

  const handleCheckDisclaimer = () => {
    const result = localStorage.getItem('wangchanglm-disclaimer')
    if (!result) {
      setVisibleDisclaimer(true)
    }
  }

  return (
    <>
      <Head>
        <title>WangChanGLM</title>
      </Head>
      <Stack justifyContent="space-between" minHeight="100vh">
        <Text as="h1" display="none">
          We set out to improve instruction-following capabilities in Thai, our native language, and ended up
          discovering one of today’s AI most urgent and critical inequality issues: the shape of subword tokens.
        </Text>
        <ModalDisclaimer />
        <Layout>
          <Banner />
          <AppSection />
        </Layout>
        <Footer />
      </Stack>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx?.locale ?? 'en', ['common'])),
    },
  }
}

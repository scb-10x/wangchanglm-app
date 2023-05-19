import { GITHUB_API, GITHUB_FRONTEND, GITHUB_MODEL } from '@/contants/github'
import { SCB10X, VISTEC, WANGCHANGLM_URL } from '@/contants/website'
import { EventNames, PageLocations, useGTM } from '@/hooks/useGTM'
import { Container, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const Footer: React.FC = () => {
  const { track } = useGTM()

  return (
    <React.Fragment>
      <Stack bg="#131F32" py={8}>
        <Container maxW="6xl">
          <Stack direction="row">
            <Stack position="relative" height={{ base: 86, md: 86 }} userSelect="none">
              <a href={WANGCHANGLM_URL} target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/icons/wangchanglm.png"
                  alt="wangchanglm-logo"
                  height={{ base: '60px', md: '70px' }}
                  objectFit="contain"
                />
              </a>
              <a href={VISTEC} target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/icons/by-vistec.png"
                  alt="by-vistec-logo"
                  height={{ base: '30px', md: '32px' }}
                  objectFit="contain"
                  position="absolute"
                  bottom={{ base: 5, md: 4 }}
                  right={{ base: '130px', md: 40 }}
                />
              </a>
              <a href={SCB10X} target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/icons/presented-by-scb10x.png"
                  alt="presented-by-scb10x-logo"
                  height={{ base: '32px', md: '40px' }}
                  objectFit="contain"
                  position="absolute"
                  bottom={{ base: 5, md: 3 }}
                  right={0}
                />
              </a>
            </Stack>
          </Stack>

          <Stack
            mt={8}
            width="100%"
            justifyContent="space-between"
            direction={{ base: 'column', md: 'row' }}
            spacing={10}
          >
            <Stack>
              <Text color="#F2F3F4" fontSize={{ base: 14, md: 16 }} fontWeight={300}>
                This is a technology demo of the WangChanGLM Multilingual Instruction Following Large Language Model by
                VISTEC, presented by SCB10X.
              </Text>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={1}>
                <Text color="#F2F3F4" fontSize={{ base: 14, md: 16 }} fontWeight={300}>
                  You can learn more about this project from this post{' '}
                </Text>
                <Text color="#01A1B0" fontSize={{ base: 14, md: 16 }} fontWeight={300}>
                  <a
                    href={WANGCHANGLM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here!
                  </a>
                </Text>
              </Stack>
              <Text
                color="#8A97AB"
                fontSize={{ base: 12, md: 14 }}
                fontWeight={300}
                pt={4}
                display={{ base: 'none', md: 'flex' }}
              >
                Ⓒ 2023 SCB10X Co. Ltd. - All rights reserved
              </Text>
            </Stack>
            <Stack width={{ base: '100%', md: '380px' }}>
              <Stack>
                <Text color="#01A1B0" fontSize={{ base: 14, md: 16 }} fontWeight={500} mb={{ base: 0, md: 2 }}>
                  GitHub Repo
                </Text>
                <Stack spacing={1}>
                  <Text color="#F2F3F4" fontSize={{ base: 14, md: 16 }} fontWeight={300}>
                    <a
                      href={GITHUB_MODEL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        track(EventNames.CLICK_GITHUB_REPO, {
                          page: PageLocations.HOME,
                          repo: 'model',
                        })
                      }}
                    >
                      Model Repo
                    </a>
                  </Text>
                  <Text color="#F2F3F4" fontSize={{ base: 14, md: 16 }} fontWeight={300}>
                    <a
                      href={GITHUB_FRONTEND}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        track(EventNames.CLICK_GITHUB_REPO, {
                          page: PageLocations.HOME,
                          repo: 'app',
                        })
                      }}
                    >
                      App Repo
                    </a>
                  </Text>
                  <Text color="#F2F3F4" fontSize={{ base: 14, md: 16 }} fontWeight={300}>
                    <a
                      href={GITHUB_API}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        track(EventNames.CLICK_GITHUB_REPO, {
                          page: PageLocations.HOME,
                          repo: 'api',
                        })
                      }}
                    >
                      API Repo
                    </a>
                  </Text>
                </Stack>
              </Stack>
              <Text
                color="#8A97AB"
                fontSize={{ base: 12, md: 14 }}
                fontWeight={300}
                pt={4}
                display={{ base: 'flex', md: 'none' }}
              >
                Ⓒ 2023 SCB10X Co. Ltd. - All rights reserved
              </Text>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </React.Fragment>
  )
}

export default Footer

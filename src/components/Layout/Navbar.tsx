import { Container, Image, Select, Stack, Text } from '@chakra-ui/react'
import LanguageSwitcher from './LanguageSwitcher'
import { GITHUB_MODEL } from '@/contants/github'
import { EventNames, PageLocations, useGTM } from '@/hooks/useGTM'

const Navbar: React.FC = () => {
  const { track } = useGTM()
  
  return (
    <Stack height={62} borderBottom={1} borderStyle="solid" borderColor="gray.100">
      <Container maxW="6xl" height="100%">
        <Stack direction="row" height="100%" alignItems="center" justifyContent="space-between">
          {/* <Text color="#01A1B0" fontSize={24} fontWeight={600} userSelect="none">
            THAI GLM
          </Text> */}
          <Stack userSelect="none" cursor="pointer">
            <Image src="/images/icons/logo.png" alt="logo" height={{ base: '40px', md: '46px' }} objectFit="contain" />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={4}>
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
              <Stack userSelect="none">
                <Image src="/images/icons/github-icon.svg" alt="github-icon" height="24px" />
              </Stack>
            </a>

            {/* <LanguageSwitcher /> */}
            {/* <Select defaultValue="en" variant="outline" colorScheme="primary">
              <option value="en">English</option>
              <option value="th">Thai</option>
            </Select> */}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  )
}

export default Navbar

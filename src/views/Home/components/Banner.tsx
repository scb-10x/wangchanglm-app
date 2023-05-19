import { Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const Banner: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Stack alignItems="center" userSelect="none" spacing={{ base: 2, md: 6 }}>
      <Stack alignItems="center" spacing={1}>
        <Text
          color="#131231"
          fontSize={{ base: 22, md: 40, lg: 61 }}
          fontWeight={500}
          lineHeight={{ base: '30px', lg: '65px' }}
        >
          {t('YOU_WRITE')}
        </Text>
        <Stack direction="row" spacing={{ base: 2, md: 4 }}>
          <Text
            fontSize={{ base: 22, md: 40, lg: 61 }}
            fontWeight={500}
            className="banner-title"
            lineHeight={{ md: '65px' }}
          >
            {t('THAI_GLM_COMPLETES')}
          </Text>
          <Text fontSize={{ base: 22, md: 40, lg: 61 }} fontWeight={500} color="#131231" lineHeight={{ md: '65px' }}>
            GENERATES
          </Text>
        </Stack>
      </Stack>

      <Text
        fontSize={{ base: 14, md: 16 }}
        align="center"
        fontWeight={300}
        color="#8A97AB"
        width={{ base: '100%', md: '570px' }}
        dangerouslySetInnerHTML={{
          __html: String(t('WRITE_ANYTHING_WITH_AI_TO_CREATE_MEANINGFUL_CONTENT_IN_THAI_LANGUAGE')),
        }}
      >
        {/* {t('WRITE_ANYTHING_WITH_AI_TO_CREATE_MEANINGFUL_CONTENT_IN_THAI_LANGUAGE')} */}
      </Text>
    </Stack>
  )
}

export default Banner

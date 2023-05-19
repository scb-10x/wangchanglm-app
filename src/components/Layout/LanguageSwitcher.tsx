import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { Button, Image, Select, Stack, Text } from '@chakra-ui/react'

const LanguageSwitcher: React.FC<{
  onChange?: (locale: string) => unknown
}> = ({ onChange }) => {
  const { i18n } = useTranslation()
  const { language: currentLanguage } = i18n
  const router = useRouter()
  const locales = router.locales ?? [currentLanguage]

  const languageNames = useMemo(() => {
    return new Intl.DisplayNames([currentLanguage], {
      type: 'language',
    })
  }, [currentLanguage])

  const switchToLocale = useCallback(
    (locale: string) => {
      const path = router.asPath

      return router.push(path, path, { locale })
    },
    [router],
  )

  const onChangeLang = async (event: any) => {
    if (onChange) {
      onChange(event?.target?.value)
    }
    await switchToLocale(event?.target?.value)
  }

  return (
    <Stack direction="row">
      <Select
        defaultValue={currentLanguage}
        variant="outline"
        colorScheme="primary"
        onChange={(event) => onChangeLang(event)}
      >
        {locales.map((locale) => {
          const label = capitalize(languageNames.of(locale) ?? locale)
          const option = {
            value: locale,
            label,
          }

          return (
            <option key={locale} value={option?.value} onClick={() => onChangeLang(option?.value)}>
              {/* <Image src={`/images/icons/${option?.value}-icon.svg`} alt="github-icon" height="24px" /> */}
              {option?.label}
            </option>
          )
        })}
      </Select>
    </Stack>
  )
}

function capitalize(lang: string) {
  return lang.slice(0, 1).toUpperCase() + lang.slice(1)
}

export default LanguageSwitcher

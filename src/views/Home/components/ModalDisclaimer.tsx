import { appStore } from '@/stores/app.store'
import {
  Button,
  Checkbox,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const ModalDisclaimer: React.FC = () => {
  const { t } = useTranslation('common')
  const { visibleDisclaimer, setVisibleDisclaimer } = appStore()

  const handleClose = () => {
    setVisibleDisclaimer(false)
  }

  const handleDisabledDisclaimer = (value: boolean) => {
    localStorage.setItem('wangchanglm-disclaimer', JSON.stringify(value))
  }

  return (
    <Modal isOpen={visibleDisclaimer} onClose={handleClose} size="xl">
      <ModalOverlay />
      <ModalContent px={{ md: 4 }} py={{ base: 4, md: 6 }}>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={6}>
            <Stack spacing={6}>
              <Image src="/images/icons/logo-disclaimer.svg" alt="logo-disclaimer" height="102px" />
            </Stack>
            <Stack spacing={4}>
              <Text color="#131231" fontSize={{ base: 16 }} fontWeight={400}>
                Disclaimer
              </Text>
              <Text color="#30384B" fontSize={{ base: 14 }} fontWeight={300}>
                {t('DISCLAIMER_DESCRIPTION')}
              </Text>
              <Checkbox size="lg" onChange={(e) => handleDisabledDisclaimer(e.target.checked)}>
                <Text color="#30384B" fontSize={14} fontWeight={300}>
                  ไม่แสดงหน้านี้อีก
                </Text>
              </Checkbox>
            </Stack>
            <Stack alignItems="center">
              <Button
                height="48px"
                borderRadius={40}
                background="linear-gradient(127.66deg, #01A1B0 30.8%, #6677EE 90.51%, #AA74EC 124.82%)"
                _hover={{
                  background: 'linear-gradient(127.66deg, #01A1B0 30.8%, #6677EE 90.51%, #AA74EC 124.82%)',
                  opacity: '0.85',
                }}
                color="#fff"
                px={8}
                fontWeight={400}
                fontSize={16}
                onClick={handleClose}
              >
                {t('ENTER_TO_WEBSITE')}
              </Button>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalDisclaimer

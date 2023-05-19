import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { appStore } from '@/stores/app.store'
import { useMemo, useState } from 'react'
import feedbackService from '@/service/feedback.service'

const ModalFeedback: React.FC = () => {
  const { t } = useTranslation()
  const {
    visibleFeedback,
    visibleFeedbackSuccess,
    setVisibleFeedback,
    setVisibleFeedbackSuccess,
    setSuccessFeedback,
    vote,
    result,
    setVote,
  } = appStore()

  const [feedback, setFeedback] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      console.log('result', result)

      const response = await feedbackService.sendFeedback({
        prompt: result?.prompt,
        vote,
        feedback,
        maxLen: result?.params?.max_length,
        temp: result?.params?.temperature,
        topP: result?.params?.top_p,
      })
    } catch (error) {}
    setVisibleFeedbackSuccess(true)
    setSuccessFeedback(true)
    setLoading(true)
  }

  const handleGoToHome = () => {
    setVisibleFeedback(false)
  }

  const handleClose = () => {
    setVisibleFeedback(false)
    setVote(undefined)
  }

  return (
    <Modal isOpen={visibleFeedback} onClose={handleClose} size="lg">
      <ModalOverlay />
      {!visibleFeedbackSuccess && (
        <ModalContent p={6}>
          <Stack alignItems="center">
            <Text color="#131231" align="center" fontSize={20} fontWeight={400} width={420}>
              {t('LET_US_KNOW_YOUR_THOUGHTS')}
            </Text>
          </Stack>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={8} mt={8}>
              <Stack>
                <Textarea
                  placeholder={String(t('PLEASE_DESCRIBE_WHAT_YOUR_THOUGHT_WAS_GOOD_BED_ABOUT_THE_PROTOTYPE'))}
                  value={feedback}
                  onChange={(event) => setFeedback(event?.target?.value)}
                  fontSize={{ base: 14, md: 16 }}
                  fontWeight={300}
                  isDisabled={loading}
                />
              </Stack>

              <Stack alignItems="center">
                <Button
                  onClick={handleSubmit}
                  width="120px"
                  height="48px"
                  borderRadius={40}
                  background="linear-gradient(127.66deg, #01A1B0 30.8%, #6677EE 90.51%, #AA74EC 124.82%)"
                  _hover={{
                    background: 'linear-gradient(127.66deg, #01A1B0 30.8%, #6677EE 90.51%, #AA74EC 124.82%)',
                    opacity: '0.85',
                  }}
                  color="#fff"
                  fontWeight={400}
                  fontSize={{ base: 14, md: 16 }}
                  isLoading={loading}
                  loadingText={t('SUBMIT')}
                >
                  {t('SUBMIT')}
                </Button>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      )}

      {visibleFeedbackSuccess && (
        <ModalContent p={6}>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={6} mt={8} alignItems="center">
              <Image src="/images/icons/thank-you-icon.svg" alt="thank-you-icon" width="160px" height="160px" />
              <Stack spacing={2}>
                <Text className="banner-title" align="center" fontSize={32} fontWeight={500}>
                  {t('THANK_YOU')}
                </Text>
                <Text color="#8A97AB" align="center" fontSize={16} fontWeight={300}>
                  {t('THANK_YOU_FOR_SHARING_YOUR_THOUGHTS')}
                </Text>
              </Stack>
              <Stack alignItems="center">
                <Button
                  onClick={handleGoToHome}
                  height="48px"
                  borderRadius={40}
                  background="linear-gradient(127.66deg, #01A1B0 30.8%, #6677EE 90.51%, #AA74EC 124.82%)"
                  _hover={{
                    background: 'linear-gradient(127.66deg, #01A1B0 30.8%, #6677EE 90.51%, #AA74EC 124.82%)',
                    opacity: '0.85',
                  }}
                  color="#fff"
                  fontWeight={400}
                  fontSize={16}
                >
                  {t('GO_TO_HOMEPAGE')}
                </Button>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      )}
    </Modal>
  )
}

export default ModalFeedback

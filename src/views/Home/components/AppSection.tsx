import { appStore } from '@/stores/app.store'
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Image,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useMemo, useState } from 'react'
import ModalFeedback from './ModalFeedback'
import aiService from '@/service/ai.service'
import { IAIGenerate } from '@/interfaces/ai-generate.interface'
import ModalReport from './ModalReport'
import { Vote } from '@/service/feedback.service'
import Tippy from '@tippyjs/react'
import { EventNames, PageLocations, useGTM } from '@/hooks/useGTM'

const MAX_NEW_TOKEN_DES = `ความยาวตัวอักษรของคำตอบ`
const TEMPERATURE_DES = `ความสร้างสรรค์ของคำตอบ:<br/>0 = สามารถคาดเดาได้ง่าย <br/>1 = มีความสร้างสรรค์สูง)`
const TOP_P_DES = `ขอบเขตของคำตอบ:<br/>0 = มีความเจาะจงสูง <br/>1 = มีความหลากหลายสูง`

const AppSection: React.FC = () => {
  const { t } = useTranslation()
  const { track } = useGTM()
  const {
    setVisibleFeedback,
    setVisibleReport,
    successFeedback,
    successReport,
    setSuccessFeedback,
    setSuccessReport,
    setResult,
    setVote,
    setVoteReport,
    vote,
    voteReport,
  } = appStore()

  const [advance, setAdvance] = useState<boolean>(false)

  const MAX_VALUE_MAX_NEW_TOKEN = 1024
  const MAX_VALUE_TEMPERATURE = 1
  const MAX_VALUE_TOP_P = 1

  const [instruction, setInstruction] = useState<string>('')
  const [context, setContext] = useState<string>('')
  const [maxNewToken, setMaxNewToken] = useState<number>(512)
  const [temperature, setTemperature] = useState<number>(0.9)
  const [topP, setTopP] = useState<number>(0.95)

  const [loading, setLoading] = useState<boolean>(false)

  const [list, setList] = useState<IAIGenerate[]>([])

  const example = [
    {
      button: t('SUMMARIZATION'),
      instruction: 'สรุปเนื้อหาให้หน่อย',
      context:
        'สุนัขสายพันธุ์บีเกิ้ลจัดเป็นหนึ่งในสายพันธุ์ที่มีประวัติมายาวนานนับศตวรรษ แม้ว่าที่มาของชื่อ บีเกิ้ล อาจจะยังไม่เป็นที่ทราบชัดเจนนัก แต่ก็เชื่อกันว่ามาจากภาษาฝรั่งเศส begueule, beugler หรืออาจมาจากคำในภาษาอังกฤษ beag ภาษาเยอรมัน begele ก็เป็นไปได้เช่นกัน ที่มาของสายพันธุ์บีเกิ้ลนั้นเชื่อกันว่าเป็นสายพันธุ์สุนัขที่สืบเชื้อสายมาจากสุนัขที่ใช้ล่าสัตว์ โดยจัดอยู่ในกลุ่มสุนัขล่าสัตว์ขนาดเล็ก ช่วยล่าสัตว์ เช่น กระต่าย นิยมเลี้ยงมากในอังกฤษ และมีการผสมพันธุ์กับสุนัขที่อยู่ในท้องถิ่น ว่ากันว่า พระเจ้าวิลเลี่ยมที่ 1 ได้นำเอาสุนัขพันธุ์ทัลบอต (ปัจจุบันสูญพันธุ์ไปแล้ว) มาที่อังกฤษในช่วงปี ค.ศ. 1066 และเป็นต้นตระกูลของสุนัขสายพันธุ์บีเกิ้ล และฟอกซ์ฮาวน์ บีเกิ้ล กลายเป็นสุนัขสายพันธุ์ยอดนิยมในประเทศอังกฤษในช่วงของพระเจ้าเอ็ดเวิร์ดที่สอง (ปี ค.ศ.1307-1327) และพระเจ้าเฮนรี่ที่ 7 (ปี ค.ศ.1485-1509) ซึ่งบีเกิ้ลขนาดจิ๋วที่เรียกกันว่า Glove Beagle นั้นได้รับความนิยมเป็นอย่างมากในยุคนั้น เพราะเป็นสุนัขที่มีขนาดเล็กจนสามารถถือไว้ในมือได้ โดยในยุคของพระนางอลิซาเบธที่ 1 (ปี ค.ศ. 1533-1603) ได้เลี้ยงสุนัขสายพันธุ์นี้ที่มีขนาดเล็กฉบับกระเป๋า โดยมีความสูงเพียง 9 นิ้วเท่านั้น เริ่มมีการนำบีเกิ้ลมาเลี้ยงในประเทศสหรัฐอเมริกาช่วงหลังจากเหตุการณ์สงครามกลางเมือง และเป็นที่นิยมในหมู่นักล่ากระต่ายแทบจะทันที มีการจดทะเบียนสายพันธุ์บีเกิ้ลโดยสมาคมพัฒนาสายพันธุ์สุนัขแห่งอเมริกา (AKC) ในปี 1885 ซึ่งในปัจจุบันชื่อบีเกิ้ลในความหมายแถบอเมริกาเหนือจะหมายถึงสายพันธุ์ที่มีจมูกดีเป็นเลิศ เสียงไพเราะ และกระตือรื้อร้นในการล่ากระต่ายนั่นเอง',
    },
    {
      button: t('BRAINSTORMING'),
      instruction: 'อะไรขายดีสุดในช้อปปี้',
      context: 'ช้อปปี้เป็นแพลตฟอร์มอีคอมเมิร์ซ มีสำนักงานใหญ่ในประเทศสิงคโปร์',
    },
    {
      button: t('CREATIVE_WRITING'),
      instruction: 'เขียนบทความเกี่ยวกับ "ช่วงเวลาที่กินช็อคโกแลตดีที่สุด"',
      context: '',
    },
  ]

  useEffect(() => {
    if (!advance) {
      setMaxNewToken(512)
      setTemperature(0.9)
      setTopP(0.95)
    }
  }, [advance])

  const handleGenerate = async () => {
    track(EventNames.CLICK_GENERATE, {
      page: PageLocations.HOME,
    })
    setLoading(true)
    try {
      const result = await aiService.generate({
        instruction,
        context,
        max_length: maxNewToken,
        no_repeat_ngram_size: 2,
        top_k: 50,
        top_p: topP,
        typical_p: 1,
        temperature: temperature,
        begin_suppress_tokens: [0],
        suppress_tokens: [0],
      })
      if (result?.data?.data) {
        setResult(result?.data?.data)
        const text = result?.data?.data?.output.split('<bot>: ')[1]
        const pattern = /<คน>|<Bot>|<bot>|<people>|<People>/
        const splittedText = text.split(pattern)

        const data = {
          ...result?.data?.data,
          output: splittedText[0] || result?.data?.data?.output,
        }
        setList([data])
      }
    } catch (err) {}
    setSuccessFeedback(false)
    setSuccessReport(false)
    setLoading(false)
    setVote(undefined)
    setVoteReport(undefined)
  }

  const handleFeedbackUpVote = () => {
    setVisibleFeedback(true)
    setVote(Vote.GOOD)
  }

  const handleFeedbackDownVote = () => {
    setVisibleFeedback(true)
    setVote(Vote.BED)
  }

  const handleReport = () => {
    setVisibleReport(true)
    setVoteReport(Vote.REPORT)
  }

  const handleSetFromExample = (option: number, instructionValue: string, contextValue: string) => {
    setInstruction(instructionValue)
    setContext(contextValue)
    track(EventNames.SELECT_EXAMPLE, {
      page: PageLocations.HOME,
      option,
    })
  }

  return (
    <React.Fragment>
      <ModalFeedback />
      <ModalReport />

      <Container maxW="container.md">
        <Stack width="100%" my={8} spacing={6}>
          <Stack>
            <Text fontSize={{ base: 14, md: 16 }} fontWeight={400} color="#30384B">
              {t('INSTRUCTION')}
            </Text>
            <Textarea
              placeholder={String(t('INPUT_YOUR_INSTRUCTION_HERE'))}
              colorScheme="teal"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              isDisabled={loading}
              fontSize={{ base: 14, md: 16 }}
              fontWeight={300}
            />
          </Stack>

          <Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Text fontSize={{ base: 14, md: 16 }} fontWeight={400} color="#30384B">
                {t('ADDITIONAL_CONTEXT')}
              </Text>
              <Tippy content={String(t('TEXT_TO_SUMMARIZE_UNDERSTAND_OR_TRANSLATE'))}>
                <Image src="/images/icons/circle-info.svg" alt="circle-info" />
              </Tippy>
              <Text fontSize={12} fontWeight={300} color="#8A97AB">
                ({t('OPTIONAL')})
              </Text>
            </Stack>
            <Textarea
              placeholder={String(t('INPUT_YOUR_CONTEXT_HERE'))}
              colorScheme="teal"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              isDisabled={loading}
              fontSize={{ base: 14, md: 16 }}
              fontWeight={300}
            />
          </Stack>
          {/* EXAMPLE */}
          <Stack>
            <Text color="#30384B" fontSize={{ base: 14, md: 16 }} fontWeight={400}>
              {t('EXAMPLE')}
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }}>
              {example?.map((item, index) => (
                <Button
                  key={index}
                  variant="outline"
                  colorScheme="teal"
                  borderRadius={30}
                  fontSize={{ base: 13, md: 14 }}
                  fontWeight={300}
                  size="sm"
                  onClick={() => handleSetFromExample(index + 1, item?.instruction, item?.context)}
                  isDisabled={loading}
                >
                  {item?.button}
                </Button>
              ))}
            </Stack>
          </Stack>

          {/* ADVANCE */}
          <Stack direction="row">
            <Button variant="ghost" onClick={() => setAdvance(!advance)} isDisabled={loading}>
              <Stack direction="row" justifyContent="space-between" spacing={3}>
                <Stack className={`${advance ? 'rotate-180' : ''}`} direction="row">
                  <Image src="/images/icons/angle-down.svg" alt="angle-down" />
                </Stack>

                <Text color="#30384B" fontSize={{ base: 14, md: 16 }} fontWeight={300}>
                  {t('ADVANCED_OPTIONS')}
                </Text>
              </Stack>
            </Button>
          </Stack>

          {advance && (
            <Stack border="1px solid #ECEDEF" p={4} borderRadius={8}>
              <Text fontSize={{ base: 14, md: 16 }} fontWeight={400} color="##30384B">
                {t('ADVANCED_OPTIONS')}
              </Text>

              <Stack>
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  alignItems={{ base: 'left', md: 'center' }}
                  spacing={{ base: 2, md: 8 }}
                >
                  <Stack direction="row" width="210px" alignItems="center">
                    <Text fontSize={{ base: 14, md: 16 }}>{t('MAX_NEW_TOKEN')}</Text>
                    <Tippy content={<Box dangerouslySetInnerHTML={{ __html: MAX_NEW_TOKEN_DES }}></Box>}>
                      <Image src="/images/icons/circle-info.svg" alt="circle-info" height="16px" />
                    </Tippy>
                  </Stack>
                  <Stack width="100%" direction="row">
                    <Slider
                      aria-label="slider-ex-1"
                      defaultValue={512}
                      max={MAX_VALUE_MAX_NEW_TOKEN}
                      value={maxNewToken}
                      onChange={(e) => setMaxNewToken(e)}
                      isDisabled={loading}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <Stack
                      width="80px"
                      sx={{ border: '1px solid #ECEDEF' }}
                      borderRadius="8px"
                      py={1.5}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text fontSize="16px" color="#30384B">
                        {maxNewToken}
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>

                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  alignItems={{ base: 'left', md: 'center' }}
                  spacing={{ base: 2, md: 8 }}
                >
                  <Stack direction="row" width="210px" alignItems="center">
                    <Text fontSize={{ base: 14, md: 16 }}>{t('TEMPERATURE')}</Text>
                    <Tippy content={<Box dangerouslySetInnerHTML={{ __html: TEMPERATURE_DES }}></Box>}>
                      <Image src="/images/icons/circle-info.svg" alt="circle-info" height="16px" />
                    </Tippy>
                  </Stack>

                  <Stack width="100%" direction="row">
                    <Slider
                      aria-label="slider-ex-2"
                      step={0.1}
                      max={MAX_VALUE_TEMPERATURE}
                      value={temperature}
                      onChange={(e) => setTemperature(e)}
                      isDisabled={loading}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <Stack
                      width="80px"
                      sx={{ border: '1px solid #ECEDEF' }}
                      borderRadius="8px"
                      py={1.5}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text fontSize="16px" color="#30384B">
                        {temperature}
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>

                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  alignItems={{ base: 'left', md: 'center' }}
                  spacing={{ base: 2, md: 8 }}
                >
                  <Stack direction="row" width="210px" alignItems="center">
                    <Text fontSize={{ base: 14, md: 16 }}>{t('TOP_P')}</Text>
                    <Tippy content={<Box dangerouslySetInnerHTML={{ __html: TOP_P_DES }}></Box>}>
                      <Image src="/images/icons/circle-info.svg" alt="circle-info" height="16px" />
                    </Tippy>
                  </Stack>

                  <Stack width="100%" direction="row">
                    <Slider
                      aria-label="slider-ex-2"
                      step={0.1}
                      max={MAX_VALUE_TOP_P}
                      value={topP}
                      onChange={(e) => setTopP(e)}
                      isDisabled={loading}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <Stack
                      width="80px"
                      sx={{ border: '1px solid #ECEDEF' }}
                      borderRadius="8px"
                      py={1.5}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text fontSize="16px" color="#30384B">
                        {topP}
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          )}
          <Stack alignItems="center">
            <Button
              width="150px"
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
              onClick={handleGenerate}
              isDisabled={loading || instruction === ''}
              isLoading={loading}
              loadingText={t('GENERATE')}
            >
              {t('GENERATE')}
            </Button>
          </Stack>
          {list?.length && !loading && (
            <React.Fragment>
              <Stack direction="row" alignItems="center" spacing={6}>
                <Divider orientation="horizontal"></Divider>
                <Text color="#8A97AB" fontSize={{ base: 14, md: 16 }} fontWeight={400} minWidth="80px" align="center">
                  {t('OUTPUT')}
                </Text>
                <Divider orientation="horizontal"></Divider>
              </Stack>
              <Stack>
                {list?.map((item, index) => (
                  <Stack
                    key={index}
                    boxShadow="0px 0px 8px rgba(43, 114, 219, 0.1)"
                    borderRadius={10}
                    py={4}
                    px={{ base: 2, md: 4 }}
                  >
                    <Stack spacing={4} direction="row">
                      <Stack
                        height="32px"
                        width="32px"
                        minHeight="32px"
                        minWidth="32px"
                        background="linear-gradient(127.66deg, #01A1B0 30.8%, #6677EE 90.51%, #AA74EC 124.82%)"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius={32}
                        cursor="pointer"
                        userSelect="none"
                      >
                        <Text color="#fff" fontSize={12} fontWeight={400}>
                          GLM
                        </Text>
                      </Stack>
                      <Stack>
                        <Text color="#8396c1" fontSize={{ base: 14, md: 16 }} fontWeight={300}>
                          {item?.output}
                        </Text>
                        <Stack direction="row">
                          <Button
                            isDisabled={successFeedback}
                            colorScheme="teal"
                            variant={vote === Vote.GOOD && successFeedback ? 'solid' : 'outline'}
                            onClick={handleFeedbackUpVote}
                            border="1px solid #01A1B0"
                            borderRadius={20}
                            px={0}
                          >
                            <Stack
                              height="40px"
                              width="40px"
                              justifyContent="center"
                              alignItems="center"
                              userSelect="none"
                              cursor="pointer"
                            >
                              {vote === Vote.GOOD && successFeedback ? (
                                <Image src="/images/icons/thumbs-up-white.svg" alt="thumbs-up" />
                              ) : (
                                <Image src="/images/icons/thumbs-up.svg" alt="thumbs-up" />
                              )}
                            </Stack>
                          </Button>
                          <Button
                            isDisabled={successFeedback}
                            colorScheme="teal"
                            variant={vote === Vote.BED && successFeedback ? 'solid' : 'outline'}
                            onClick={handleFeedbackDownVote}
                            border="1px solid #01A1B0"
                            borderRadius={20}
                            px={0}
                          >
                            <Stack
                              height="40px"
                              width="40px"
                              justifyContent="center"
                              alignItems="center"
                              userSelect="none"
                              cursor="pointer"
                            >
                              {vote === Vote.BED && successFeedback ? (
                                <Image src="/images/icons/thumbs-down-white.svg" alt="thumbs-down" />
                              ) : (
                                <Image src="/images/icons/thumbs-down.svg" alt="thumbs-down" />
                              )}
                            </Stack>
                          </Button>

                          <Button
                            colorScheme="teal"
                            variant={successReport ? 'solid' : 'outline'}
                            borderRadius={30}
                            fontSize={14}
                            fontWeight={500}
                            onClick={handleReport}
                            isDisabled={successReport}
                            border="1px solid #01A1B0"
                          >
                            <Stack direction="row" spacing={1}>
                              {voteReport === Vote.REPORT && successReport ? (
                                <Image src="/images/icons/warning-white.svg" alt="warning" height="16px" />
                              ) : (
                                <Image src="/images/icons/warning.svg" alt="warning" height="16px" />
                              )}
                              <Text>{t('REPORT')}</Text>
                            </Stack>
                          </Button>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </React.Fragment>
          )}
          <Text color="#8A97AB" fontWeight={300} fontSize={14}>
            <Text as="b" fontWeight={500}>
              Disclaimer:
            </Text>{' '}
            {t('DISCLAIMER_DESCRIPTION')}
          </Text>
        </Stack>
      </Container>
    </React.Fragment>
  )
}

export default AppSection

import axiosInstance from '@/libs/axiosInstance'

interface SendFeedback {
  save?: string
  prompt?: string
  vote?: Vote
  feedback?: string
  maxLen?: number
  temp?: number
  topP?: number
  nameModel?: string
}
const SAVE = 'gen'
const MODEL = 'pythainlp/wangchanglm-7.5B-sft-enth-sharded'

export enum Vote {
  BED = 0,
  GOOD = 1,
  REPORT = 3,
}

const sendFeedback = async (payload: SendFeedback) => {
  const path = 'api/feedback'
  console.log('payload', payload)

  const body = {
    save: SAVE,
    prompt: payload?.prompt,
    vote: payload?.vote,
    feedback: payload?.feedback,
    maxLen: payload?.maxLen,
    temp: payload?.temp,
    topP: payload?.topP,
    modal: MODEL,
  }
  return await axiosInstance.post(path, body)
}

const feedbackService = { sendFeedback }

export default feedbackService

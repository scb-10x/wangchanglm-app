import axiosInstance from '@/libs/axiosInstance'

interface GeneratePayload {
  instruction: string
  context: string
  max_length: number
  no_repeat_ngram_size: number
  top_k: number
  top_p: number
  typical_p: number
  temperature: number
  begin_suppress_tokens: number[]
  suppress_tokens: number[]
}

const generate = async (payload: GeneratePayload) => {
  const path = 'api/generate'
  const body = payload
  return await axiosInstance.post(path, body)
}

const aiService = { generate }

export default aiService

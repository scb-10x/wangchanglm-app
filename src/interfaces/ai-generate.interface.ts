export interface IAIGenerate {
  status: string
  output: string
  message?: string
  prompt: string
  params: {
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
  is_sensitive: boolean
}

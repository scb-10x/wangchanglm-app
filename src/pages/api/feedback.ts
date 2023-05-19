// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const endpoint = 'https://wangchanglm.numfa.com/api.php'

  if (req.method === 'POST') {
    const body = req.body

    const data = {
      save: body?.save,
      prompt: body?.prompt,
      vote: body?.vote,
      feedback: body?.feedback,
      max_len: body?.maxLen,
      temp: body?.temp,
      top_p: body?.topP,
      model: body?.modal,
    }

    const params = new URLSearchParams(data)

    console.log('DX', `${endpoint}?${params.toString()}`)

    const result = await axios.get(`${endpoint}?${params.toString()}`)

    console.log('result', result)

    res.status(200).json({ data: result?.data })
  }
}

export default handler

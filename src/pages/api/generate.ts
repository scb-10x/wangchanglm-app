// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const endpoint = `${process.env.BASE_API}`

  if (req.method === 'POST') {
    const body = req.body
    const result = await axios.post(endpoint, body)
    console.log('RESULT', result)

    res.status(200).json({ data: result?.data })
  }
}

export default handler

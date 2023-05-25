// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import team from '@/team'

export default function handler(req, res) {
    const teammember = team.find((p) => p.slug == req.query.slug)
    res.status(200).json(teammember)
}
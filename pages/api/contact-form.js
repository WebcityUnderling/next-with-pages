// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const valid = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(!req.body.triggerSendingFail);
    }, 1500);
  }); //artificial wait time

  if (!valid) {
    res
      .status(422).json({errors: {
        you_asked_for_it: 'You wanted your submission to fail. So we provided.'
      }});
  } else {
    res.status(200).json({});
  }
}

import express from 'express';
const router = express.Router();

router.post('/send_post', async function (req: any, res: any) {
  try {
    //console.log("url=", process.env.API_URL);
    const url = process.env.EXTERNAL_API_URL;
    //console.log(req.body);
    const path = req.body.api_url;
    console.log('path=', url + path);
    const response = await fetch(url + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: req.body,
    });
    // const data = response.data;
    //console.log(data);
    //@ts-ignore
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;

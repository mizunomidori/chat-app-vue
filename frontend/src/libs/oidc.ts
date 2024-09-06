// https://docs.aws.amazon.com/ja_jp/elasticloadbalancing/latest/application/listener-authenticate-users.html

import jwt from 'jsonwebtoken';
import jwks from 'jwks-rsa';

const postData = async (url: string, data: string) => {
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data,
  });
  return response.json();
};

export const getCredential = () => {
  const query = location.search.replace('?', '');
  const authCode = query.split('=')[1];

  const clientId = 'クライアントID';
  const endpoint = 'https://test0987.auth.ap-northeast-1.amazoncognito.com/oauth2/token';

  // application/x-www-form-urlencoded形式でbodyを作成
  const requestBody = `grant_type=authorization_code&client_id=${clientId}&scope=openid&redirect_uri=http://localhost:8080/&code=${authCode}`;

  postData(endpoint, requestBody).then((data) => {
    console.log(data);
  });
};

export const activate = async (req: any, res: any) => {
  const region = 'ap-northeast-1';
  const token = req.header('x-amzn-oidc-data');

  const decodedJwt = jwt.decode(token, { complete: true });
  const kid = decodedJwt?.header.kid;

  const response = await fetch(`https://public-keys.auth.elb.${region}.amazonaws.com/${kid}`);
  const pem = await response.text();

  const client = jwks({
    jwksUri: pem,
  });

  const signingKey = await client.getSigningKey(kid);
  const pubKey = signingKey.getPublicKey();
  const isValid = jwt.verify(token, pubKey, { algorithms: ['ES256'] });
  if (isValid) {
    console.log(isValid); // JWT payload
  } else {
    console.log('invalid');
  }
};

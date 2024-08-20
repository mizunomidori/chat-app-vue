import { CognitoJwtVerifier } from 'aws-jwt-verify';

// Verifier that expects valid access tokens:
const verifier = CognitoJwtVerifier.create({
  userPoolId: '<user_pool_id>',
  tokenUse: 'access',
  clientId: '<client_id>',
});

try {
  const payload = await verifier.verify(
    'eyJraWQeyJhdF9oYXNoIjoidk...', // the JWT as string
  );
  console.log('Token is valid. Payload:', payload);
} catch {
  console.log('Token not valid!');
}

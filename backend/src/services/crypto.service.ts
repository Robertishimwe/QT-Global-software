import { generateKeyPairSync, createSign, createHash, KeyObject } from 'crypto';


const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048, 
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8', 
    format: 'pem',
  },
});


export const getPublicKey = (): string => {
  return publicKey;
};


export const hashEmail = (email: string): string => {
  const hash = createHash('sha384');
  hash.update(email);
  return hash.digest('hex');
};

export const signData = (data: string): string => {
  const signer = createSign('sha384');
  signer.update(data, 'hex'); 
  signer.end();
  return signer.sign(privateKey, 'hex');
}
/**
 * Cryptographic utilities for user signature verification
 */

/**
 * Convert a hex string to ArrayBuffer
 */
function hexToArrayBuffer(hexString: string): ArrayBuffer {
  const bytes = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < hexString.length; i += 2) {
    bytes[i / 2] = parseInt(hexString.substr(i, 2), 16);
  }
  return bytes.buffer as ArrayBuffer;
}

/**
 * Convert PEM formatted public key to ArrayBuffer
 */
function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace('-----BEGIN PUBLIC KEY-----', '')
    .replace('-----END PUBLIC KEY-----', '')
    .replace(/\s/g, '');
  
  const binaryString = window.atob(b64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Hash a string using SHA-384
 */
async function hashString(data: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  return await window.crypto.subtle.digest('SHA-384', dataBuffer);
}

/**
 * Import a public key from PEM format
 */
async function importPublicKey(pemKey: string): Promise<CryptoKey> {
  const keyData = pemToArrayBuffer(pemKey);
  
  return await window.crypto.subtle.importKey(
    'spki',
    keyData,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-384',
    },
    true,
    ['verify']
  );
}

/**
 * Verify a signature using the Web Crypto API
 * 
 * @param email - The plain text email to verify
 * @param signature - The signature as a hex string
 * @param publicKey - The public key in PEM format
 * @returns true if the signature is valid, false otherwise
 */
export async function verifySignature(
  email: string,
  signature: string,
  publicKey: string
): Promise<boolean> {
  try {
    console.log('[verifySignature] Starting verification for:', email);
    
    // Step 1: Hash the email using SHA-384
    const hashedEmail = await hashString(email);
    console.log('[verifySignature] Email hashed successfully');
    
    // Step 2: Import the public key
    const cryptoKey = await importPublicKey(publicKey);
    console.log('[verifySignature] Public key imported successfully');
    
    // Step 3: Convert signature from hex to ArrayBuffer
    const signatureBuffer = hexToArrayBuffer(signature);
    console.log('[verifySignature] Signature converted from hex');
    
    // Step 4: Verify the signature
    const isValid = await window.crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5',
      cryptoKey,
      signatureBuffer,
      hashedEmail
    );
    
    console.log('[verifySignature] Verification result:', isValid);
    return isValid;
  } catch (error) {
    console.error('[verifySignature] Error verifying signature:', error);
    return false;
  }
}

import crypto from 'react-native-quick-crypto';

export const CRYPTO_CURVE_NAME = 'prime192v1';
export const CRYPTO_CIPHER_ALGO = 'aes-256-ctr';

export async function encrypt(text, secretKey) {
	try {
		const iv = crypto.randomBytes(16);
		const cipher = crypto.createCipheriv(CRYPTO_CIPHER_ALGO, secretKey, iv);
		const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
		return {
			iv: iv.toString('hex'),
			content: encrypted.toString('base64'),
		};
	} catch (err) {
		console.info('Error encrypt method: ', err, ' in crypto.js');
		return null;
	}
}

export async function decrypt(hash, secretKey) {
	try {
		const decipher = crypto.createDecipheriv(CRYPTO_CIPHER_ALGO, secretKey, Buffer.from(hash.iv, 'hex'));
		const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'base64')), decipher.final()]);
		return decrypted.toString();
	} catch (err) {
		console.info('Error decrypt method: ', err, ' in crypto.js');
		return null;
	}
}

export function generatePairOfKeys() {
	try {
		const ecdh = crypto.createECDH(CRYPTO_CURVE_NAME);
		ecdh.generateKeys();

		const privateKey = ecdh.getPrivateKey().toString('base64');
		const publicKey = ecdh.getPublicKey().toString('base64');

		return {
			privateKey,
			publicKey,
		};
	} catch (err) {
		console.info('Error generatePairOfKeys method: ', err, ' in crypto.js');
		return null;
	}
}

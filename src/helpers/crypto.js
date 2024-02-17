import crypto from 'react-native-quick-crypto';

export async function encrypt(text, secretKey) {
	try {
		const algorithm = 'aes-256-ctr';
		const iv = crypto.randomBytes(16);
		const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
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
		const algorithm = 'aes-256-ctr';
		const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
		const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'base64')), decipher.final()]);
		return decrypted.toString();
	} catch (err) {
		console.info('Error decrypt method: ', err, ' in crypto.js');
		return null;
	}
}

// export function createECDHObject(privateKey) {
// 	const curveName = 'prime192v1';
// 	const ecdh = crypto.createECDH(curveName);
// 	ecdh.generateKeys();
// }

import { randomBytes, createCipheriv, createDecipheriv } from 'react-native-quick-crypto';

// Encriptar mensaje
export const encrypt = async (text, secretKey) => {
	try {
		const algorithm = 'aes-256-ctr';
		const iv = randomBytes(16);
		const cipher = createCipheriv(algorithm, secretKey, iv);
		const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
		return {
			iv: iv.toString('hex'),
			content: encrypted.toString('base64'),
		};
	} catch (err) {
		console.info('ERROR ', err);
	}
};

// Desencriptar mensaje
export const decrypt = async (hash, secretKey) => {
	const algorithm = 'aes-256-ctr';
	const decipher = createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
	const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'base64')), decipher.final()]);
	return decrypted.toString();
};

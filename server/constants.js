import fs from 'fs';

export const DEFAULT_COLOR = '#303030';
export const DEFAULT_X = 16;
export const DEFAULT_Y = 16;
export const MAX_HISTORY_SIZE = 1000;

export const KEYS_OPTIONS = {
	key: fs.readFileSync('./ssl/privateKey.key'), // PRIVATE KEY
	cert: fs.readFileSync('./ssl/cerfKey.pem'), // CERTIFICATE
};

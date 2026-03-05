export interface LoginReqDto {
	phone: string;
	password: string;
}

export interface RegisterReqDto {
	phone: string;
	password: string;
	firstName?: string;
	lastName?: string;
}

export interface RefreshTokenReqDto {
	refreshToken: string;
}

export interface TelegramAuthReqDto {
	initData: string; // Telegram Mini App raw initData string (единственное обязательное поле)
}

export interface TokenDto {
	accessToken: string;
	refreshToken: string;
	tokenType: string;
}

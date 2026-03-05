export interface FavoriteDto {
	id: number;
	userId: number;
	productId: number;
	productName: string;
	createdAt: string;
}

export interface FavoriteReqDto {
	productId: number;
}

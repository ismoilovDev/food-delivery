export function formatPrice(price: number): string {
	return new Intl.NumberFormat("ru-RU").format(price);
}

// Java LocalDateTime comes as [year, month, day, hour, minute, second, nanosecond]
export function formatDate(date: string | number[]): string {
	if (Array.isArray(date)) {
		const [year, month, day] = date;
		return `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year}`;
	}
	return date.slice(0, 10).split("-").reverse().join(".");
}

export function formatDateTime(date: string | number[]): string {
	if (Array.isArray(date)) {
		const [year, month, day, hour, minute] = date;
		return `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
	}
	return date.slice(0, 16).replace("T", " ");
}

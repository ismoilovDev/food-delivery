export function formatPrice(price: number): string {
	return new Intl.NumberFormat("ru-RU").format(price);
}

// Java LocalDateTime comes as [year, month, day, hour, minute, second, nanosecond]
type JavaDateInput = string | number[];

function toDate(date: JavaDateInput): Date {
	if (Array.isArray(date)) {
		const [year, month, day, hour = 0, minute = 0, second = 0] = date;
		return new Date(year, month - 1, day, hour, minute, second);
	}
	return new Date(date);
}

const pad = (n: number) => String(n).padStart(2, "0");

export function formatDate(date: JavaDateInput): string {
	const d = toDate(date);
	return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
}

export function formatDateTime(date: JavaDateInput): string {
	const d = toDate(date);
	return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function formatTime(date: JavaDateInput): string {
	const d = toDate(date);
	return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

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

// Java LocalTime [hour, minute] -> "HH:mm"
export function formatLocalTime(time?: [number, number] | null): string {
	if (!time) return "";
	const [hour = 0, minute = 0] = time;
	return `${pad(hour)}:${pad(minute)}`;
}

// Joriy vaqt ish vaqti oralig'idami? Yarim tunni kesib o'tuvchi
// oraliqlarni ham hisobga oladi (masalan, 22:00–02:00).
export function isWithinWorkingHours(
	start?: [number, number] | null,
	end?: [number, number] | null
): boolean {
	if (!start || !end) return false;
	const now = new Date();
	const minutesNow = now.getHours() * 60 + now.getMinutes();
	const startMin = start[0] * 60 + start[1];
	const endMin = end[0] * 60 + end[1];

	if (startMin === endMin) return true; // 24 soat ochiq
	if (startMin < endMin) return minutesNow >= startMin && minutesNow < endMin;
	// Yarim tunni kesib o'tadi (masalan, 22:00–02:00)
	return minutesNow >= startMin || minutesNow < endMin;
}

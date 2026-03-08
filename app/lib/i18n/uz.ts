export const uz = {
	// Auth
	auth: {
		loading: "Yuklanmoqda...",
		welcome: "Xush kelibsiz!",
		authError: "Kirish xatosi",
		retry: "Qayta urinish",
		telegramRequired: "Bu ilova faqat Telegram orqali ishlaydi",
	},

	// Bottom Nav
	nav: {
		menu: "Menyu",
		cart: "Savatcha",
		profile: "Profil",
	},

	// Menu
	menu: {
		title: "Menyu",
		search: "Qidirish...",
		all: "Barchasi",
		empty: "Mahsulotlar topilmadi",
		addToCart: "Savatchaga qo'shish",
	},

	// Product
	product: {
		ingredients: "Tarkibi",
		allergens: "Allergенlar",
		calories: "Kaloriya",
		weight: "Og'irligi",
		prepTime: "Tayyorlash vaqti",
		inCart: "Savatchada",
		addToCart: "Savatchaga qo'shish",
		vegetarian: "Vegetarian",
		spicy: "Achchiq",
		rating: "Reyting",
		reviews: "sharhlar",
		price: "Narx",
		discountPrice: "Chegirmali narx",
	},

	// Cart
	cart: {
		title: "Savatcha",
		empty: "Savatcha bo'sh",
		emptyDesc: "Menyu sahifasidan mahsulot qo'shing",
		goToMenu: "Menyuga o'tish",
		items: "mahsulot",
		subtotal: "Jami",
		deliveryFee: "Yetkazib berish",
		discount: "Chegirma",
		total: "Umumiy",
		promo: "Promo kod",
		promoPlaceholder: "Promo kodni kiriting",
		apply: "Qo'llash",
		remove: "O'chirish",
		address: "Manzil",
		selectAddress: "Manzilni tanlang",
		addAddress: "Yangi manzil qo'shish",
		addressSection: "Yetkazib berish manzili",
		pickLocation: "Manzilni tanlang",
		useCurrentLocation: "Joriy joylashuvdan foydalanish",
		confirmAddress: "Saqlash",
		loadingAddress: "Manzil aniqlanmoqda...",
		paymentMethod: "To'lov usuli",
		cash: "Naqd pul",
		card: "Karta",
		notes: "Izoh",
		notesPlaceholder: "Buyurtma uchun izoh...",
		promoError: "Promo kod yaroqsiz yoki qo'llab bo'lmadi",
		placeOrder: "Buyurtma berish",
		orderSuccess: "Buyurtma muvaffaqiyatli qabul qilindi!",
		orderError: "Buyurtma berishda xato yuz berdi",
		free: "Bepul",
		freeDeliveryFrom: "dan bepul yetkazib berish",
	},


	// Profile
	profile: {
		title: "Profil",
		orders: "Buyurtmalarim",
		info: "Shaxsiy ma'lumotlar",
		addresses: "Manzillarim",
		language: "Til",
		logout: "Chiqish",
		logoutConfirm: "Chiqishni istaysizmi?",
		yes: "Ha",
		no: "Yo'q",
	},

	// Orders
	orders: {
		title: "Buyurtmalarim",
		empty: "Buyurtmalar yo'q",
		emptyDesc: "Hali buyurtma bermagansiz",
		orderNumber: "Buyurtma raqami",
		status: {
			PENDING: "Kutilmoqda",
			CONFIRMED: "Tasdiqlandi",
			PREPARING: "Tayyorlanmoqda",
			READY_FOR_DELIVERY: "Yetkazib berishga tayyor",
			ASSIGNED_TO_COURIER: "Kuryerga tayinlandi",
			PICKED_UP: "Olib ketildi",
			IN_DELIVERY: "Yetkazib berilmoqda",
			DELIVERED: "Yetkazib berildi",
			CANCELLED: "Bekor qilindi",
			REJECTED: "Rad etildi",
		},
		total: "Jami",
		items: "mahsulot",
		cancel: "Bekor qilish",
		cancelConfirm: "Buyurtmani bekor qilishni istaysizmi?",
		rate: "Baholash",
		rateOrder: "Buyurtmani baholang",
		createdAt: "Buyurtma vaqti",
	},

	// Profile Info
	info: {
		title: "Shaxsiy ma'lumotlar",
		firstName: "Ism",
		lastName: "Familiya",
		phone: "Telefon raqam",
		save: "Saqlash",
		saved: "Saqlandi!",
		error: "Saqlashda xato",
	},

	// Addresses
	addresses: {
		title: "Manzillarim",
		empty: "Manzillar yo'q",
		addNew: "Yangi manzil qo'shish",
		default: "Asosiy",
		setDefault: "Asosiy qilish",
		delete: "O'chirish",
		deleteConfirm: "Manzilni o'chirishni istaysizmi?",
		address: "Manzil",
		label: "Yorliq",
		labelPlaceholder: "Uy, Ish...",
		phone: "Telefon",
		recipient: "Qabul qiluvchi",
		save: "Saqlash",
		latitude: "Kenglik",
		longitude: "Uzunlik",
		locationHint: "Manzil va koordinatalarni kiriting",
	},

	// Language
	language: {
		title: "Til",
		uz: "O'zbek",
		ru: "Русский",
		select: "Tilni tanlang",
	},

	// Common
	common: {
		loading: "Yuklanmoqda...",
		error: "Xato yuz berdi",
		retry: "Qayta urinish",
		save: "Saqlash",
		cancel: "Bekor qilish",
		delete: "O'chirish",
		edit: "Tahrirlash",
		back: "Orqaga",
		confirm: "Tasdiqlash",
		close: "Yopish",
		sum: "so'm",
		currency: "so'm",
	},
};

export type TranslationKeys = typeof uz;

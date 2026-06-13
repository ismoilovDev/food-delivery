import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Lang, translations } from "~/lib/i18n";

interface I18nState {
	lang: Lang;
	t: typeof translations.uz;
	setLang: (lang: Lang) => void;
}

export const useI18nStore = create<I18nState>()(
	persist(
		(set) => ({
			lang: "uz",
			t: translations.uz,
			setLang: (lang) => set({ lang, t: translations[lang] }),
		}),
		{
			name: "i18n-storage",
			// Faqat `lang` saqlanadi. `t` har doim joriy koddan qayta hisoblanadi —
			// aks holda eski saqlangan tarjima yangi kalitlarni (masalan, `restaurants`)
			// bekor qilib, `undefined` xatolariga olib keladi.
			partialize: (state) => ({ lang: state.lang }),
			merge: (persisted, current) => {
				const lang = (persisted as { lang?: Lang } | undefined)?.lang ?? current.lang;
				return { ...current, lang, t: translations[lang] };
			},
		}
	)
);

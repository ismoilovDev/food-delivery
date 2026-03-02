import { create } from "zustand";
import { persist } from "zustand/middleware";
import { translations, type Lang } from "~/lib/i18n";

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
    }
  )
);

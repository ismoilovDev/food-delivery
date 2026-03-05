import { uz } from "./uz";
import { ru } from "./ru";
import type { I18nText } from "~/lib/api/types/common";

export type Lang = "uz" | "ru";

export const translations = { uz, ru } as const;

export type TranslationKeys = typeof uz;

export { uz, ru };

export function localName(
  text: I18nText | string | null | undefined,
  lang: Lang,
  fallback = ""
): string {
  if (!text) return fallback;
  if (typeof text === "string") return text || fallback;
  return text[lang] || text.uz || text.en || fallback;
}

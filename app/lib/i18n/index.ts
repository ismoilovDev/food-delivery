import { uz } from "./uz";
import { ru } from "./ru";

export type Lang = "uz" | "ru";

export const translations = { uz, ru } as const;

export type TranslationKeys = typeof uz;

export { uz, ru };

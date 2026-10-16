export const SITE_LANGUAGE_STORAGE_KEY = "softech-navigation-language";
export const SITE_LANGUAGE_CHANGE_EVENT = "softech:language-change";

export type SiteLanguage = "en" | "fa-AF" | "ps";

export function isSiteLanguage(value: string | null): value is SiteLanguage {
  return value === "en" || value === "fa-AF" || value === "ps";
}

export function setSiteLanguage(language: SiteLanguage) {
  window.localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, language);
  window.dispatchEvent(
    new CustomEvent<SiteLanguage>(SITE_LANGUAGE_CHANGE_EVENT, {
      detail: language,
    }),
  );
}

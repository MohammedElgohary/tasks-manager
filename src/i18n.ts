import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { Direction, Language } from "@/models";
import dayjs from "dayjs";
import "dayjs/locale/ar";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    // debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
    supportedLngs: [Language.ENGLISH, Language.ARABIC],
    fallbackLng: Language.ENGLISH,
  });

export default i18n;

// Update dayjs locale when language changes
i18n.on("languageChanged", (language) => {
  dayjs.locale(language);
  document.body.lang = language;
  document.documentElement.lang = language;
  document.body.dir =
    language === Language.ARABIC ? Direction.RTL : Direction.LTR;
});

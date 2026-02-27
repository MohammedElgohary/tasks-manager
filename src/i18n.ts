import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { Direction, Language } from "@/models";
import dayjs from "dayjs";
import "dayjs/locale/ar";

i18n
  .use(
    resourcesToBackend(
      (lng: string, ns: string) => import(`./locales/${lng}/${ns}.json`),
    ),
  )
  .use(initReactI18next)
  .init({
    fallbackLng: Language.ENGLISH,
    supportedLngs: [Language.ENGLISH, Language.ARABIC],
    ns: ["translation"],
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false, // Important – avoids Suspense hanging
    },
  });

// Update dayjs locale when language changes
i18n.on("languageChanged", (language) => {
  dayjs.locale(language);

  document.body.lang = language;
  document.documentElement.lang = language;

  document.body.dir =
    language === Language.ARABIC ? Direction.RTL : Direction.LTR;
});

export default i18n;

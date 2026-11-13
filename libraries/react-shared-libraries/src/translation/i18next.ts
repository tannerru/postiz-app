import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { fallbackLng, languages, defaultNS } from './i18n.config';
import { brandText } from '@gitroom/helpers/utils/brand';
const runsOnServerSide = typeof window === 'undefined';

i18next
  // White-label: every translated string shows the brand name
  .use({
    type: 'postProcessor',
    name: 'brand',
    process: (value: string) => brandText(value),
  })
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: any, namespace: any) => {
      return import(`./locales/${language}/${namespace}.json`);
    })
  )
  .init({
    supportedLngs: languages,
    fallbackLng,
    lng: undefined,
    fallbackNS: defaultNS,
    defaultNS,
    postProcess: ['brand'],
    detection: {
      order: ['cookie', 'header'],
    },
    preload: runsOnServerSide ? languages : [],
  });

export default i18next;

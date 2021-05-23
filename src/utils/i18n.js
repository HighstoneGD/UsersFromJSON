import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n.use(LanguageDetector).use(initReactI18next).init({
    fallbackLng: 'en',
    debug: true,
    detection: {
        order: ['queryString', 'cookie'],
        cache: ['c']
    },
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: {
            translation: {
                "sort": "Sort by",
                "name": "Name",
                "age": "Age",
                "ascend": "Ascending",
                "descend": "Descending",
                "mode": "Mode",
                "table": "Table",
                "preview": "Preview",
                "search": "Search",
                "years": "years"
            }
        },
        ru: {
            translation: {
                "sort": "Сортировка",
                "name": "Имя",
                "age": "Возраст",
                "ascend": "По возрастанию",
                "descend": "По спаданию",
                "mode": "Вид",
                "table": "Таблица",
                "preview": "Превью",
                "search": "Поиск",
                "years": "лет"
            }
        }
    }
})

export default i18n
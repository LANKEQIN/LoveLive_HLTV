/**
 * i18n 模块统一出口
 */

export { I18nProvider } from './I18nContext'
export { useI18n } from './useI18n'
export { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './constants'
export { translations, t } from './translations'
export {
  getRoleEn,
  getBirthplaceEn,
  getSchoolEn,
  getGradeEn,
  getColorNameEn,
} from './dataTranslations'

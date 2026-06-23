/**
 * 国际化上下文
 * 提供当前语言、切换语言方法以及翻译函数
 * 语言偏好持久化到 localStorage
 */

import { createContext, useState, useCallback, useMemo } from 'react'
import { translations, t as translate } from './translations'
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './constants'

// localStorage 键名
const STORAGE_KEY = 'lovelive-hltv-lang'

/**
 * 从 localStorage 读取保存的语言设置
 * @returns {string}
 */
function getStoredLanguage() {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE
  }
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
    return stored
  }
  return DEFAULT_LANGUAGE
}

/**
 * 将语言设置保存到 localStorage
 * @param {string} lang
 */
function setStoredLanguage(lang) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, lang)
  }
}

// 创建上下文
const I18nContext = createContext(null)

/**
 * I18n 提供者
 * 包裹应用根组件，提供语言状态和翻译能力
 */
export function I18nProvider({ children }) {
  const [lang, setLang] = useState(getStoredLanguage)

  // 切换语言
  const setLanguage = useCallback((nextLang) => {
    if (SUPPORTED_LANGUAGES.includes(nextLang)) {
      setLang(nextLang)
      setStoredLanguage(nextLang)
    }
  }, [])

  // 当前语言字典
  const dict = useMemo(() => translations[lang] ?? translations[DEFAULT_LANGUAGE], [lang])

  // 翻译函数，绑定当前语言字典
  const t = useCallback(
    (key, vars) => translate(dict, key, vars),
    [dict]
  )

  const value = useMemo(
    () => ({ lang, setLanguage, t, dict }),
    [lang, setLanguage, t, dict]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export default I18nContext

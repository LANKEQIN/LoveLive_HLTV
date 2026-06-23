/**
 * useI18n 自定义 Hook
 * 将 Hook 与 Provider 组件分文件，避免 Fast Refresh 仅导出组件的警告
 */

import { useContext } from 'react'
import I18nContext from './I18nContext'

/**
 * 在组件中获取国际化上下文
 * @returns {{ lang: string, setLanguage: Function, t: Function, dict: object }}
 */
export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

export default useI18n

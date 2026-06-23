import { useI18n } from '../i18n'

/**
 * 底部页脚组件
 * HLTV 风格的简洁页脚
 */
function Footer() {
  const { lang } = useI18n()

  return (
    <footer className="bg-hltv-bg-secondary border-t border-hltv-border mt-auto">
      <div className="px-4 py-3 flex items-center justify-between text-xs text-hltv-text-dim">
        <div>
          <span className="text-hltv-accent font-bold">LoveLive!</span>{' '}
          <span className="text-hltv-text-bright font-bold">HLTV</span>
          <span className="ml-2">
            — {lang === 'en' ? 'Unofficial fan data platform' : '非官方粉丝数据平台'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>Data based on public information</span>
          <span className="text-hltv-border-light">|</span>
          <span>Made with love for LoveLive! fans</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

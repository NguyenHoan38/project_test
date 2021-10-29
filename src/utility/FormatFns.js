import format from 'date-fns/format'
import locale from 'date-fns/locale/vi'

class FormatFns {
  formatDateTime(date, pattern) {
    return format(date, pattern, { locale })
  }
}

export default new FormatFns()

import $ from 'jquery'
import Alert from './bootstrapjs/alert'
import Button from './bootstrapjs/button'
import Carousel from './bootstrapjs/carousel'
import Collapse from './bootstrapjs/collapse'
import Dropdown from './bootstrapjs/dropdown'
import Modal from './bootstrapjs/modal'
import Popover from './bootstrapjs/popover'
import Scrollspy from './bootstrapjs/scrollspy'
import Tab from './bootstrapjs/tab'
import Toast from './bootstrapjs/toast'
import Tooltip from './bootstrapjs/tooltip'
import Util from './bootstrapjs/util'

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

(() => {
  if (typeof $ === 'undefined') {
    throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.')
  }

  const version = $.fn.jquery.split(' ')[0].split('.')
  const minMajor = 1
  const ltMajor = 2
  const minMinor = 9
  const minPatch = 1
  const maxMajor = 4

  if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
  }
})()

export {
  Util,
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Popover,
  Scrollspy,
  Tab,
  Toast,
  Tooltip
}

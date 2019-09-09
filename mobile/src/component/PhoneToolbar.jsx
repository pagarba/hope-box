
import React from 'react'

import Icon from './Icon'

const PhoneToolbar = ({carrier, connected, network}) => (
  <div className="toolbar">
    <div>{carrier}</div>
    <div className="right">
      <Icon name={connected ? 'signal_wifi_4_bar_lock' : 'signal_wifi_off'} />
      <i>{network}</i>
      <Icon name={connected ? 'signal_cellular_alt' : 'signal_cellular_off'} />
      <Icon name="battery_std" />
    </div>
  </div>
)

export default PhoneToolbar

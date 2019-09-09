
import React from 'react'

import Icon from './Icon'

const PhoneButtons = ({onPhone, onSMS}) => {
  return (
    <div className="buttons">
      <div className="button">
        {onPhone && <a href="#" onClick={onPhone}><Icon name="phone" /></a>}
        {!onPhone && <Icon name="phone" />}
      </div>
      <div className="button">
        {onSMS && <a href="#" onClick={onSMS}><Icon name="textsms" /></a>}
        {!onSMS && <Icon name="textsms" />}
      </div>
      <div className="button">
        <Icon name="apps" />
      </div>
      <div className="button">
        <Icon name="open_in_browser" />
      </div>
      <div className="button">
        <Icon name="camera" />
      </div>
    </div>
  )
}

export default PhoneButtons

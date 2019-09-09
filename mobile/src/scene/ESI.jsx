
import React from 'react'

const esiColors = {
  0: 'success',
  1: 'danger',
  2: 'warning',
  3: 'info',
  4: 'gray',
  5: 'white',
}

const esiNames = {
  0: 'Healthy - Assumed healthy and possibly fit to help others',
  1: 'Resuscitation - Immediate, life-saving intervention required without delay',
  2: 'Emergent - High risk of deterioration, or signs of a time-critical problem',
  3: 'Urgent - Stable, with multiple types of resources needed to investigate or treat (such as lab tests plus X-ray imaging)',
  4: 'Less Urgent - Stable, with only one type of resource anticipated (such as only an X-ray, or only sutures)',
  5: 'Nonurgent - Stable, with no resources anticipated except oral or topical medications, or prescriptions',
}

const ESI = props => (
  <div className="middle full">
    <div className="text-big text-center">
      Emergency Severity Index:
      <h1 className={`text-${esiColors[props.esi]}`}>{props.esi}</h1>
      <div className="margin-bottom">{esiNames[props.esi]}</div>
      <div className="margin-top text-small text-gray">
        To redo the questionnaire click <u>Prev</u> in the left menu.
      </div>
    </div>
  </div>
)

export default ESI


import {connect} from 'react-redux'
import React from 'react'

import {texts} from '../Steps'

class Information extends React.Component {
  getSections = step => {
    const comps = []
    const keys = Object.keys(texts).sort()
    for(let i = 0; i < keys.length; i++) {
      const key = keys[i]
      comps.push(
        <p className={key <= (step + 0.999) ? 'show' : ''} key={`${i}`}>
          <div dangerouslySetInnerHTML={{__html: texts[key]}} />
        </p>
      )
    }
    return comps.reverse()
  }

  render() {
    return (
      <div className="information">
        <div className="content">
          {this.getSections(this.props.step)}
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({

})

const mapState = state => ({
  step: state.step,
})

export default connect(mapState, mapDispatch)(Information)


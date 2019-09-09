
import {connect} from 'react-redux'
import React from 'react'

import {esi, step} from '../Actions'
import {scenes} from '../Steps'

import PhoneButtons from '../component/PhoneButtons'
import PhoneToolbar from '../component/PhoneToolbar'

class Phone extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      handleSMS: null,
      nextHandler: this.handleNext,
    }
  }

  handleNext = () => {
    this.handleStep(this.props.step + 1)
  }

  handleStep = step => {
    this.setState({handleSMS: null, nextHandler: this.handleNext}, () => {
      if (step >= Object.keys(scenes).length) return
      this.props.dispatchStep(step)
    })
  }

  render() {
    const scene = scenes[this.props.step]
    const PhoneScene = scene[0]

    return (
      <div className="phone">
        <div className="background">
          <img alt="Phone Simulator" src="img/phone.png" />
        </div>
        <div className="content">
          <PhoneToolbar
            carrier={scene[1]}
            connected={scene[2]}
            network={scene[3]} />
          <PhoneScene
            esi={this.props.esi}
            onEsi={this.props.dispatchEsi}
            onNext={this.handleNext}
            registerNext={nextHandler => this.setState({nextHandler})}
            registerSMS={handleSMS => this.setState({handleSMS})} />
          <PhoneButtons
            onPhone={scene[4] ? this.state.nextHandler: null}
            onSMS={this.state.handleSMS} />
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  dispatchEsi: n => dispatch(esi(n)),
  dispatchStep: n => dispatch(step(n)),
})

const mapState = state => ({
  esi: state.esi,
  step: state.step,
})

export default connect(mapState, mapDispatch)(Phone)

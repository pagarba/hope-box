
import {connect} from 'react-redux'
import React from 'react'

import {step} from '../Actions'
import {scenes} from '../Steps'

class Menu extends React.Component {
  handleStep = step => {
    if (step >= Object.keys(scenes).length) return
    this.props.dispatchStep(step)
  }

  render() {
    return (
      <div className="menu">
        <div className="logo">
          <img alt="HopeBox by Pagarba" src="img/logo.jpg" />
        </div>
        <div className="divider" />
        <div className="links">
          {!!this.props.step &&
            <a href="#" onClick={() => this.handleStep(this.props.step + 1)}>
              Next
            </a>
          }
          {this.props.step > 1 &&
            <a href="#" onClick={() => this.handleStep(this.props.step - 1)}>
              Prev
            </a>
          }
          <div className="divider" />
          {!this.props.step &&
            <a href="#" onClick={() => this.handleStep(1)}>
              Start
            </a>
          }
          {!!this.props.step &&
            <a href="#" onClick={() => this.handleStep(0)}>
              Restart
            </a>
          }
        </div>
        <div className="divider" />
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  dispatchStep: n => dispatch(step(n)),
})

const mapState = state => ({
  step: state.step,
})

export default connect(mapState, mapDispatch)(Menu)

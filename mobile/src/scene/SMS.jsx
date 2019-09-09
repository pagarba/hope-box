
import React from 'react'

import Messages from '../component/Messages'

class SMS extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      flow: 0,
      open: false,
    }
  }

  componentDidMount() {
    if (this.props.registerSMS) this.props.registerSMS(this.handleToggle)
  }

  componentWillUnmount() {
    if (this.props.registerSMS) this.props.registerSMS(null)
  }

  handleToggle = () => this.setState({open: !this.state.open})

  render() {
    const comps = []
    comps.push(
      <div className="middle full" key="message">
        <div className="margin-top text-big text-center">
          <div className="margin-bottom">
            Click on the SMS icon below to simulate an interaction between a user
            and the artificial intelligence bot.
          </div>
        </div>
      </div>
    )

    if (this.state.open) {
      comps.push(
        <Messages
          flow={this.state.flow}
          key="messages" />
      )
    }

    return comps
  }
}

export default SMS

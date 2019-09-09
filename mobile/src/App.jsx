
import React from 'react'

import Information from './container/Information'
import Menu from './container/Menu'
import Phone from './container/Phone'

export default class App extends React.Component {
  render() {
    return (
      <div className="row background-secondary">
        <div className="col-sm-12 col-md-2">
          <Menu />
        </div>
        <div className="col-sm-12 col-md-5">
          <Phone />
        </div>
        <div className="col-sm-12 col-md-5">
          <Information step={this.props.step} />
        </div>
      </div>
    )
  }
}

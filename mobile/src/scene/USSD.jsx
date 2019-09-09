
import React from 'react'

import DialPad from '../component/DialPad'

export const Alert = 'You are connected to an emergency response system, please call *911# for further assistance.'
export const Q1 = 'Is their an immediate threat to your life, medical or otherwise? Call: *1# for yes *2# for no'
export const Q2 = 'Are you experiencing any medical complications at this time? Call: *1# for yes *2# for no'
export const Q3 = 'Do you have trouble breathing or major blood loss? Call: *1# for yes *2# for no'
export const Q4 = 'Do you have chest pains or major lacerations? Call: *1# for yes *2# for no'
export const Q5 = 'Do you have abdominal pain or a fractured bone? Call: *1# for yes *2# for no'
export const Q6 = 'Do you have minor pain or lacerations? Call: *1# for yes *2# for no'
export const Q7 = 'Do you have any other minor health related issues? Call: *1# for yes *2# for no'
export const S1 = 'Thank you, emergency responders have been notified of your general location and will be with you ASAP.'
export const S2 = 'Thank you, we have provided your information to emergency responders.  Please wait for further instruction.'

const questions = {
  'Alert': [Alert, 'Q1'],
  'Q1': [Q1, 'S1', 'Q2', 1],
  'Q2': [Q2, 'Q3', 'S2'],
  'Q3': [Q3, 'S1', 'Q4', 1],
  'Q4': [Q4, 'S1', 'Q5', 2],
  'Q5': [Q5, 'S2', 'Q6', 3],
  'Q6': [Q6, 'S2', 'Q7', 4],
  'Q7': [Q7, 'S2', 'S1', 5],
  'S1': [S1, 'Q1', 'Q1'],
  'S2': [S2, 'Q1', 'Q1'],
}

export default class USSD extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dialpad: false,
      esi: 0,
      open: true,
      question: 'Alert',
    }
  }

  componentDidMount() {
    this.props.registerNext(this.handleToggle)
  }

  handleOK = () => this.setState({open: !this.state.open}, () => {
    if (this.state.question.substr(0, 1) === 'S') {
      this.props.onEsi(this.state.esi).then(this.props.onNext)
    }
  })

  handleSend = number => {
    let esi = this.state.esi
    let question = this.state.question
    if (number === '*911#') {
      question = 'Q1'
    } else if (number === '*1#') {
      esi = questions[question][3]
      question = questions[question][1]
    } else if (number === '*2#') {
      question = questions[question][2]
    }
    this.setState({esi, question, open: true})
  }

  handleToggle = () => this.setState({dialpad: !this.state.dialpad})

  render() {
    const comps = []
    if (this.state.dialpad) {
      const allowed = this.state.question === 'Alert' ? [1, 9, '#', '*'] : [1, 2, '#', '*']
      comps.push(
        <DialPad
          allowed={allowed}
          goals={['*911#', '*1#', '*2#']}
          key="dialpad"
          onClose={this.handleToggle}
          onSend={this.handleSend} />
      )
    }

    if (this.state.open) {
      const question = questions[this.state.question]
      const text = Array.isArray(question) ? question[0] : 'Unknown'

      comps.push(
        <div className="ussd card middle full" key="modal">
          <div className="margin-top text-big text-center">
            <div className="title">Phone</div>
            <div className="body">{text}</div>
            <div className="button">
              <a href="#" onClick={this.handleOK}>OK</a>
            </div>
          </div>
        </div>
      )
    }

    return comps
  }
}

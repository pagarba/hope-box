
import React from 'react'

const flows = {
  0: {
    messages: [
      {body: 'I think my leg is broken', from: true},
      {
        body: `
          Note the following:<br />

          1. Stop Bleeding, if Necessary<br />
          &nbsp; - Apply firm pressure to wound with clean cloth until bleeding stops.<br />
          &nbsp; - If bone is pushing through skin, do not touch it or try to put it back in place.<br />

          2. Splint the Area, if Possible<br />
          &nbsp; - Cut away clothing if it cannot be removed without moving the injured body part.<br />
          &nbsp; - Gently tape the dislocated area or fracture to a rolled-up newspaper, ruler, stick,
          or a rolled-up piece of clothing with first aid tape. In general, try to include the joint
          above and below the injury in the splint. As much as possible, avoid moving the injured limb,
          and never force it or try to twist it back into place.<br />

          3. Reduce Swelling and Prevent Injury<br />
          &nbsp; - Elevate the injured area if possible.<br />

        `,
        from: false,
      },
      {body: 'I can see the bone sticking out', from: true},
      {
        body: `
          Immobilize the injured area. Don't try to realign the bone or push a bone that's sticking out
          back in. If you've been trained in how to splint and professional help isn't readily available,
          apply a splint to the area above and below the fracture sites. Padding the splints can help
          reduce discomfort.
        `,
        from: false,
      },
      {body: 'Responders have been notified of your status.  Do you have any other questions?', from: false},
      {body: 'Click Next to continue', from: true},
    ],
  },
}

class Messages extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
    }
  }

  timeout = null

  componentDidMount() {
    this.handleStart()
  }

  componentWillUnmount() {
    this.handleStop()
  }

  handleStart = () => {
    this.handleStop()
    this.timeout = setTimeout(() => {
      if (this.state) {
        const flow = flows[this.props.flow]
        const len = this.state.messages.length
        if (len < flow.messages.length) {
          this.setState({messages: flow.messages.slice(0, len + 1)}, () => {
            const el = document.getElementById('messages')
            el.scrollTop = el.scrollHeight

            this.handleStart()
          })
        }
      }
    }, Math.ceil(Math.random() * 3000) + 1000)
  }

  handleStop = () => {
    if (this.timeout) clearTimeout(this.timeout)
  }

  render() {
    return (
      <div className="messages cover">
        <div className="to">
          To: <b>911</b>
        </div>
        <div className="conversation" id="messages">
          {this.state.messages
            .map((message, idx) => {
              return (
                <div className={`message${message.from ? ' from' : ''}`} key={idx}>
                  <b>{message.from ? 'You' : '911'}:</b> <div dangerouslySetInnerHTML={{__html: message.body}} />
                </div>
              )
            })
          }
        </div>
        <div className="input flex-row">
          <div className="flex"></div>
          <div className="send">Send</div>
        </div>
      </div>
    )
  }
}

export default Messages

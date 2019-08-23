
import React from 'react'

export default class ResponderForm extends React.Component {
  constructor(props) {
    super(props)

    this.initState = {}
    this.state = {...this.initState}
  }

  componentDidMount() {
    if (this.props.data.id) {
      this.setState({...this.props.data})
    }
  }

  handleChange = ev => this.setState({[ev.target.id]: ev.target.value})

  handleSave = () => {
    this.validate()
      .then(() => this.props.onSave({...this.state}))
      .then(() => this.setState({...this.initState}))
  }

  validate = data => {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  render() {
    return null
  }
}


import React from 'react'
import {withRouter} from 'react-router-dom'

import {
  Button,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse
} from 'shards-react'
import {faQuestion} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import HelpModal from './HelpModal'

class Navigation extends React.Component {
  static defaultProps = {
    version: ''
  }

  constructor(props) {
    super(props)

    this.state = {
      dropdownOpen: false,
      collapseOpen: false,
      helpOpen: false,
    }
  }

  isActive = endpoint => this.props.location.pathname === `/${endpoint}`

  toggleDropdown = () => {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    })
  }

  toggleHelp = () => this.setState({helpOpen: !this.state.helpOpen})

  toggleNavbar = () => {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    })
  }

  render() {
    const urls = ['Dashboard', 'Map', 'Responders', 'Stations', 'Users', 'Settings']
    const version = `v${this.props.version}`

    const navItems = urls.map(url => {
      const low_url = url.toLowerCase()

      return (
        <NavItem key={low_url}>
          <NavLink active={this.isActive(low_url)} href={`/#/${low_url}`}>
            {url}
          </NavLink>
        </NavItem>
      )
    })

    return (
      <Navbar type='dark' theme='primary' expand='md'>
        <NavbarBrand href='#'>{this.props.title} <small>{version}</small></NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse open={this.state.collapseOpen} navbar>
          <Nav navbar>
            {navItems}
          </Nav>
          <Nav navbar className='ml-auto'>
            <Button onClick={this.toggleHelp} pill>
              <FontAwesomeIcon icon={faQuestion} />
            </Button>
            <HelpModal open={this.state.helpOpen} onClose={this.toggleHelp} />
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default withRouter(Navigation)

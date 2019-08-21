
import React from 'react'
import {withRouter} from 'react-router-dom'

import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Collapse
} from 'shards-react'

class Navigation extends React.Component {
  static defaultProps = {
    version: ''
  }

  constructor(props) {
    super(props)

    this.state = {
      dropdownOpen: false,
      collapseOpen: false
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

  toggleNavbar = () => {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    })
  }

  render() {
    const urls = ['Dashboard', 'Map', 'Users', 'Responders', 'Stations', 'Settings']
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
            <InputGroup size='sm' seamless>
              <InputGroupAddon type='prepend'>
                <InputGroupText>
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroupText>
              </InputGroupAddon>
              <FormInput className='border-0' placeholder='Search...' />
            </InputGroup>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default withRouter(Navigation)

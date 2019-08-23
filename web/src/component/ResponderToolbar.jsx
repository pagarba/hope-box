
import React from 'react'

import {Nav, NavItem, NavLink} from 'shards-react'

const ResponderToolbar = (props) => (
  <Nav card>
    <NavItem>
      <NavLink href="#" onClick={props.onCreate}>Create</NavLink>
    </NavItem>
    <NavItem>
      <NavLink disabled={!props.selected} href="#" onClick={props.onDelete}>Delete</NavLink>
    </NavItem>
    <NavItem>
      <NavLink disabled={!props.selected} href="#" onClick={props.onMessage}>Message</NavLink>
    </NavItem>
  </Nav>
)

export default ResponderToolbar

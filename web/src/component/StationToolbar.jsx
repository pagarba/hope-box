
import React from 'react'

import {Button, ButtonGroup, ButtonToolbar} from 'shards-react'

const StationToolbar = (props) => (
  <ButtonToolbar>
    <ButtonGroup className="mr-2" size="sm">
      <Button
        onClick={props.onCreate}
        outline
        theme="primary">Create</Button>
      <Button
        disabled={!props.selected}
        onClick={props.onDelete}
        outline
        theme="danger">Delete</Button>
    </ButtonGroup>
    <ButtonGroup size="sm">
      <Button
        disabled={!props.selected}
        onClick={props.onMessage}
        outline
        theme="secondary">Message</Button>
    </ButtonGroup>
  </ButtonToolbar>
)

export default StationToolbar

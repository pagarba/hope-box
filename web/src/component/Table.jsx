
import React from 'react'

import {Button, Col, Container, FormCheckbox, Row} from 'shards-react'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default class Table extends React.Component {
  static defaultProps = {
    cols: [],
    data: [],
    selected: []
  }

  isChecked = id => (new Set(this.props.selected)).has(id.toString())

  render() {
    return (
      <Container>
        <Row key="head" style={{borderBottom: '1px solid rgba(0, 0, 0, 0.25)', fontWeight: 'bold'}}>
          {this.props.onSelect && <Col xs={1} sm={1} md={1} lg={1}></Col>}
          {this.props.cols.map(col => (
            <Col key={col}>{col.toUpperCase()}</Col>
          ))}
          {this.props.onUpdate && <Col xs={1} sm={1} md={1} lg={1}></Col>}
        </Row>
        {this.props.data.map(row => (
          <Row key={row.id} style={{borderBottom: '1px solid rgba(0, 0, 0, 0.15)', marginBottom: 3}}>
            {this.props.onSelect &&
              <Col xs={1} sm={1} md={1} lg={1}>
                <FormCheckbox
                  checked={this.isChecked(row.id)}
                  id={row.id}
                  onChange={ev => this.props.onSelect(ev.target.id)}
                  value={row.id} />
              </Col>
            }
            {this.props.cols.map(col => (
              <Col key={col}>{row[col]}</Col>
            ))}
            {this.props.onUpdate &&
              <Col xs={1} sm={1} md={1} lg={1}>
                <Button
                  onClick={() => this.props.onUpdate(row.id)}
                  pill
                  size="sm"
                  style={{padding: '2px 6px'}}
                  theme="light">
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
              </Col>
            }
          </Row>
        ))}
      </Container>
    )
  }
}

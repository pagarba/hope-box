
import React from 'react'

import {Col, FormSelect, Row} from 'shards-react'

const Pagination = (props) => {
  const pages = []
  const p = Math.ceil(props.count / props.limit)
  for (let i = 1; i <= p; i++) {
    pages.push(i)
  }
  if (!pages.length) pages.push(1)

  let page = parseInt(props.skip / props.limit, 10)
  if (page <= 0 && props.count) page = 1

  return (
    <Row noGutters>
      <Col style={{paddingRight: 2, paddingTop: 12, textAlign: 'right'}}>Size:</Col>
      <Col style={{paddingTop: 6}}>
        <FormSelect
          onChange={ev => props.onLimit(ev.target.value)}
          size="sm"
          value={props.limit}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </FormSelect>
      </Col>
      <Col style={{paddingRight: 2, paddingTop: 12, textAlign: 'right'}}>Page:</Col>
      <Col style={{paddingTop: 6}}>
        <FormSelect
          onChange={ev => props.onSkip(ev.target.value * props.limit)}
          size="sm"
          value={page}>
          {pages.map(page => (
            <option key={page} value={page}>{page}</option>
          ))}
        </FormSelect>
      </Col>
    </Row>
  )
}

Pagination.defaultProps = {
  count: 0,
  limit: 10,
  skip: 0,
}

export default Pagination

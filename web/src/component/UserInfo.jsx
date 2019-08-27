
import React from 'react'

const UserInfo = ({data}) => (
  <div>
    <table>
      <tbody>
        <tr>
          <td>Name:</td>
          <td>{data.name}</td>
        </tr>
        <tr>
          <td>ESI:</td>
          <td>{data.esi}</td>
        </tr>
        <tr>
          <td>BTS:</td>
          <td>{data.bts}</td>
        </tr>
        <tr>
          <td>MSISDN:</td>
          <td>{data.msisdn}</td>
        </tr>
        <tr>
          <td>IMSI:</td>
          <td>{data.imsi}</td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default UserInfo

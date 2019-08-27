
import React from 'react'

const StationInfo = ({data}) => (
  <div>
    <table>
      <tbody>
        <tr>
          <td>Name:</td>
          <td>{data.name}</td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default StationInfo

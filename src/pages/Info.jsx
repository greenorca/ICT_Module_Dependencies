

export default function Info(props) {

  if (!props || !props.item) {
    console.log("props is null")
    return null
  }

  console.log("Info: ", props.item)

  return (
    <div>
      <h2>Info</h2>
      <table className="info-table">
        <tbody>
          <tr><th>Name</th><td>{props.item.type}</td></tr>
          {
            props.item.props.radius?
            <tr>
              <th>Radius</th>
              <td>{props.item.props.radius}</td>
            </tr>:null
          }
          {
            props.item.props.fill?
            <tr>
              <th>Fill</th>
              <td>{props.item.props.fill}</td>
            </tr>:null
          }
          {
            props.item.props.x?
            <tr>
              <th>X, Y</th>
              <td>{props.item.props.x}, {props.item.props.y}</td>
            </tr>:null
          }
        </tbody>
      </table>
    </div>
  )
}
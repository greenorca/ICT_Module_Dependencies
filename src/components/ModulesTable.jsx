import PropTypes from 'prop-types'

export default function ModulesTable({elements}) {

  return (<>
    <div className="info-screen">
      <h2>Modulliste</h2>
    <table className="info-table">
      <thead>
        <tr><th>Number</th><th>X</th><th>Y</th><th>Title</th></tr>
      </thead>
      <tbody>
        {Array.from(elements).sort((m1,m2)=>{ return (m1.module_number < m2.module_number)?-1:1}).map((element, index) => {
          return <tr key={index}>
            <th>{element.module_number}</th>
            <td>{element.position?element.position.x:"nan"}</td>
            <td>{element.position? element.position.y : "nan"}</td>
            <td>{element.title}</td>
          </tr>
        })}
      </tbody>
    </table>
    </div>
  </>
  )
}

ModulesTable.propTypes = {
  elements: PropTypes.array
}
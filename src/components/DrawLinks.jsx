import RequiredLink from "./RequiredLink"
import PropTypes from 'prop-types'

export default function DrawLinks({elements, dim, scale}) {

  console.log('drawLinks: ', elements)

  const drawLinks = () => {
    console.log('drawLinks')
    const links = []
    elements.forEach((module) => {
      if (module.requires) {
        module.requires.forEach((requirement) => {
          console.log('drawLink: ', module.module_number, requirement)
          const required = elements.filter(e => e.module_number === requirement)[0]
          if (module.position && required && required.position) {
            links.push(<RequiredLink required={required} requirer={module}
                          dim={dim} scale={scale}
                          key={module.module_number+"_"+required.module_number}/>)
          }
        })
      }
    })
    return links
  }

  return (
    <>
      { drawLinks() }
    </>
  )
}

DrawLinks.propTypes = {
  elements: PropTypes.array,
  dim: PropTypes.object,
  scale: PropTypes.number
}
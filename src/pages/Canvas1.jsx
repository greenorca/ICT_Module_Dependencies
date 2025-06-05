import { useEffect, useState } from "react"

import { Stage, Layer, Rect, Circle, Line } from 'react-konva'

Canvas1.defaultProps = {
  elements: null,
  onItemClick: () => {}
}

export default function Canvas1(props) {

  const [ elements, setElements ] = useState(props.elements?props.elements:[])
  const [ size, setSize ] = useState({width: 0, height: 0})
  const [offset, setOffset] = useState({x: 0, y: 0})

  useEffect(() => {
    const parent = document.querySelector('#stage')
    setSize({width: parent.clientWidth, height: parent.clientHeight})
  }, [])

  const onItemClick = (element) => {
    console.log(element.type, ' clicked, position: ', element.props.x, element.props.y)
    props.onItemClick(element)
  }

  const onDragStart = (element, event) => {
    element.isDragging = true
    setOffset({x: event.evt.clientX, y: event.evt.clientY})
    console.log('onDragStart: ', element.type, offset.x, offset.y)
  }

  const onDragEnd = (event) => {
    const element = elements.filter(e => e.isDragging === true)[0]
    if (!element) {
      console.log('element for dragEnd not found')
      return
    }
    console.log('onDragEnd: ', element.type)
    element.isDragging = false
    element.props.x = element.props.x + (event.evt.clientX - offset.x)
    element.props.y = element.props.y + (event.evt.clientY - offset.y)
    console.log('onDragEnd: ', element.type, element.props.x, element.props.y)
    setElements([...elements])
  }




  return (
    <>
    <Stage className="stage" width={size.width} height={size.height}>
      <Layer>
        <Line
          points={[0, 0, size.width, size.height]}
          stroke="white"
          strokeWidth={5}
        />
        {elements.map((element, index) => {
            switch (element.type) {
              case 'Rect':
                return <Rect key={index} width={element.props.width} height={element.props.height}
                      x={element.props.x} y={element.props.y} fill={element.props.fill}
                      onClick={() => onItemClick(element)}
                      draggable
                      onDragStart={(e)=> onDragStart(element,e)}
                      onDragEnd={onDragEnd}
                      />
              case 'Circle':
                return <Circle key={index} radius={element.props.radius} x={element.props.x} y={element.props.y}
                      fill={element.props.fill}
                      onClick={() => onItemClick(element)}
                      draggable
                      onDragStart={(e)=> onDragStart(element, e)}
                      onDragEnd={onDragEnd}/>
              default:
                return null
          }
        }
      )
      }
      </Layer>
    </Stage>
    </>
  )
}


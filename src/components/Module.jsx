import { Group, Rect, Text } from "react-konva";
import { useState } from "react";
import PropTypes from 'prop-types';

export default function Module({number, title, position, width, height, scale, isSelected, onClick, onDragEnd}) {

  const [pos, setPos] = useState(position);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [selected, setSelected] = useState(isSelected);

  const onDragStart = (event) => {
    setOffset({ x: event.evt.clientX, y: event.evt.clientY })
    event.stopPropagation()
  }

  const onDragEndLocal = (event) => {
    const newPos = { x: pos.x + (event.evt.clientX - offset.x),
                  y: pos.y + (event.evt.clientY - offset.y) }
    setPos(newPos)

    onDragEnd(number, newPos)
  }

  return (
    <>
    <Group
      x={pos.x*scale}
      y={pos.y*scale}
      draggable
      onDragStart={(e) => {
        onDragStart(e)
      }}
      onDragEnd={(e) => {
        onDragEndLocal(e)
      }}
      onClick={onClick}
    >
      <Rect
        width={width*scale}
        height={height*scale}
        stroke="red"
        strokeWidth={ selected && 2*scale || 0 }
        fill="yellow"
        cornerRadius={5*scale}
      />
      <Text
        text={number}
        fontSize={20*scale}
        x={10*scale}
        y={10*scale}
      />
      <Text
        text={title.substring(0, Math.min(title.length, 40))}
        fontSize={14*scale}
        width={(width - 20)*scale}
        wrap="word"
        x={10*scale}
        y={33*scale}
      />
      </Group>
    </>
  )
}

Module.propTypes = {
  number: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  position: PropTypes.object,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  onDragEnd: PropTypes.func,
  onClick: PropTypes.func
}
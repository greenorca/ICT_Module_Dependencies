/* eslint-disable react/prop-types */
import { Arrow } from "react-konva"
import { calculateJoints } from "../helpers/JointCalculator"

export default function RequiredLink({required, requirer, dim, scale}) {
  //console.log('drawLink: ', required.module_number, requirer.module_number)
  var result = <></>
  if (required.position && requirer.position){
    const joints = calculateJoints(required.position, requirer.position, dim.width, dim.height)

    result = <><Arrow
      points={[joints[0].x, joints[0].y, joints[1].x, joints[1].y].map(x => x*scale)}
      stroke="white"
      strokeWidth={3*scale}
    /></>
  } else {
    console.log('drawLink impossible: ', required.module_number, requirer.module_number)
  }
  return result
}
/**
 * calculates joints on the outer rim of two rectangles
 * @param {*} p0 upper left corner of first rectangle
 * @param {*} p1 upper left corner of second rectangle
 * @param {*} width of the rectangles
 * @param {*} height of the rectangles
 * @returns array of joints with x and y positions
 */
export function calculateJoints(p0, p1, width, height) {
  // calculate center points
  p0 = {x: p0.x + width/2, y: p0.y + height/2}
  p1 = {x: p1.x + width/2, y: p1.y + height/2}

  // calculate joints
  // joints on the left and right side of the rectangles
  if (Math.abs(p0.x - p1.x) > Math.abs(p0.y - p1.y)){
    if (p0.x < p1.x) {
      p0.x += width/2
      p1.x -= width/2
    } else {
      p0.x -= width/2
      p1.x += width/2
    }
  }
  // joints on the top and bottom of the rectangles
  else{
    if (p0.y < p1.y){
      p0.y += height/2
      p1.y -= height/2
    } else {
      p0.y -= height/2
      p1.y += height/2
    }
  }

  return [ {x: p0.x, y: p0.y}, {x: p1.x, y: p1.y}]
}
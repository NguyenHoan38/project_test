import React, { useState } from 'react'
import ChromePicker from 'react-color'
const ColorPicker = () => {
    const [color, setColor] = useState(null)
  
    console.log("colorPicker", color)
  
    return (
      <input type="color" value={color} onChange={e => setColor(e.target.value)} />
    )
  }
export default ColorPicker
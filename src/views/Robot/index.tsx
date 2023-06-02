import React, { useState } from 'react'

function Robot() {
  const [name, setName] = useState('tom')

  return (
    <div>
      <span>{`robot:${name}`}</span>
    </div>
  )
}

export default Robot

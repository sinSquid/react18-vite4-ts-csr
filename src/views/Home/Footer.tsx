import React from 'react'
import { useEventBus } from '@hooks/useEventBus'

function Footer() {
  const eventBus = useEventBus()

  return (
    <div>
      footer
      <p>{eventBus.state.age}</p>
    </div>
  )
}

export default Footer

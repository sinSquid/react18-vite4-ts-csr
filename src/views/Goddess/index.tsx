import React, { useState } from 'react'
import useLottie from '#@hooks/useLottie'
import lottieData from '#@assets/lottie/cycling-in-the-park.lottie'

function Goddess() {
  const option = {
    animationData: lottieData,
    loop: true
  }
  const { View } = useLottie(option)

  return (
    <div>
      <h2>Lottie</h2>
      <div>
        <View />
      </div>
    </div>
  )
}

export default Goddess

import React, { useState } from 'react'
import useLottie from '#@hooks/useLottie'
import lottieData from '#@assets/lottie/moody-giraffe.json'

function Lottie() {
  const option = {
    animationData: lottieData,
    loop: true
  }
  const { View: LottieView } = useLottie(option)

  return (
    <div>
      <h2>Lottie</h2>
      <div>{LottieView}</div>
    </div>
  )
}

export default Lottie

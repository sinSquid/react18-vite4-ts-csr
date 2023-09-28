import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useBattery } from 'react-use'
import { useNavigate } from 'react-router-dom'
import { changeUser } from '#@reducers/user'

function About() {
  const [pageTitle] = useState('12') // 因为加入了unplugin-auto-import 所以不用在手动导入
  const { name, age } = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const batteryState = useBattery()
  const navigate = useNavigate()

  const renderBattery = () => {
    if (!batteryState.isSupported) {
      return (
        <div>
          <strong>Battery sensor</strong>:<span>not supported</span>
        </div>
      )
    }

    if (!batteryState.fetched) {
      return (
        <div>
          <strong>Battery sensor</strong>
          <span>supported</span> <br />
          <strong>Battery state</strong>
          <span>fetching</span>
        </div>
      )
    }

    return (
      <div>
        <strong>Battery sensor</strong>
        :&nbsp;&nbsp;
        <span>supported</span> <br />
        <strong>Battery state</strong>:<span>fetched</span> <br />
        <strong>Charge level</strong>
        :&nbsp;&nbsp;
        <span>{(batteryState.level * 100).toFixed(0)}%</span> <br />
        <strong>Charging</strong>
        :&nbsp;&nbsp;
        <span>{batteryState.charging ? 'yes' : 'no'}</span> <br />
        <strong>Charging time</strong>
        :&nbsp;&nbsp;
        <span>{batteryState.chargingTime ? batteryState.chargingTime : 'finished'}</span> <br />
        <strong>Discharging time</strong>
        :&nbsp;&nbsp;
        <span>{batteryState.dischargingTime}</span>
      </div>
    )
  }

  return (
    <div>
      <h2>{pageTitle}</h2>
      <p>{`${name}:${age}`}</p>
      <div>
        <button
          type="button"
          onClick={() => {
            navigate(-1)
          }}
        >
          Back
        </button>
      </div>
      <button
        type="button"
        onClick={() => {
          dispatch(changeUser({ age: age + 1 }))
        }}
      >
        点击改变数字
      </button>
      {renderBattery()}
    </div>
  )
}

export default About

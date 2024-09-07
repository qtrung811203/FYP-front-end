/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import styled from "styled-components"

const getRandomTime = () => {
  const hours = String(Math.floor(Math.random() * 24)).padStart(2, "0")
  const minutes = String(Math.floor(Math.random() * 60)).padStart(2, "0")
  return `${hours}:${minutes}`
}

function RandomNumber({ className }) {
  const [time, setTime] = useState(getRandomTime())
  const intervalTime = 500

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getRandomTime())
    }, intervalTime)

    return () => clearInterval(interval)
  }, [])

  return <RandomNumberStyled className={className}>{time}</RandomNumberStyled>
}

export default RandomNumber

const RandomNumberStyled = styled.div`
  color: white;
  position: absolute;
  /* top: -110px; */
  font-size: 30rem;
  opacity: 0.18;
  font-family: "Viga", sans-serif;
  transform: rotate(-10deg);
`

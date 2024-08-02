import React, { useEffect, useRef, useState } from "react"

export default function Circle(props) {
  const circleRef = useRef(0)
  const [isDrag, setIsDrag] = useState()
  const [isClicked, setIsClicked] = useState(false)
  const [effect, setEffect] = useState({})

  useEffect(() => {
    const hexColor = props.color

    const style = {
      backgroundColor: hexColor,
      width: "150px",
      height: "150px",
      borderRadius: "300px",
    }

    const styleShadow = {
      boxShadow: `0px 0px 25px ${hexColor},
                  0px 0px 60px ${hexColor},
                  0px 0px 95px ${hexColor},
                  0px 0px 100px ${hexColor}`,
    }

    setEffect(isClicked ? { ...style, ...styleShadow } : style)
  }, [props.color, isClicked])

  useEffect(() => {
    const circle = circleRef.current

    const onClickMouse = () => {
      setIsClicked((prevClick) => !prevClick)
    }

    const onMouseDown = () => {
      if (isClicked) {
        setIsDrag(true)
      }
    }

    const onMouseUp = () => {
      setIsDrag(false)
    }

    const onMouseMove = (e) => {
      if (isDrag) {
        console.log("isDrag")
        const mouseX = e.clientX
        const mouseY = e.clientY

        const circleX = circle.offsetLeft + circle.offsetWidth / 2
        const circleY = circle.offsetTop + circle.offsetHeight / 2

        const deltaX = mouseX - circleX
        const deltaY = mouseY - circleY

        circle.style.transform = `translate(${deltaX}px, ${deltaY}px)`
      }
    }

    circle.addEventListener("mousedown", onMouseDown)
    circle.addEventListener("mouseup", onMouseUp)
    circle.addEventListener("mousemove", onMouseMove)
    circle.addEventListener("click", onClickMouse)

    return () => {
      circle.removeEventListener("mousedown", onMouseDown)
      circle.removeEventListener("mouseup", onMouseUp)
      circle.removeEventListener("mousemove", onMouseMove)
      circle.removeEventListener("click", onClickMouse)
    }
  }, [isDrag, isClicked])

  return (
    <div
      id="circle"
      ref={circleRef}
      style={{ backgroundColor: "#FFF" }}
      {...(effect && { style: effect })}
    ></div>
  )
}

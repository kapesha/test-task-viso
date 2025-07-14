'use client'

import React from "react"

type Props = {
  className?: string
}

export const StarSVG: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="black"
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L14.755 8.452L22 9.264L16.5 14.072L18.09 21.264L12 17.77L5.91 21.264L7.5 14.072L2 9.264L9.245 8.452L12 2Z" />
    </svg>
  )
}
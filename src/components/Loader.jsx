
import React from "react"
import { Audio } from  'react-loader-spinner'

export const CustomLoader = () => {
  return (
    <>
    <div className="page-loader">
        <Audio
            height = "80"
            width = "80"
            radius = "9"
            color = '#fff'
            ariaLabel = 'three-dots-loading'
        />
    </div>
    </>
  )
}

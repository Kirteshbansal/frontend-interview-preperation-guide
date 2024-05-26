import React from 'react'

function Cell({onClick = () => {}, disabled=false, title = '', className, ...props}) {
  return (
      <button onClick={onClick} disabled={disabled} className={className} {...props}>{title}</button>
  )
}

export default Cell
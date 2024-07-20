import React from 'react'

interface BlockProps{
  value?: String | null;
  onClick:() => void
}

function Block(props: BlockProps) {
  return (
    <div className='block' onClick={props.onClick}>{props.value}</div>
  )
}

export default Block

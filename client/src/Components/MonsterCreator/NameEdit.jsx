import React from 'react'

const NameEdit = (props) => {
  return (
    <div><label htmlFor="name">Namssssse:</label>
        <input id="name" type="text" name="name" onChange={props.handleChange}/></div>
  )
}

export default NameEdit
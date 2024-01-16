import React from 'react'

function NewForm() {
  return (
    <div className='d-flex'>
      <div className="options">
        <h2 className="center mb-3">Form</h2>
        <div className="fields">
          <h4 className="mb-3">Add Element:</h4>
          <div className="elements">
            <button>input</button>
            <button>select</button>
            <button>textarea</button>
            <button>button</button>
            <button>checkbox</button>
          </div>
        </div>
      </div>
      <hr />
      <div className="view-form">
        <h2 className="center">View Form</h2>
      </div>
    </div>
  )
}

export default NewForm

import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './ModuleForm.css'

export default function ModuleForm({modules, selectedModule, submit, reset}) {

  const [values, setValues] = useState(selectedModule?selectedModule:{})

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        reset()
      }
    };

    // Add event listener on component mount
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array to ensure the effect only runs once on mount/unmount



  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const onChangeSelection = (e) => {
    const selectedOptions = e.target.selectedOptions
    const requiredModules = Array.from(selectedOptions).map(o => o.value )
    setValues({...values, [e.target.name]: requiredModules })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    submit(values)
  }

  const onReset = (e) => {
    e.preventDefault()
    reset()
  }



  return (
    <>
      <div id="add-modul-form">
        <div className="inner">
          { selectedModule && <h2>Modul bearbeiten</h2> || <h2>Modul hinzufügen</h2> }
          <form action="" onSubmit={(e) => onSubmit(e) }>
            <div className="form-group">
              <label htmlFor="number">Modulnummer</label>
              <input type="text" name="module_number" id="module_number" value={values.module_number} onChange={(e) => onChange(e)}/>
            </div>

            <div className="form-group">
              <label htmlFor="title">Titel</label>
              <input type="text" name="title" id="title" value={values.title} onChange={(e) => onChange(e)}/>
            </div>

            <div className="form-group">
              <label htmlFor="requirements">Vorraussetzung</label>
              <select name="requires" id="" onChange={(e) => onChangeSelection(e)} multiple value={values.requires}>
                <option value="0">keine</option>
                {modules.map(e => e.module_number).sort().map((module_number) => {
                  return <option value={module_number}
                      key={module_number}
                      >
                        {module_number}
                      </option>
                })}
              </select>
            </div>
            <div className="form-group">
              <button type="submit">Speichern</button>
              <button onClick={(e) => onReset(e)}>Abbrechen</button>
              { selectedModule &&
                <button onClick={() => {
                  let text = "Wirklich löschen?";
                  if (confirm(text) == true) {
                    submit()
                  }
                }}>Löschen</button>
              }
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

ModuleForm.propTypes = {
  modules: PropTypes.array,
  selectedModule: PropTypes.object,
  submit: PropTypes.func,
  reset: PropTypes.func
}
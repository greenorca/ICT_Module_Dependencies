import { useEffect, useState } from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import DrawLinks from '../components/DrawLinks'
import Module from '../components/Module'
import ModulesTable from '../components/ModulesTable'
import ModuleForm from '../components/ModuleForm'
import { exportDataToFile, importFromFile } from '../helpers/storageHelper'

export default function ModuleChart() {

  const dim = {
    width: 140,
    height: 80
  }

  const [layerPos, setLayerPos] = useState({ x: 0, y: 0 });
  const [allowMoveCanvas, setAllowMoveCanvas] = useState(false)
  const [scale, setScale] = useState(1)

  const [size, setSize] = useState({width: 0, height: 0})
  const [links, setLinks] = useState([]) // UI link items
  const [uiModules, setUiModules] = useState([])
  const [showModuleForm, setShowModuleForm] = useState(false)
  const [elements, setElements ] = useState([]) // here is the data stored in local storage
  const [selectedModule, setSelectedModule] = useState(null)

  /* startup */
  useEffect(() => {
    const parent = document.querySelector('#stage')
    setSize({width: parent.clientWidth, height: parent.clientHeight})
    loadLocallyStoredModules()
  }, [])

  /* draw everything again on module list or zoom factor change */
  useEffect(() => {
    console.log('elements have changed: ', elements)
    setUiModules(drawModules())
    setLinks(<DrawLinks elements={elements} dim={dim} scale={scale}/>)
  }, [elements, scale])

  const updateLocallyStoredModules = () => {
    const backup_data = localStorage.getItem('modules')
    if (backup_data) {
      localStorage.setItem('modules_backup', backup_data)
    }
    localStorage.setItem('modules', JSON.stringify(elements))
    exportDataToFile(elements)
  }

  const drawModules = () => {
    const modules = []
    elements.map((element, index) => {
      modules.push( <Module
        number={element.module_number}
        title={element.title}
        position={element.position ? element.position
          : {x: index%3 * 210 * scale, y: Math.floor(index/3) * 140 * scale}}
        width={dim.width}
        height={dim.height}
        scale={scale}
        isSelected={selectedModule && element.module_number === selectedModule.module_number}
        onClick={()=>onModuleClicked(element)}
        onDragEnd={(number, pos) => {
          console.log('onDragEnd: ', number, pos)
          element.position = pos
          console.log('onDragEnd: ', element.module_number, element.position.x, element.position.y)
          setElements([...elements])
        }}
        key = { index }  />
      )
      })
    return modules
  }

  const importModules = () => {
    importFromFile()
    loadLocallyStoredModules()
  }

  const loadLocallyStoredModules = () => {
    const data = localStorage.getItem('modules')
    if (data) {
      var modules = JSON.parse(data)
      /*modules = [{"module_number":"M162","title":"Datenmodell erstellen","position":{"x":120,"y":60}},{"module_number":"M106","title":"Daten mit SQL bearbeiten","requires":["M164"],"position":{"x":91,"y":149}},{"module_number":"M164","title":"Datenmodell implementieren","requires":["M162"],"position":{"x":61,"y":189}},        {"module_number":"M165","title":"NoSQL-Datenbanken nutzen","requires":["M164"],"position":{"x":78,"y":346}}, {"module_number":"M293","title":"Webseite mit HTML und CSS erstellen","position":{"x":330,"y":118}},        {"module_number":"M294","title":"Frontend für Webapplikationen entwickeln","requires":["M293","M319"],"position":{"x":529,"y":39}}, {"module_number":"M295","title":"Backend für Webapplikationen entwickeln","requires":["M293","M320"],"position":{"x":519,"y":201}}, {"module_number":"M319","title":"Prozedurale Programmierung","position":{"x":726,"y":99}},{"module_number":"M320","title":"Objektorientierte Programmierung","requires":["M319"],"position":{"x":717,"y":246}},{"module_number":"M323","title":"Funktionale Programmierung","requires":["M320"],"position":{"x":519,"y":349}}]
      */
      /*const m295 = modules.filter(m => m.module_number === 'M295')[0]
      if (m295 && m295.requires) {
        if (!m295.requires.includes('M106')) {
          console.log('add M106 requirement to M295')
          m295.requires.push('M106')
        }
      }*/
      setElements(modules)
    }
  }

  const onDragEnd = (event) => {
    if (allowMoveCanvas) {
      console.log('onDragEnd: ', event.evt.clientX, event.evt.clientY)
      const { x, y } = event.target.position();
      setLayerPos({ x, y });
      setAllowMoveCanvas(false);
    }
  };

  const onModuleClicked = (element) => {
    console.log('onElementClick: ', element)
    setSelectedModule(element)
    setShowModuleForm(true)
  }

  const onModuleFormReturned = (values) => {
    if (!values) {
      setShowModuleForm(false)
      if (selectedModule) {
        const updatedElements = elements.filter(e => e.module_number !== selectedModule.module_number)
        updatedElements.forEach(e => {
            if (e.requires) {
              e.requires = e.requires.filter(r => r !== selectedModule.module_number)
            }
          })

        setElements(updatedElements)
        setSelectedModule(null)
        return
      }
    }
    if (!values.module_number) {
      alert('Please enter a module number')
      return
    }
    if (!values.title) {
      alert('Please enter a title')
      return
    }
    if (selectedModule){
      selectedModule.module_number = values.module_number
      selectedModule.title = values.title
      selectedModule.requires = values.requires
      setElements([...elements])
    } else {
      values.position = layerPos
      setElements([...elements, values])
    }
    setShowModuleForm(false)
  }

  return (
      <>
      <div className="flexbox" style={{ display: 'flex' }}>
        <div>
          <div className="toolbar">
            <button onClick={updateLocallyStoredModules}>Speichern & Exportieren</button>
            <button onClick={importModules}>Daten importieren</button>
            <button onClick={loadLocallyStoredModules}>Refresh</button>
            <button onClick={() => { setSelectedModule(null); setShowModuleForm(true)}}>Neues Modul</button>
            <button onClick={() => setScale(scale + 0.1)}>Zoom in</button>
            <button onClick={() => setScale(scale - 0.1)}>Zoom out</button>
            <button onClick={() => { setScale(1); setLayerPos({ x: 0, y: 0 }) }}>Reset</button>
            <button onClick={() => setAllowMoveCanvas(!allowMoveCanvas)} className={allowMoveCanvas ? 'active' : ''}>
              Ebene verschieben
            </button>
          </div>
          <hr />
          <Stage id="stage" width={size.width} height={size.height}>
          <Layer draggable={allowMoveCanvas} onDragEnd={onDragEnd} x={layerPos.x} y={layerPos.y}>
            {/* Transparent Rect that covers the entire stage */}
            <Rect
              width={8000}
              height={8000}
              fill="transparent" // Invisible background
              onMouseDown={() => console.log("Dragging layer from empty space")}
            />
            { uiModules }
            { links }
          </Layer>
        </Stage>
        </div>
        <div>
          <ModulesTable elements={elements} />
        </div>
      </div>
      {
        showModuleForm?
        <ModuleForm
          modules={elements}
          selectedModule={selectedModule}
          submit={(values) => onModuleFormReturned(values)}
          reset={() => setShowModuleForm(false)}
        />:null

      }

      </>
  )
}
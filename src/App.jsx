import Canvas1 from './pages/Canvas1'
import './App.css'
import ModuleChart from './pages/ModuleChart'

function App() {

  const elements = [
    {
      type: 'Rect',
      props: {
        x: 40,
        y: 80,
        width: 30,
        height: 50,
        fill: 'red'
      }
    },
    {
      type: 'Circle',
      props: {
        x: 100,
        y: 100,
        fill: 'yellow',
        radius: 50
      }
  }]

  const modules = [{"module_number":"M162","title":"Datenmodell erstellen","position":{"x":120,"y":60}},
    {"module_number":"M106","title":"Daten mit SQL bearbeiten","requires":["M104"],"position":{"x":91,"y":149}},
    {"module_number":"M164","title":"Datenmodell implementieren","requires":["M162"],"position":{"x":61,"y":189}},
    {"module_number":"M165","title":"NoSQL-Datenbanken nutzen","requires":["M164"],"position":{"x":78,"y":346}},
    {"module_number":"M293","title":"Webseite mit HTML und CSS erstellen","position":{"x":330,"y":118}},
    {"module_number":"M294","title":"Frontend für Webapplikationen entwickeln","requires":["M293","M319"],"position":{"x":529,"y":39}},
    {"module_number":"M295","title":"Backend für Webapplikationen entwickeln","requires":["M293","M320"],"position":{"x":519,"y":201}},
    {"module_number":"M319","title":"Prozedurale Programmierung","position":{"x":726,"y":99}},
    {"module_number":"M320","title":"Objektorientierte Programmierung","requires":["M319"],"position":{"x":717,"y":246}},
    {"module_number":"M323","title":"Funktionale Programmierung","requires":["M320"],"position":{"x":519,"y":349}}]

  return (
    <>
      <h1>EFZ-Informatik Modulübersicht</h1>
      {/*<Canvas1 />*/}
      <ModuleChart />

    </>
  )
}

export default App

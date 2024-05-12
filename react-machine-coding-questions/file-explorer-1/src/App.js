import './App.css'
import mockData from './data/mockData'

import FileExplorer from './components/FileExplorer.jsx'

function App() {

  return (
    <FileExplorer data={mockData} />
  )
}

export default App

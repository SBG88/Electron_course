import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [staticData, setStaticData] = useState<StaticData>({
    totalStorage: 0,
    cpuModel: "",
    totalMemoryGB: 0
  })

  useEffect(() => {
    window.electron.subscribeStatistics(stats => console.log(stats));
    const getStaticData = async() => {
      try {
        const response = await window.electron.getStaticData()
        setStaticData(response)
      } catch (error) {
        console.error('Error fetching static data:', error);
      }
    }
    getStaticData();
  }, [])

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Static Data</h1>
      <div className="card">
        <p>Total Storage: {staticData.totalStorage}</p>  
        <p>CPU Model: {staticData.cpuModel}</p>  
        <p>Storage Data: {staticData.totalMemoryGB}</p>  
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

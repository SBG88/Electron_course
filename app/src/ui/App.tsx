import { useMemo } from 'react';
import reactLogo from './assets/react.svg'
import './App.css'
import { useStatistics } from './useStatistics'
import { Chart } from './chart';

function App() {
  const statistics = useStatistics(10);

  const cpuUsage = useMemo(() => statistics.map(stat => stat.cpuUsage), [statistics])

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Dinamic</h1>
      <div style={{ height: 120 }}>
        <Chart data={cpuUsage} maxDataPoints={10}/>
      </div> 
      <h1>Static Data</h1>
      <div className="card">
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

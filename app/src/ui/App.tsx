import { useEffect, useMemo, useState } from 'react';
import './App.css'
import { useStatistics } from './useStatistics'
import { Chart } from './Chart';

function App() {
  const statistics = useStatistics(10);
  const [activeView, setActiveView] = useState<View>("CPU");

  const cpuUsages = useMemo(() => statistics.map(stat => stat.cpuUsage), [statistics]);
  const ramUsages = useMemo(() => statistics.map(stat => stat.ramUsage), [statistics]);
  const storageUsages = useMemo(() => statistics.map(stat => stat.storageUsage), [statistics]);

  const activeusages = useMemo(() => {
    switch (activeView) {
      case "CPU":
        return cpuUsages;
      case "RAM":
        return ramUsages;
      case "STORAGE":
        return storageUsages;
    }
  }, [activeView, cpuUsages, ramUsages, storageUsages]);

  useEffect(() => {
    window.electron.subscribeChangeView((view) => {
      setActiveView(view);
    })
  }, [])

  return (
    <>
      <h1>Dinamic</h1>
      <h2></h2>
      <div style={{ height: 120 }}>
        <Chart data={activeusages} maxDataPoints={10}/>
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

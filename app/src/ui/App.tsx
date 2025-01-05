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
    <div className="App">
      <header>
        <button
          id='close'
          onClick={() => window.electron.sendFrameAction("CLOSE")}
        />
        <button
          id='minimize'
          onClick={() => window.electron.sendFrameAction("MINIMIZE")}
        />
        <button
          id='maximize'
          onClick={() => window.electron.sendFrameAction("MAXIMIZE")}
        />
      </header>
      <div style={{ height: 120 }}>
        <Chart data={activeusages} maxDataPoints={10}/>
      </div> 
    </div>
  )
}

export default App

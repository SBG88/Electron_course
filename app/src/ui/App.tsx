import { useEffect, useMemo, useState } from 'react';
import './App.css'
import { useStatistics } from './useStatistics'
import { Chart } from './components/Chart';
import Header from './components/Header';
import SelectOption from './components/SelectOption';
import { useStaticData } from './useStaticData';

function App() {
  const staticData = useStaticData();
  const statistics = useStatistics(10);
  const [activeView, setActiveView] = useState<View>("CPU");

  const cpuUsages = useMemo(() => statistics.map(stat => stat.cpuUsage), [statistics]);
  const ramUsages = useMemo(() => statistics.map(stat => stat.ramUsage), [statistics]);
  const storageUsages = useMemo(() => statistics.map(stat => stat.storageUsage), [statistics]);

  const activeUsages = useMemo(() => {
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
      <Header />
      <div className='main'>
        <div>
          <SelectOption
            title='CPU'
            view='CPU'
            subtitle={staticData?.cpuModel ?? ""} data={cpuUsages}
            onClick={() => setActiveView("CPU")}
          />
          <SelectOption
            title='RAM'
            view='RAM'
            subtitle={(staticData?.totalMemoryGB.toString() ?? "") + " GB"}
            data={ramUsages}
            onClick={() => setActiveView("RAM")}
          />
          <SelectOption
            title='STORAGE'
            view='STORAGE'
            subtitle={(staticData?.totalStorage.toString() ?? "") + " GB"}
            data={storageUsages}
            onClick={() => setActiveView("STORAGE")}
          />
        </div>
        <div className='mainGrid'>
          <Chart selectedView={activeView} data={activeUsages} maxDataPoints={10}/>
        </div> 
      </div>
    </div>
  )
}

export default App

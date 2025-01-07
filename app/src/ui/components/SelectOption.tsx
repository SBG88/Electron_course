import { Chart } from "./Chart";

export type SelectOptionProps = {
  title: string;
  view: View;
  subtitle: string;
  data: number[];
  onClick: () => void;
}

const SelectOption = (props: SelectOptionProps) => {
  return (
  <button
    className="selectOption"
    onClick={props.onClick}
  >
    <div className="selectOptionTitle">
      <div>{ props.title }</div>
      <div>{ props.subtitle }</div>
    </div>
    <div className="selectOptionChart">
      <Chart selectedView={props.view} data={props.data} maxDataPoints={10}/>
    </div>
  </button>
)
}

export default SelectOption;
export type IProps = {
  city: string;
  aqi: number[];
  updatedAt: number[];
};

export type FetchDatum = {
  city: string;
  aqi: string;
};

export type PropsChart = {
  labels: number[];
  datasets: IDatasets[];
};

export type IDatasets = {
  type: string;
  label: string;
  backgroundColor: string;
  borderColor: string;
  pointBorderColor: string;
  borderWidth: string;
  lineTension: number;
  data: number[];
};

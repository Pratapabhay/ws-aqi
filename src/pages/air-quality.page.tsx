import React, { Fragment } from "react";
import { Icon } from "@blueprintjs/core";
import AQIChart from "../components/chart.component";
import { IProps } from "../types/aqi.types";
import { formatTime, value_to_className } from "../utilities/aqi.utilities";
import { ws } from "../websocket";

export default function AirQuality() {
  const [isOpenChart, setIsOpenChart] = React.useState<boolean>(false);
  const [currentChartIndex, setCurrentChartIndex] = React.useState<number>(0);
  const [data, setData] = React.useState<IProps[]>([]);

  function updateState(newData: any, timeStamp: number) {
    const clonedData = [...data];
    for (let index = 0; index < newData.length; index++) {
      const element = newData[index];
      const i = clonedData.findIndex((el: IProps) => el.city === element.city);
      if (i === -1) {
        clonedData.push({
          city: element.city,
          aqi: [parseFloat(element.aqi)],
          updatedAt: [new Date().valueOf()],
        });
      } else {
        clonedData[i].aqi.push(parseFloat(element.aqi));
        clonedData[i].updatedAt.push(new Date().valueOf());
      }
    }
    setData(clonedData);
  }

  React.useEffect(() => {
    ws.onmessage = (e) => {
      if (e.data.startsWith("Hello")) return;
      const value = JSON.parse(e.data);
      updateState(value, e.timeStamp);
    };
  });

  function openChart(index: number) {
    setIsOpenChart(true);
    setCurrentChartIndex(index);
  }

  return (
    <>
      <div className="air-quality-table">
        <table>
          <thead>
            <tr>
              <th> City </th>
              <th> AQI </th>
              <th> Last Updated </th>
              <th> Open Chart </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: IProps, index) => {
              const aqi = Math.round(item.aqi[item.aqi.length - 1]);
              const lastUpdated = formatTime(
                item.updatedAt[item.updatedAt.length - 1]
              );

              return (
                <Fragment key={index}>
                  <tr>
                    <td> {item.city} </td>
                    <td className={value_to_className(aqi)}> {aqi} </td>
                    <td> {lastUpdated} </td>
                    <td>
                      {" "}
                      <Icon
                        icon="chart"
                        size={20}
                        onClick={() => openChart(index)}
                      />{" "}
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
        {isOpenChart && (
          <AQIChart
            data={data}
            currentChartIndex={currentChartIndex}
            closeChart={setIsOpenChart}
          />
        )}
      </div>
    </>
  );
}

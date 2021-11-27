import React, { Fragment } from "react";
import {
  Button,
  Drawer,
  DrawerSize,
  Icon,
  MenuItem,
  Position,
} from "@blueprintjs/core";
import AQIChart from "../components/chart.component";
import { IProps } from "../types/aqi.types";
import { formatTime, value_to_className } from "../utilities/aqi.utilities";
import { ws } from "../websocket";
import { categories } from "../utilities/aqi.utilities";
import { ItemRenderer, Select } from "@blueprintjs/select";

export const renderer: ItemRenderer<string> = (
  item: string,
  { handleClick, modifiers }: any
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={modifiers.active}
      label={item[0].toUpperCase() + item.substring(1)}
      key={item}
      onClick={handleClick}
    />
  );
};

export default function AirQuality() {
  const [isOpenChart, setIsOpenChart] = React.useState<boolean>(false);
  const [currentChartCity, setCurrentChartCity] = React.useState<string>("");
  const [categoryFilter, setCategoryFilter] = React.useState<any>("-");
  const [showDesktopChart, setShowDesktopChart] = React.useState<boolean>(true);
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

  React.useEffect(() => {
    const ww = document.body.clientWidth;
    if (ww < 600) {
      setShowDesktopChart(false);
    } else if (ww >= 601) {
      setShowDesktopChart(true);
    }
  });

  function openChart(city: string) {
    setIsOpenChart(true);
    setCurrentChartCity(city);
  }

  const filteredData = data.filter((item: IProps) => {
    if (categoryFilter === "-") return item;
    const latestAQIValue = item.aqi[item.aqi.length - 1];
    const minValue = categories[categoryFilter][0];
    const maxValue = categories[categoryFilter][1];
    return latestAQIValue > minValue && latestAQIValue < maxValue;
  });

  return (
    <>
      <div className="filter-wrapper">
        <div> Filters: Category </div>
        <Select
          className="filter-select"
          items={["-", ...Object.keys(categories)]}
          filterable={false}
          resetOnSelect={true}
          onItemSelect={setCategoryFilter}
          activeItem={categoryFilter}
          itemRenderer={renderer}
          noResults={<MenuItem disabled={true} text="No results." />}
        >
          <Button
            alignText="left"
            rightIcon="caret-down"
            fill={true}
            text={categoryFilter}
          />
        </Select>
      </div>
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
            {filteredData.map((item: IProps, index) => {
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
                        onClick={() => openChart(item.city)}
                      />{" "}
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
        {isOpenChart && (
          <>
            {showDesktopChart ? (
              <div className="chart-desktop">
                <AQIChart
                  data={data}
                  currentChartCity={currentChartCity}
                  closeChart={setIsOpenChart}
                />
              </div>
            ) : (
              <div className="chart-mobile">
                <Drawer
                  icon="info-sign"
                  onClose={() => setIsOpenChart}
                  autoFocus={true}
                  canEscapeKeyClose={true}
                  canOutsideClickClose={true}
                  enforceFocus={true}
                  hasBackdrop={true}
                  isOpen={isOpenChart}
                  position={Position.BOTTOM}
                  usePortal={true}
                  size={DrawerSize.LARGE}
                >
                  <AQIChart
                    data={data}
                    currentChartCity={currentChartCity}
                    closeChart={setIsOpenChart}
                  />
                </Drawer>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

import React from "react"
import MapboxGL,{
  Camera,
  MapView,
  UserLocation,
  UserLocationRenderMode,
  PointAnnotation,
  ShapeSource,
  LineLayer,
} from "@rnmapbox/maps";
import {
  useRecoilState
} from "recoil";
import {
  myLocationState,
  dataLocationState,
  markerState,
  routeState,
  modeState,
  fileNameState
} from "../Utils/atom";
import { AntDesign } from "@expo/vector-icons";
MapboxGL.setAccessToken('sk.eyJ1IjoiaHllb24zMDUxIiwiYSI6ImNsa3YwM3BhcjBneGEzbHIweGFuNTgzZXoifQ.uvJeaDq7NLN0HyOENlWUcA');

export const DefaultMapScreen = () => {
  const [mode, setMode] = useRecoilState(modeState);
  const [dataLocation, setDataLocation] = useRecoilState(dataLocationState);
  const [myInfoLocation, setMyInfoLocation] = useRecoilState(myLocationState);
  const [markers, setMarkers] = useRecoilState(markerState);
  const [routes, setRoutes] = useRecoilState(routeState);

  return (
      <MapView
          styleURL={MapboxGL.StyleURL.Satellite}
          style={{ width: "100%", height: "100%", flex: 1 }}
          zoomEnabled={true}
          logoEnabled={false}
          compassEnabled={false}
          attributionEnabled={false}
          scaleBarEnabled={false}
      >
        {
          dataLocation.length > 0 ?
              <Camera
                  maxZoomLevel={20}
                  minZoomLevel={5}
                  followUserMode="normal"
                  centerCoordinate={dataLocation}
                  type="fit"
                  zoomLevel={
                    12
                  }
              />:
              <Camera
                  followUserLocation={true}
                  followZoomLevel={15}
                  maxZoomLevel={20}
                  minZoomLevel={5}
                  followUserMode="normal"
                  centerCoordinate={dataLocation.length > 0 ? dataLocation : myInfoLocation}
              />
        }

        <UserLocation
            visible={true}
            requestsAlwaysUse={true}
            renderMode={UserLocationRenderMode.Native}
            minDisplacement={0}
        />
        {
          markers.length !== 0 ?
              markers.map((marker, index) => {
                    return (
                        <PointAnnotation
                            key={index}
                            id={"marker" + index}
                            coordinate={[marker.longitude, marker.latitude]}
                            onSelected={()=>{
                              setDataLocation([
                                marker.longitude, marker.latitude
                              ])
                              setMarkers(
                                  markers.map((parent, idx) => {
                                    if (idx === index) {
                                      return {
                                        ...parent,
                                        selected: !parent.selected,
                                      };
                                    }
                                    return parent;
                                  })
                              )
                              setMode("markerView");
                            }}
                        >
                          <AntDesign name={marker.icon} size={50} color="black" />
                        </PointAnnotation>
                    )
                  }
              ):
              <></>
        }
        {
          routes[0]?
              routes[0].filter(
                  (data) => data.length > 1
              ).map((route, index) => {
                    return (
                        <ShapeSource
                            key={index}
                            id={"routeSource" + index}
                            lineMetrics={true}
                            shape={{
                              type: "Feature",
                              geometry: {
                                type: "LineString",
                                coordinates: route
                              }
                            }}
                        >
                          <LineLayer
                              id={'routeFill' + index}
                              style={{
                                lineColor: 'red',
                                lineCap: 'round',
                                lineJoin: 'round',
                                lineWidth: 5,
                                lineGradient: [
                                  'interpolate',
                                  ['linear'],
                                  ['line-progress'],
                                  0,
                                  'blue',
                                  0.1,
                                  'royalblue',
                                  0.3,
                                  'cyan',
                                  0.5,
                                  'lime',
                                  0.7,
                                  'yellow',
                                  1,
                                  'red',
                                ],
                              }}
                          />
                        </ShapeSource>
                    )
                  }
              ) : ""
        }
        {
          routes.length ?
              routes.slice(1).length !== 0 ?
                  routes.slice(1)
                      .filter(
                          (data) => data.length > 1
                      )
                      .map((route, index) => {
                            return (
                                <ShapeSource
                                    key={index + 10}
                                    id={"routeSource" + index + 10}
                                    lineMetrics={true}
                                    shape={{
                                      type: "Feature",
                                      geometry: {
                                        type: "LineString",
                                        coordinates: route
                                      }
                                    }}
                                >
                                  <LineLayer
                                      id={'routeFill' + index + 10}
                                      style={{
                                        lineColor: 'red',
                                        lineCap: 'round',
                                        lineJoin: 'round',
                                        lineWidth: 5,
                                        lineGradient: [
                                          'interpolate',
                                          ['linear'],
                                          ['line-progress'],
                                          0,
                                          'blue',
                                          0.1,
                                          'royalblue',
                                          0.3,
                                          'cyan',
                                          0.5,
                                          'lime',
                                          0.7,
                                          'yellow',
                                          1,
                                          'red',
                                        ],
                                      }}
                                  />
                                </ShapeSource>
                            )
                          }
                      ):
                  <></> : ""
        }
      </MapView>
  );
};

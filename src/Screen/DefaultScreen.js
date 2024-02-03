import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { modeState, viewToastState, recordState } from "../Utils/atom";
import {BackHandler} from "react-native";
import { PlusMarker } from "./PlusMarker";
import { MarkerView } from "./MarkerView";
import { DeleteMarkerView } from "./deleteMarker";
import { MarkerInfo } from "./MarkerInfo";
import { DefaultSaveScreen } from "./DefaultSaveScreen";
import { DefaultRouteScreen } from "./DefaultRouteScreen";
import { DefaultFileScreen } from "./DefaultFileScreen";
import { useToast, Box, Text } from "native-base";
export const DefaultScreen = () => {
  let toast = useToast();
  let [mode, setMode] = useRecoilState(modeState);

  let [prevMode, setPrevMode] = useState(mode);
  const [viewToast, setViewToast] = useRecoilState(viewToastState);
  const viewToastHandler = (text) => {
    toast.show({
      render: () => {
        return (
          <Box bg="red.500" px="2" py="1" rounded="sm" mt={5}>
            <Text>{text}</Text>
          </Box>
        );
      },
    });
  };
  useEffect(() => {
    setViewToast(() => viewToastHandler);
  }, []);
  useEffect(() => {
    setPrevMode(mode);
    if (prevMode !== mode && mode === "plusMarker") {
      toast.show({
        title: "마커 추가 모드",
        placement: "top",
        variant: "subtle",
        duration: 1000,
      });
    }
    if (prevMode !== mode && mode === "markerView") {
      toast.show({
        title: "마커 보기 모드",
        placement: "top",
        variant: "subtle",
        duration: 1000,
      });
    }
    if (prevMode !== mode && mode === "deleteMarker") {
      toast.show({
        title: "마커 삭제 모드",
        placement: "top",
        variant: "subtle",
        duration: 1000,
      });
    }
    if (prevMode !== mode && mode === "MarkerInfo") {
      toast.show({
        title: "마커 정보 모드",
        placement: "top",
        variant: "subtle",
        duration: 1000,
      });
    }
    if (prevMode !== mode && mode === "save") {
      toast.show({
        title: "저장 모드",
        placement: "top",
        variant: "subtle",
        duration: 1000,
      });
    }
    if (prevMode !== mode && mode === "route") {
      toast.show({
        title: "경로 모드",
        placement: "top",
        variant: "subtle",
        duration: 1000,
      });
    }
    if (prevMode !== mode && mode === "file") {
      toast.show({
        title: "파일 모드",
        placement: "top",
        variant: "subtle",
        duration: 1000,
      });
    }
  }, [mode]);
  useEffect(() => {
    if (prevMode === "plusMarker" && mode === "default") {
      toast.show({
        render: () => {
          return (
            <Box bg="green.500" px="2" py="1" rounded="sm" mb={5}>
              <Text>마커가 추가되었습니다.</Text>
            </Box>
          );
        },
      });
    }
    if (prevMode === "deleteMarker" && mode === "default") {
      toast.show({
        render: () => {
          return (
            <Box bg="green.500" px="2" py="1" rounded="sm" mb={5}>
              <Text>마커가 삭제되었습니다.</Text>
            </Box>
          );
        },
      });
    }
  }, []);

  return (
    <>
      {mode === "plusMarker" ? (
        <PlusMarker />
      ) : mode === "markerView" ? (
        <MarkerView />
      ) : mode === "deleteMarker" ? (
        <DeleteMarkerView />
      ) : mode === "MarkerInfo" ? (
        <MarkerInfo />
      ) : mode === "save" ? (
        <DefaultSaveScreen />
      ) : mode === "route" ? (
        <DefaultRouteScreen />
      ) : mode === "file" ? (
        <DefaultFileScreen />
      ) : null}
    </>
  );
};

import React, {useEffect, useRef} from "react";
import {Box, StatusBar} from "native-base";
import {DefaultMapScreen} from "./src/MapScreen/defaultMapScreen";
import {useRecoilState} from "recoil";
import {Dimensions, BackHandler, Alert, AppState} from "react-native";
import {DefaultScreen} from "./src/Screen/DefaultScreen";
import {DefaultIcon} from "./src/Screen/DefaultIcon";
import {BannerAd} from "react-native-google-mobile-ads";
import * as Location from "expo-location"
import {myLocationState, routeState, markerState} from "./src/Utils/atom";
import * as TaskManager from "expo-task-manager";
import {stopLocationUpdatesAsync} from "expo-location";

const LOCATION_TRACKING = 'location-tracking';

export default function Default() {
    const adUnitId = "ca-app-pub-5218306923860994/2970041329";
    const appState = useRef(AppState.currentState);
    const [routes, setRoutes] = useRecoilState(routeState);
    const [myInfoLocation, setMyInfoLocation] = useRecoilState(myLocationState);
    const startLocationTracking = async()=>{
        await Location.startLocationUpdatesAsync(
            LOCATION_TRACKING,{
                accuracy: Location.Accuracy.High,
                deferredUpdatesDistance: 5,
                timeInterval:5000,
                showsBackgroundLocationIndicator: true,
                foregroundService:{
                    notificationTitle: "Covid Tracker",
                    notificationBody: "hello world",
                    notificationColor: "#AA1111"
                }
            }
        )
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(
            LOCATION_TRACKING
        );
        await Location.watchPositionAsync(
            {accuracy: Location.Accuracy.High, distanceInterval: 5},
            (locations) => {
                let latitude = locations.coords.latitude
                let longitude = locations.coords.longitude
                setMyInfoLocation([
                    longitude,
                    latitude,
                ])
                setRoutes((prev) =>
                    [
                        [
                            [...prev[0][0], [longitude, latitude]],
                            ...prev[0].slice(1)
                        ],
                        ...prev.slice(1)
                    ]
                )
            })

        console.log('tracking started?', hasStarted);
    }
    const requestPermission = async() => {
        const {status} = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            console.error('위치 권한이 없습니다.');
            const {status: status2} = await Location.requestBackgroundPermissionsAsync();
            if (status2 !== 'granted') {
                console.error('백그라운드 위치 권한이 없습니다.');
            }

        }
    }
    useEffect(() => {
        requestPermission()
        startLocationTracking()
        const backAction = () => {
            Alert.alert('나가기', '정말로 종료 할거야(백그라운드 task로 남길거면 백그라운드로 종료)', [
                {
                    text: '취소',
                    onPress: () => null,
                    style: 'cancel',
                },
                {
                    text: "종료", onPress: ()=>{
                        stopLocationUpdatesAsync()
                        BackHandler.exitApp()
                    }
                }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    let adWidth = Dimensions.get("window").width;
    adWidth = adWidth.toFixed(0);

    return (
        <>
            <StatusBar backgroundColor={"#000000"}/>
            <Box height={"50"} width={`${adWidth}px`}>
                <BannerAd
                    unitId={adUnitId}
                    size={`${adWidth}x50`}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
            </Box>
            <Box
                space={2}
                width={Dimensions.get("window").width}
                height={Dimensions.get("window").height - 50}
            >
                <Box alignItems={"center"} justifyContent={"center"} flex={1}>
                    <DefaultMapScreen/>
                </Box>
                <DefaultScreen/>
                <DefaultIcon/>
            </Box>
        </>
    );
}

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
    if (error) {
        console.log('LOCATION_TRACKING task ERROR:', error);
        return;
    }
    if (data) {
        console.log(
            `${new Date(Date.now()).toLocaleString()}`
        );
    }
});

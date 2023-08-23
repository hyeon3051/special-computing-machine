import Geolocation from "@react-native-community/geolocation";
import {Platform} from "react-native";
import {useEffect} from "react";
export const granted = () => {
    useEffect(() => {
        if (Platform.OS === "android") {
            Geolocation.requestAuthorization();
        }
    }, []);
}

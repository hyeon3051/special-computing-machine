import {Platform, StatusBar} from "react-native";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {Dimensions} from "react-native";

export const statusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight
export const Height = Dimensions.get('window').height - statusBarHeight

export const Colors = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FF0000",
    "#00FF00",
]


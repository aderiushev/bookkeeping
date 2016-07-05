import {
    green500,
    orange500,
    blue500,
    red500,
    darkBlack,
    grey300
} from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

export default {
    spacing: Spacing,
    zIndex: zIndex,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: green500,
        primary2Color: orange500,
        primary3Color: blue500,
        accent1Color: red500,
        /*accent2Color: grey100,
        accent3Color: grey500,*/
        textColor: darkBlack
        /*alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: ColorManipulator.fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500*/
    },
    tabs: {
        backgroundColor: blue500
    },
    toggle: {
        trackOffColor: grey300
    }
};
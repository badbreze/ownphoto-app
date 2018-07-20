import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


//Padding for blocks
export const paddingValue = 2;

function _calculateItemSize() {
    let {height, width} = Dimensions.get('window');
    return (width - paddingValue * 10) / 4;
}
export const blockSizes = _calculateItemSize();

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};

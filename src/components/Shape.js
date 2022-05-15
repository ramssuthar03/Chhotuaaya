import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, {Path} from 'react-native-svg';

const Shape = ({style,children}) => {

    const originalWidth = 411;
    const originalHeight = 276;
    const aspectRatio = originalWidth / originalHeight;
    const windowWidth = Dimensions.get('window').width;

    return ( <View style={[{aspectRatio,width:windowWidth},{...style}]} >
        <Svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${originalWidth} ${originalHeight}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M0 250V0h411v195l-65.423 71.529a28.997 28.997 0 0 1-23.722 9.334L0 250Z"
            fill="#F1f1f1"
          />
          {children}
        </Svg>
    </View> );
}
 
export default Shape;
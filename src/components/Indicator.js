import React from 'react';
import {View, Animated} from 'react-native';
import Colors from '../constants/Colors';

const Indicator = ({scrollX, data, width, height}) => {
  return (
    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
      {data.map((item, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [20, 50, 20],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index}
            style={{
              width: scale,
              height: 10,
              borderRadius: 5,
              backgroundColor: Colors.App,
              margin: 5,
              opacity,
            }}></Animated.View>
        );
      })}
    </View>
  );
};

export default Indicator;

import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import tw from '../lib/tailwind'
import Carousel, {Pagination} from 'react-native-snap-carousel';
const Slider = ({data,autoplay,autoplayInterval,sliderWidth,itemWidth,enableSnap,navigation}) => {
    return ( <Carousel
    data={data}
        loop={true}
        containerCustomStyle={tw`flex my-3`}
        activeSlideAlignment='start'
        contentContainerCustomStyle={tw`mx-3`}
        renderItem={({item, index}) => {
          return(
          <TouchableOpacity activeOpacity={0.9}
          onPress={()=>{
            navigation.navigate('Product',{id:item.data.id})
          }}
            style={{
              display: 'flex',
              aspectRatio:16/9
            }}>
            <Image
              resizeMode="stretch"
              style={tw`rounded-1 w-full h-full self-center `}
              source={{uri:`https:chhotuaaya.com/${item.data.image}`}}
            />
          </TouchableOpacity>
        )}}
        autoplay={autoplay}
        enableSnap={enableSnap}
        autoplayInterval={autoplayInterval}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth-100}
      /> );
}
 
export default Slider;
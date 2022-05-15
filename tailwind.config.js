const { Dimensions } = require('react-native');
const colors = require('tailwindcss/colors');
const { default: Colors } = require('./src/constants/Colors');
const deviceWidth = Dimensions.get('window').width;
const deviceScale = Dimensions.get('window').scale;

module.exports = {
    theme: {
      fontFamily: {
        sans: ['Montserrat-Bold', 'ui-sans-serif', 'system-ui'],
  
        serif: ['ui-serif', 'Georgia'],
  
        mono: ['ui-monospace', 'SFMono-Regular'],
  
        myfontbold: ['Urbanist-Bold'],
        myfontextrabold: ['Urbanist-ExtraBold'],
        myfontregular: ['Urbanist-Regular'],
        myfontsemibold: ['Urbanist-SemiBold'],
        myfontmedium: ['Urbanist-Medium'],
      },
      colors: {
        transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: Colors.White,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red:colors.red,
      app:Colors.App,
      error:Colors.Error,
      success:Colors.Success,
      shape:Colors.Shape,
      darkblue:Colors.textDarkBlue
      },
      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'tiny': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
        "h1": `${(deviceWidth/8)}px`,
        "h2": `${(deviceWidth/9)}px`,
        "p": `${(deviceWidth/22)}px`,
        "p2": `${(deviceWidth/26)}px`,
      }
    },
  };
  
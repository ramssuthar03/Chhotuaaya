import React from 'react';
import { View } from 'react-native';
import Svg, { Path,
  Defs,
  LinearGradient,
  Stop,
  RadialGradient,} from 'react-native-svg';
import Colors from '../constants/Colors';
const Logo = ({style,width}) => {

    const originalWidthForLogo = 416;
    const originalHeightForLogo  = 419;
    const aspectRatioForLogo = originalWidthForLogo / originalHeightForLogo;
    

    return ( <View style={[{aspectRatio:aspectRatioForLogo,width:width},{...style}]}>
    <Svg
      width="100%"
      height="100%"
      fill="none"
      viewBox={`0 0 ${originalWidthForLogo} ${originalHeightForLogo}`}
      xmlns="http://www.w3.org/2000/svg">
     <Path
      opacity={0.98}
      d="M206.659 55.432c-4.895-31.44-33.183-42.805-56.245-35.92-23.062 6.886-30.777 33.183-27.376 60.89 2.572 20.74 14.767 33.1 29.118 38.077 0 0 13.107 3.692 30.113.125 21.818-7.798 28.579-36.294 24.39-63.172Z"
      fill="#FEEAD5"
    />
    <Path
      d="M198.156 39.09c1.12-.125 2.239.332 2.903 1.286l2.24 3.152s5.931 7.632-15.513 9.955c-15.306 1.7-28.164 2.986-34.261 3.567-1.95.207-3.235 2.115-2.696 3.982 2.737 9.291 9.332 33.431 4.936 34.427-4.936 1.078-18.831-25.841-21.486-31.067a3.107 3.107 0 0 1-.29-1.825l1.866-13.44c.207-1.41 1.286-2.488 2.696-2.654l59.605-7.383Z"
      fill="#000"
    />
    <Path
      d="M185.09 59.995s7.508-1.078 16.633-.498c.622.042.456.54-.249.622l-14.601 2.074c-.871-.746-1.451-1.451-1.783-2.198Z"
      fill="#000"
    />
    <Path
      d="m151.119 75.218 9.789 23.85c.373 5.226-4.065 9.54-9.291 8.917-21.32-2.488-39.529-18.001-44.838-39.445-6.927-27.915 10.328-56.619 38.243-63.545 24.596-6.098 49.815 6.553 60.185 28.786 2.24 4.77-.415 10.41-5.558 11.697l-36.543 6.885c-3.94.954-18.955 4.272-11.987 22.855Z"
      fill="url(#a)"
    />
    <Path
      d="m149.294 74.47 10.121 24.764c.415 5.433-4.231 9.913-9.623 9.249-22.108-2.613-41.022-18.707-46.539-40.939-7.217-28.993 10.701-58.775 39.695-65.95 25.551-6.347 51.723 6.802 62.466 29.864 2.323 4.977-.456 10.784-5.765 12.111l-37.953 7.135c-4.065 1.078-19.619 4.521-12.402 23.767Z"
      fill="url(#b)"
    />
    <Path
      opacity={0.34}
      d="M178.993 5.41s10.618 7.797-19.703 31.108c-17.711 13.647-28.744 19.661-34.841 22.316-1.95.83-2.24 3.484-.498 4.687 1.949 1.41 3.774 3.442 4.355 6.346.29 1.369-.539 2.696-1.867 3.11-3.235.996-7.009 7.093-6.097 10.91 1.618 6.47 8.254 9.664 14.725 5.267.166-.124.373-.124.539-.166.788-.124 3.318-1.161 4.107-9.208a2.697 2.697 0 0 1 3.484-2.323c7.964 2.323 28.495 5.268 45.875 1.037 29.366-7.093 21.112-39.943 17.504-44.05-.166-.207-.083-.539-.166-.788-1.079-2.82-8.918-20.822-27.417-28.247Z"
      fill="url(#c)"
    />
    <Path
      d="M128.97 95.169c8.613 0 15.596-6.983 15.596-15.596 0-8.614-6.983-15.596-15.596-15.596-8.614 0-15.596 6.982-15.596 15.596 0 8.613 6.982 15.596 15.596 15.596Z"
      fill="url(#d)"
    />
    <Path
      d="M140.957 112.673s-7.093.663-6.595 5.226c.498 4.562 8.337 8.586 16.674 10.452 8.337 1.867 14.766 3.028 23.477 1.95 8.876-1.12 10.204-1.41 15.015-3.07 0 0-.166-3.027-.539-4.977-.415-2.115-.456-5.309-3.194-4.397-3.028 1.037.747-.124 0 0-1.286.166-2.903.788-5.185 1.12-2.281.332-4.728.871-7.383 1.12-2.696.208-2.737.042-5.102.125-1.742.041-5.433.041-7.881-.332-2.447-.374-7.009-1.328-7.009-1.328s-5.061-1.576-7.757-2.986c-2.738-1.452-4.521-2.903-4.521-2.903Z"
      fill="url(#e)"
    />
    <Path d="M285.385 171.364h-13.273v10.826h13.273v-10.826Z" fill="#662483" />
    <Path
      opacity={0.98}
      d="m248.261 166.387 12.527-2.53s7.342-2.074 10.038-.415c2.696 1.659 2.447 16.301 2.447 16.301s.124 3.609-5.89 2.074c-6.014-1.535-10.328-5.766-10.328-5.766l-9.54-.082.746-9.582Z"
      fill="#FEEAD5"
    />
    <Path
      d="M176.006 136.606a1.946 1.946 0 0 0-.912-.374c-2.738-.58-15.762-2.53-21.071 10.287-5.393 13.066 37.703 29.491 49.11 30.569.622.042 7.591.457 9.333.415h34.8a2.496 2.496 0 0 0 2.489-2.488v-10.204a2.462 2.462 0 0 0-2.116-2.447c-6.221-.913-24.97-3.692-38.699-5.724-14.517-2.157-14.144-6.969-32.934-20.034Z"
      fill="url(#f)"
    />
    <Path
      d="M193.178 67.751c.208 1.494 1.867 2.49 3.692 2.24 1.825-.249 3.152-1.659 2.945-3.152-.208-1.493-1.867-2.489-3.692-2.24-1.825.249-3.152 1.66-2.945 3.152Z"
      fill="url(#g)"
    />
    <Path
      d="M206.825 83.43a13.841 13.841 0 0 1-4.522 2.199 14.03 14.03 0 0 1-5.765.414"
      stroke="url(#h)"
      strokeMiterlimit={10}
    />
    <Path
      d="m122.499 206.165 79.929 1.41c.166-23.145-1.493-55.374-12.941-80.385 0 0-36.377 11.614-55.125-9.291 0 0-14.974 19.121-12.112 84.284.042 1.369.125 2.696.249 3.982Z"
      fill="url(#i)"
    />
    <Path
      d="M177.582 143.284a1.942 1.942 0 0 0-.912-.374c-2.738-.58-15.762-2.53-21.071 10.287-5.392 13.066 37.704 29.491 49.11 30.569.622.042 7.591.457 9.333.415h34.8a2.496 2.496 0 0 0 2.489-2.488v-10.204a2.463 2.463 0 0 0-2.116-2.447c-6.221-.913-24.97-3.692-38.699-5.724-14.559-2.157-14.185-6.969-32.934-20.034Z"
      fill="url(#j)"
    />
    <Path
      d="M201.889 212.926h-77.523a4.16 4.16 0 0 1-4.148-4.148 4.16 4.16 0 0 1 4.148-4.148h77.523a4.16 4.16 0 0 1 4.147 4.148c-.041 2.281-1.866 4.148-4.147 4.148Z"
      fill="url(#k)"
    />
    <Path
      d="M124.366 212.926s-17.338 21.61 4.645 40.69c15.596 13.563 90.547-1.535 90.547-1.535l4.107 61.886a17.44 17.44 0 0 0 9.415 13.688c.125.083.249.124.374.207 13.024 6.388 20.241-8.71 17.172-22.854l-9.997-77.316c-1.285-5.931-3.276-10.701-7.217-13.19-1.742-1.079-3.525-1.327-7.01-1.867-6.761-.995-10.867-.373-19.826-.166-2.655.042-1.162-.041-9.789 0-7.798-.041-26.505.083-72.421.457Z"
      fill="url(#l)"
    />
    <Path
      d="M277.794 318.156c.664 5.31-7.715 10.204-8.959 10.909-2.24 1.328-6.388 3.277-22.896 3.194-11.614-.041-17.504-.124-20.491-2.779-5.724-5.06-7.258-15.679-2.986-21.32 4.604-6.056 14.808-4.77 26.38-3.318 1.867.249 6.471.871 12.153 2.779 7.425 2.447 16.177 5.392 16.799 10.535Z"
      fill="url(#m)"
    />
    <Path
      d="M93.423 255.483h-56.41a4.443 4.443 0 0 1-4.44-4.439v-56.41a4.443 4.443 0 0 1 4.44-4.438h56.41a4.443 4.443 0 0 1 4.438 4.438v56.41a4.417 4.417 0 0 1-4.438 4.439Z"
      fill="url(#n)"
    />
    <Path
      d="M206.451 275.102h-92.455c-4.853 0-8.752-3.941-8.752-8.752v-2.116c0-4.852 3.94-8.751 8.752-8.751h92.455c4.853 0 8.752 3.94 8.752 8.751v2.116a8.727 8.727 0 0 1-8.752 8.752Z"
      fill="url(#o)"
    />
    <Path
      d="M91.805 275.102H38.63a9.825 9.825 0 0 1-9.83-9.831 9.825 9.825 0 0 1 9.83-9.83h53.175a9.824 9.824 0 0 1 9.83 9.83 9.825 9.825 0 0 1-9.83 9.831Z"
      fill="url(#p)"
    />
    <Path
      d="M330.43 184.14h-27.127c-1.825 0-3.111 1.825-2.488 3.567 7.59 20.946 45.792 131.196 19.245 136.837-32.145 6.802-51.391 7.715-122.9 7.715-.415 0 18.541 2.323-1.203-.332-19.743-2.613-26.795-15.637-10.867-35.298 17.421-21.527 21.361-21.527 21.361-21.527H33.818c-.788 0-1.534.373-2.074.954-5.102 6.18-32.436 40.939-31.73 76.32.414 20.407 15.678 27.749 30.113 30.113a2.634 2.634 0 0 0 3.028-3.028 58.695 58.695 0 0 1-.581-6.055c-1.244-31.483 25.302-57.365 56.742-55.416 27.915 1.743 50.023 24.929 50.023 53.3 0 1.908-.083 3.775-.29 5.641-.207 1.95 1.701 3.484 3.567 2.779 18.043-6.553 36.128-13.148 54.171-19.702 3.774-1.369 15.679-2.53 11.697-2.115-6.844.746 15.388-.125 42.764-.374.664 0 31.15-.083 41.229.332 7.632.332 11.324 10.287 16.965 15.43 1.701 1.535 4.438.332 4.438-1.949v-.042c0-29.491 23.892-53.382 53.383-53.382.581 0 1.161 0 1.742.041 1.825.041 3.152-1.701 2.655-3.443l-38.7-128.5a2.625 2.625 0 0 0-2.53-1.866Z"
      fill="url(#q)"
    />
    <Path
      d="M86.662 418.078c26.252 0 47.534-21.282 47.534-47.534 0-26.253-21.282-47.535-47.534-47.535-26.253 0-47.535 21.282-47.535 47.535 0 26.252 21.282 47.534 47.535 47.534Z"
      fill="url(#r)"
    />
    <Path
      d="m85.459 382.158-50.106-.125c-10.204-.041-17.545-9.913-14.518-19.661 8.545-27.583 34.428-47.824 64.624-47.824 30.279 0 56.203 20.324 64.706 47.99 2.987 9.748-4.355 19.62-14.559 19.62H85.459Z"
      fill="url(#s)"
    />
    <Path
      d="M368.466 418.078c26.252 0 47.534-21.282 47.534-47.534 0-26.253-21.282-47.535-47.534-47.535-26.253 0-47.534 21.282-47.534 47.535 0 26.252 21.281 47.534 47.534 47.534Z"
      fill="url(#t)"
    />
    <Path
      opacity={0.98}
      d="m250.501 172.111 12.527-2.53s7.341-2.074 10.038-.415c2.654 1.659 2.447 16.301 2.447 16.301s.124 3.609-5.89 2.074c-6.015-1.535-10.328-5.766-10.328-5.766l-9.54-.082.746-9.582Z"
      fill="#FEEAD5"
    />
    <Path
      d="M267.964 180.033a2.53 2.53 0 1 0 0-5.06 2.53 2.53 0 0 0 0 5.06ZM286.463 166.885l35.423-28.911c5.35-4.396 13.397-2.696 16.549 3.485l13.481 26.504c3.567 7.01-1.286 15.389-9.125 15.762l-48.903 2.406c-6.222.29-11.407-4.646-11.407-10.868 0-3.235 1.452-6.346 3.982-8.378Z"
      fill="#662483"
    />
    <Path d="M69.656 190.196h-9.209v65.287h9.209v-65.287Z" fill="#F6F6F6" />
    <Path d="M32.607 219.03v9.208h65.287v-9.208H32.607Z" fill="#F6F6F6" />
    <Path
      d="m368.673 372.452-35.796 27.541c-7.3 5.6-17.96 2.613-21.195-6.014-9.125-24.348-1.867-53.051 19.661-69.725 21.568-16.716 51.267-16.509 72.545-1.494 7.508 5.31 7.715 16.384.457 22.025l-35.672 27.667Z"
      fill="url(#u)"
    />
    <Defs>
      <LinearGradient
        id="c"
        x1={114.265}
        y1={59.312}
        x2={208.065}
        y2={35.999}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E29B8A" />
        <Stop offset={0.002} stopColor="#E09B8A" />
        <Stop offset={0.071} stopColor="#BFA5A0" />
        <Stop offset={0.143} stopColor="#9AA8B3" />
        <Stop offset={0.221} stopColor="#6CA8C2" />
        <Stop offset={0.304} stopColor="#29A6CD" />
        <Stop offset={0.394} stopColor="#00A4D6" />
        <Stop offset={0.494} stopColor="#00A2DC" />
        <Stop offset={0.608} stopColor="#00A0E1" />
        <Stop offset={0.75} stopColor="#009FE3" />
        <Stop offset={1} stopColor="#009FE3" />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={135.323}
        y1={124.66}
        x2={350.761}
        y2={94.377}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#29235C" />
        <Stop offset={0.107} stopColor="#3C2468" />
        <Stop offset={0.253} stopColor="#4E2474" />
        <Stop offset={0.421} stopColor="#5B247C" />
        <Stop offset={0.63} stopColor="#642481" />
        <Stop offset={1} stopColor="#662483" />
      </LinearGradient>
      <LinearGradient
        id="h"
        x1={196.488}
        y1={85.451}
        x2={206.555}
        y2={86.907}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E29B8A" />
        <Stop offset={0.15} stopColor="#E09685" />
        <Stop offset={0.327} stopColor="#DC8977" />
        <Stop offset={0.519} stopColor="#D67361" />
        <Stop offset={0.721} stopColor="#CD5346" />
        <Stop offset={0.929} stopColor="#C22A2A" />
        <Stop offset={1} stopColor="#BE1622" />
      </LinearGradient>
      <LinearGradient
        id="k"
        x1={214.443}
        y1={204.891}
        x2={128.893}
        y2={211.376}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#662483" />
        <Stop offset={0.521} stopColor="#47246F" />
        <Stop offset={1} stopColor="#29235C" />
      </LinearGradient>
      <LinearGradient
        id="l"
        x1={16.693}
        y1={217.531}
        x2={205.228}
        y2={264.124}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#312783" />
        <Stop offset={0.521} stopColor="#4C2683" />
        <Stop offset={1} stopColor="#662483" />
      </LinearGradient>
      <LinearGradient
        id="o"
        x1={105.225}
        y1={265.293}
        x2={215.216}
        y2={265.293}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#312783" />
        <Stop offset={0.521} stopColor="#4C2683" />
        <Stop offset={1} stopColor="#662483" />
      </LinearGradient>
      <LinearGradient
        id="p"
        x1={28.83}
        y1={265.293}
        x2={101.645}
        y2={265.293}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#312783" />
        <Stop offset={0.521} stopColor="#4C2683" />
        <Stop offset={1} stopColor="#662483" />
      </LinearGradient>
      <LinearGradient
        id="q"
        x1={0.055}
        y1={283.357}
        x2={371.794}
        y2={283.357}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#2D2E83" />
        <Stop offset={0.521} stopColor="#4B2A83" />
        <Stop offset={1} stopColor="#662483" />
      </LinearGradient>
      <LinearGradient
        id="r"
        x1={27.873}
        y1={334.269}
        x2={111.372}
        y2={385.8}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" />
        <Stop offset={0.078} stopColor="#DDDCE5" />
        <Stop offset={0.201} stopColor="#AEABC1" />
        <Stop offset={0.328} stopColor="#8582A2" />
        <Stop offset={0.456} stopColor="#645F89" />
        <Stop offset={0.585} stopColor="#4A4575" />
        <Stop offset={0.718} stopColor="#383267" />
        <Stop offset={0.854} stopColor="#2D275F" />
        <Stop offset={1} stopColor="#29235C" />
      </LinearGradient>
      <LinearGradient
        id="s"
        x1={10.241}
        y1={278.443}
        x2={155.646}
        y2={442.593}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" />
        <Stop offset={0.078} stopColor="#DDDCE5" />
        <Stop offset={0.201} stopColor="#AEABC1" />
        <Stop offset={0.328} stopColor="#8582A2" />
        <Stop offset={0.456} stopColor="#645F89" />
        <Stop offset={0.585} stopColor="#4A4575" />
        <Stop offset={0.718} stopColor="#383267" />
        <Stop offset={0.854} stopColor="#2D275F" />
        <Stop offset={1} stopColor="#29235C" />
      </LinearGradient>
      <LinearGradient
        id="t"
        x1={300.754}
        y1={294.104}
        x2={433.007}
        y2={443.407}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" />
        <Stop offset={0.078} stopColor="#DDDCE5" />
        <Stop offset={0.201} stopColor="#AEABC1" />
        <Stop offset={0.328} stopColor="#8582A2" />
        <Stop offset={0.456} stopColor="#645F89" />
        <Stop offset={0.585} stopColor="#4A4575" />
        <Stop offset={0.718} stopColor="#383267" />
        <Stop offset={0.854} stopColor="#2D275F" />
        <Stop offset={1} stopColor="#29235C" />
      </LinearGradient>
      <LinearGradient
        id="u"
        x1={257.879}
        y1={340.032}
        x2={452.024}
        y2={376.802}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" />
        <Stop offset={0.078} stopColor="#DDDCE5" />
        <Stop offset={0.201} stopColor="#AEABC1" />
        <Stop offset={0.328} stopColor="#8582A2" />
        <Stop offset={0.456} stopColor="#645F89" />
        <Stop offset={0.585} stopColor="#4A4575" />
        <Stop offset={0.718} stopColor="#383267" />
        <Stop offset={0.854} stopColor="#2D275F" />
        <Stop offset={1} stopColor="#29235C" />
      </LinearGradient>
      <RadialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(-13.957 217.72 -517.13) scale(96.1177)"
      >
        <Stop stopColor="#fff" />
        <Stop offset={0.2} stopColor="#BDBDBD" />
        <Stop offset={0.461} stopColor="#6D6D6D" />
        <Stop offset={0.676} stopColor="#323232" />
        <Stop offset={0.834} stopColor="#0E0E0E" />
        <Stop offset={0.918} />
      </RadialGradient>
      <RadialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(153.949 54.304) scale(103.925)"
      >
        <Stop offset={0.101} stopColor="#fff" />
        <Stop offset={0.328} stopColor="#B3AFD1" />
        <Stop offset={0.724} stopColor="#312783" />
      </RadialGradient>
      <RadialGradient
        id="d"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(-13.957 389.623 -487.14) scale(46.8257)"
      >
        <Stop offset={0.101} stopColor="#fff" />
        <Stop offset={0.328} stopColor="#B3AFD1" />
        <Stop offset={0.724} stopColor="#312783" />
      </RadialGradient>
      <RadialGradient
        id="f"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(201.671 156.614) scale(37.0521)"
      >
        <Stop stopColor="#662483" />
        <Stop offset={0.521} stopColor="#47246F" />
        <Stop offset={1} stopColor="#29235C" />
      </RadialGradient>
      <RadialGradient
        id="g"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(172.068 95.942 40.46) scale(3.22994)"
      >
        <Stop stopColor="#706F6F" />
        <Stop offset={0.214} stopColor="#595958" />
        <Stop offset={0.528} stopColor="#3B3A39" />
        <Stop offset={0.801} stopColor="#171716" />
        <Stop offset={1} />
      </RadialGradient>
      <RadialGradient
        id="i"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(130.843 180.894) scale(87.0073)"
      >
        <Stop stopColor="#662483" />
        <Stop offset={0.184} stopColor="#582583" />
        <Stop offset={0.491} stopColor="#442683" />
        <Stop offset={0.772} stopColor="#362783" />
        <Stop offset={1} stopColor="#312783" />
      </RadialGradient>
      <RadialGradient
        id="j"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(199.134 163.877) scale(83.0897)"
      >
        <Stop stopColor="#29235C" />
        <Stop offset={0.028} stopColor="#2D235E" />
        <Stop offset={0.258} stopColor="#45246E" />
        <Stop offset={0.494} stopColor="#57247A" />
        <Stop offset={0.738} stopColor="#622481" />
        <Stop offset={1} stopColor="#662483" />
      </RadialGradient>
      <RadialGradient
        id="m"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(255.317 318.722) scale(40.534)"
      >
        <Stop stopColor="#662483" />
        <Stop offset={0.521} stopColor="#47246F" />
        <Stop offset={1} stopColor="#29235C" />
      </RadialGradient>
      <RadialGradient
        id="n"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(94.419 262.364) scale(96.3903)"
      >
        <Stop stopColor="#662483" />
        <Stop offset={0.028} stopColor="#622481" />
        <Stop offset={0.258} stopColor="#492470" />
        <Stop offset={0.494} stopColor="#372365" />
        <Stop offset={0.738} stopColor="#2D235E" />
        <Stop offset={1} stopColor="#29235C" />
      </RadialGradient>
    </Defs>
    </Svg>
  </View> );
}
 
export default Logo;
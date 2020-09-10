import React from 'react'
import { SPACING, ICON_SIZE, width } from '../config/theme'
import Icon from '../Components/Icon'
import BackIcon from '../Components/BackIcon'
import { DATA } from '../config/travel'
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Animated
} from 'react-native'
import { SharedElement } from 'react-navigation-shared-element'

export default function Detail({ navigation, route }) {
  const { item } = route.params
  const ref = React.useRef()
  const selectedItemIndex = DATA.findIndex((i) => i.id === item.id)
  const mountedAnimation = React.useRef(new Animated.Value(0)).current
  const activeIndex = React.useRef(new Animated.Value(selectedItemIndex))
    .current
  const animatedIndexAnimation = React.useRef(
    new Animated.Value(selectedItemIndex)
  ).current

  const animation = (toValue, delay) => {
    return Animated.timing(mountedAnimation, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true
    })
  }

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedIndexAnimation, {
        toValue: activeIndex,
        duration: 300,
        useNativeDriver: true
      }),
      animation(1, 300)
    ]).start()
  })

  const translateDetailY = mountedAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0]
  })

  const translateTextY = mountedAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 0]
  })

  const size = ICON_SIZE + SPACING * 2
  const translateX = animatedIndexAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [size, 0, -size]
  })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackIcon
        onPress={() => {
          animation(0).start(() => {
            navigation.goBack()
          })
        }}
      />
      <Animated.View
        style={{
          flexDirection: 'row',
          flexWrap: 'nowrap',
          marginVertical: 20,
          marginLeft: width / 2 - ICON_SIZE / 2 - SPACING,
          transform: [{ translateX }]
        }}
      >
        {DATA.map((item, index) => {
          const inputRange = [index - 1, index, index + 1]
          const opacity = animatedIndexAnimation.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6]
          })
          return (
            <TouchableOpacity
              style={{ padding: SPACING }}
              key={item.id}
              onPress={() => {
                activeIndex.setValue(index)
                ref.current.scrollToIndex({
                  index,
                  animated: true
                })
              }}
            >
              <Animated.View style={{ alignItems: 'center', opacity }}>
                <SharedElement id={`item.${item.id}.icon`}>
                  <Icon uri={item.imageUri} />
                </SharedElement>
                <Animated.Text
                  style={{
                    fontSize: 10,
                    opacity: mountedAnimation,
                    transform: [{ translateY: translateTextY }]
                  }}
                >
                  {item.title}
                </Animated.Text>
              </Animated.View>
            </TouchableOpacity>
          )
        })}
      </Animated.View>
      <Animated.FlatList
        style={{
          opacity: mountedAnimation,
          transform: [{ translateY: translateDetailY }]
        }}
        ref={ref}
        data={DATA}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        initialScrollIndex={selectedItemIndex}
        nestedScrollEnabled
        getItemLayout={(data, index) => {
          return {
            length: width,
            offset: width * index,
            index
          }
        }}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.floor(event.nativeEvent.contentOffset.x / width)
          activeIndex.setValue(newIndex)
        }}
        renderItem={({ item }) => {
          return (
            <ScrollView
              style={{
                width: width - SPACING * 2,
                margin: SPACING,
                backgroundColor: 'rgba(0,0,0,0.05)',
                borderRadius: 16
              }}
            >
              <View style={{ padding: SPACING }}>
                <Text style={{ fontSize: 16 }}>
                  {Array(50).fill(`${item.title} inner text\n`)}
                </Text>
              </View>
            </ScrollView>
          )
        }}
      />
    </SafeAreaView>
  )
}

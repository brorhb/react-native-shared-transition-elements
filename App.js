import React from 'react'
import { StyleSheet, Easing } from 'react-native'
import List from './Screens/List'
import Detail from './Screens/Detail'
import { enableScreens } from 'react-native-screens'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { NavigationContainer } from '@react-navigation/native'
import { DATA } from './config/travel'

enableScreens()

const Stack = createSharedElementStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='List' headerMode='none'>
        <Stack.Screen name='List' component={List} />
        <Stack.Screen
          name='Detail'
          component={Detail}
          options={() => ({
            gestureEnabled: false,
            transitionSpec: {
              open: {
                animation: 'spring',
                config: { duration: 300, easing: Easing.inOut(Easing.ease) }
              },
              close: {
                animation: 'spring',
                config: { duration: 300, easing: Easing.inOut(Easing.ease) }
              }
            },
            cardStyleInterpolator: ({ current: { progress } }) => {
              return {
                cardStyle: {
                  opacity: progress
                }
              }
            }
          })}
          sharedElementsConfig={(route, otherRoute, showing) => {
            return DATA.map((item) => `item.${item.id}.icon`)
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

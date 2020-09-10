import React from 'react'
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from 'react-native'
import MarkertingSlider from '../Components/MarketingSlider'
import { DATA } from '../config/travel'
import { SPACING } from '../config/theme'
import Icon from '../Components/Icon'
import { SharedElement } from 'react-navigation-shared-element'

export default function List({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MarkertingSlider />
      <View style={styles.container}>
        {DATA.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              style={{ padding: SPACING }}
              onPress={() => navigation.push('Detail', { item })}
            >
              <SharedElement id={`item.${item.id}.icon`}>
                <Icon uri={item.imageUri} />
              </SharedElement>
            </TouchableOpacity>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20
  }
})

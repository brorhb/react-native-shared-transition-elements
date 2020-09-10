import React from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'
import { SLIDER_DATA } from '../config/travel'
import { ITEM_WIDTH, width, SPACING, ICON_SIZE, height } from '../config/theme'

export default function MarkertingSlider() {
  return (
    <FlatList
      data={SLIDER_DATA}
      keyExtractor={(item) => item.color}
      horizontal
      snapToInterval={ITEM_WIDTH + SPACING * 2}
      contentContainerStyle={{
        paddingRight: width - ITEM_WIDTH - SPACING * 2
      }}
      decelerationRate={"fast"}
      renderItem={({item}) => {
        return (
          <View style={[styles.itemContainer, {backgroundColor: item.color}]}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )
      }}
      showsHorizontalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    marginLeft: SPACING,
    width: (width / 3) * 2,
    height: height / 9,
    padding: SPACING,
    borderRadius: ICON_SIZE / 2,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  }
})
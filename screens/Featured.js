/**
 * React Native Event Booking App UI - Featured Screnn
 * -> The screen can be seperated 4 sections
 *
 * TODO:
 * [] Build the header section
 * [] Build the search section (TextInput)
 * [] Build the FEATURED section (Flatlist)
 * [] Build the FOR YOU section
 */
import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  TextInput,
  ImageBackground,
} from 'react-native'
import styled from 'styled-components/native'

import { dummyData, FONTS, SIZES, COLORS, icons, images } from '../constants'
import { McAvatar, McText, McIcon } from '../components'
import { FlatList } from 'react-native-gesture-handler'

const SectionHeader = styled.View`
  padding: 16px ${SIZES.padding};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`
const SectionSearch = styled.View`
  margin: 4px ${SIZES.padding};
  height: 50px;
  background-color: ${COLORS.input};
  border-radius: 15px;
  justify-content: center;
`
const SearchView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 9px;
  margin-right: 15px;
`

const SectionTitle = styled.View`
  margin: 20px ${SIZES.padding};
`
const Featured = ({ navigation }) => {
  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          marginLeft: index === 0 ? 30 : 20,
          marginRight: index === dummyData.Events.length - 1 ? 30 : 0,
        }}
      >
        <ImageBackground
          resizeMethod="cover"
          borderRadius={SIZES.radius}
          source={item.image}
          style={{
            width: SIZES.width / 2 + 70,
            height: SIZES.width / 2 + 70,
            justifyContent: 'space-between',
          }}
        ></ImageBackground>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* headersection */}
      <SectionHeader>
        <View>
          <McText body5 style={{ opacity: 0.5 }}>
            FEBUARY 02 02:02 PM
          </McText>
          <McText h1>Explore Web3 Events</McText>
        </View>
        <McAvatar source={images.avatar} />
      </SectionHeader>
      {/* search View */}

      <SectionSearch>
        <SearchView>
          <McIcon source={icons.search} size={24} />
          <TextInput
            placeholder="Search"
            placeholderTextColor={COLORS.gray1}
            style={{
              ...FONTS.h4,
              color: COLORS.white,
              width: 250,
            }}
          ></TextInput>
          <McIcon source={icons.filter} />
        </SearchView>
      </SectionSearch>
      {/* Feature */}
      <SectionTitle>
        <McText>FEATURES</McText>
      </SectionTitle>
      <View>
        <FlatList
          horizontal
          contentContainerStyle={{}}
          keyExtractor={(item) => 'event_' + item.id}
          data={dummyData.Events}
          renderItem={_renderItem}
        ></FlatList>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
})

export default Featured

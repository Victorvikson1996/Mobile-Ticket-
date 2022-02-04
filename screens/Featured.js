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
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'

import { dummyData, FONTS, SIZES, COLORS, icons, images } from '../constants'
import { McAvatar, McText, McIcon } from '../components'

import moment from 'moment'

const Featured = ({ navigation }) => {
  const _renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('EventDetail', { selectedEvent: item })
        }}
      >
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
          >
            <View
              style={{
                alignItems: 'flex-end',
                marginHorizontal: 15,
                marginVertical: 15,
              }}
            >
              <DateBox>
                <McText
                  body5
                  color={COLORS.black}
                  style={{ opacity: 0.5, letterSpace: 2 }}
                >
                  {moment(item.startingtime).format('MMM').toUpperCase()}
                </McText>
                <McText h2 color={COLORS.black}>
                  {moment(item.startingtime).format('DD')}
                </McText>
              </DateBox>
            </View>

            <View style={{ marginLeft: 20, marginBottom: 25 }}>
              <McText body5 style={{ opacity: 0.5 }}>
                {item.type}
              </McText>
              <McText h2>{item.title}</McText>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
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
        <McText h3>FEATURED</McText>
      </SectionTitle>
      <View>
        <FlatList
          horizontal
          contentContainerStyle={{}}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => 'event_' + item.id}
          data={dummyData.Events}
          renderItem={_renderItem}
        ></FlatList>
      </View>
      <SectionTitle>
        <McText h5>FOR YOU</McText>
      </SectionTitle>
      <LinearGradient
        colors={COLORS.linear}
        start={{ x: 1, y: 1 }}
        style={{
          height: 120,
          marginHorizontal: 30,
          borderRadius: SIZES.radius,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <GiftBox>
            <McIcon source={icons.gift} bsize={24} />
          </GiftBox>
          <View style={{ marginLeft: 22 }}>
            <McText h3>Claim NFT Free Ticket</McText>
            <McText body4 style={{ width: 200 }}>
              Share Web3 Event with friends and get NFT ticket
            </McText>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

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
const DateBox = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 15;
  background-color: ${COLORS.white};
  justify-content: center;
  align-items: center;
`

const GiftBox = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 15;
  background-color: ${COLORS.white};
  justify-content: center;
  align-items: center;
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
})

export default Featured

/**
 * React Native Event Booking App UI - Event Detail Screnn
 * -> The screen can be seperated 4 sections and 1 fixed bottom bar
 *
 * TODO:
 * [] Build the header image background section
 *    [] Rendering the image background sub section (ImageBackground)
 *    [] Rendering the header sub section
 *    [] Rendering the footer sub section (LinearGradient)
 * [] Build the buttons group section
 * [] Build the description section
 * [] Build the location section (google map in dark mode)
 * [] Build the fixed bottom bar
 */
import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native'

import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'

import { dummyData, FONTS, SIZES, COLORS, icons, images } from '../constants'
import { McAvatar, McText, McIcon } from '../components'
import moment from 'moment'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const EventDetail = ({ navigation, route }) => {
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(() => {
    let { selectedEvent } = route.params
    setSelectedEvent(selectedEvent)
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: COLORS.black,
        }}
        style={{
          backgroundColor: COLORS.black,
        }}
      >
        <ImageBackground
          resizeMode="cover"
          source={selectedEvent?.image}
          style={{
            width: '100%',
            height:
              SIZES.height < 700 ? SIZES.height * 0.4 : SIZES.height * 0.5,
          }}
        >
          {/* Image HEader */}
          <View style={{ flex: 1 }}>
            <SectionImageHead>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack()
                }}
                style={{
                  width: 56,
                  height: 40,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}
              >
                <McIcon source={icons.back_arrow} size={24} />
              </TouchableOpacity>
              <View
                style={{
                  width: 96,
                  height: 40,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: 10,
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity>
                  <McIcon
                    source={icons.like}
                    size={24}
                    style={{
                      marginLeft: 16,
                      tinycolor: COLORS.white,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <McIcon
                    source={icons.share}
                    size={24}
                    style={{
                      marginRight: 16,
                      tinycolor: COLORS.white,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </SectionImageHead>
            <SectionImageFooter>
              <LinearGradient
                colors={['transparent', '#000']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                  width: '100%',
                  height: 400,
                  justifyContent: 'flex-end',
                }}
              >
                <FooterContentView>
                  <View>
                    <McText body4 style={{ opacity: 0.5, letterSpacing: 2 }}>
                      {selectedEvent?.type}
                    </McText>
                    <McText h1>{selectedEvent?.title}</McText>
                    <McText body4 style={{ opacity: 0.5, letterSpacing: 1.5 }}>
                      STARTING{' '}
                      {moment(selectedEvent?.startingtime).format('hh:mm A')}
                    </McText>
                  </View>
                  <LinearGradient
                    colors={COLORS.linear}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <McText body4 style={{ letterSpacing: 1 }}>
                      {moment(selectedEvent?.startingtime)
                        .format('MMM')
                        .toLocaleUpperCase()}
                    </McText>
                    <McText h2 style={{}}>
                      {moment(selectedEvent?.startingtime).format('DD')}
                    </McText>
                  </LinearGradient>
                </FooterContentView>
              </LinearGradient>
            </SectionImageFooter>
          </View>
        </ImageBackground>
        {/* Button */}
        <ButtonsSection>
          <TouchableOpacity
            style={{
              width: 76,
              height: 32,
              borderRadius: 10,
              marginRight: 16,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.white,
            }}
          >
            <McText h6 style={{ color: COLORS.black, letterSpacing: 1 }}>
              ABOUT
            </McText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 124,
              height: 32,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.input,
            }}
          >
            <McText h6 style={{ opacity: 0.5, letterSpacing: 1 }}>
              PARTICIPANT
            </McText>
          </TouchableOpacity>
        </ButtonsSection>
        <DescriptionSection>
          <McText body3>{selectedEvent?.description}</McText>
        </DescriptionSection>
        <LocationSection>
          <McText h3>LOCATION</McText>
          <View style={{ height: 250 }}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{ height: 250, borderRadius: 30, marginTop: 20 }}
              minZoomLevel={15}
              initialRegion={dummyData.Region}
              customMapStyle={dummyData.MapStyle}
            >
              <BottomBarSection></BottomBarSection>
            </MapView>
          </View>
        </LocationSection>
      </ScrollView>
    </View>
  )
}

const SectionImageHead = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${Platform.OS === 'ios' ? '40px' : '20px'};
  margin-left: 30px;
  margin-right: 30px;
`

const SectionImageFooter = styled.View`
  flex: 1;
  justify-content: flex-end;
  position: relative;
  z-index: -1;
`

const FooterContentView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0px 30px;
`
const ButtonsSection = styled.View`
  margin: 15px 30px;
  flex-direction: row;
`
const DescriptionSection = styled.View`
  margin: 0px 30px;
`

const LocationSection = styled.View`
  margin: 25px 30px;
`

const BottomBarSection = styled.View`
  height: 130px;
  width: ${SIZES.width + 'px'};
  border-radius: ${SIZES.radius};
  background-color: ${COLORS.tabBar};
  position: absolute;
  bottom: 0px;
  justify-content: center;
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
})

export default EventDetail

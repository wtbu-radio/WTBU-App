import React from 'react'
import { View, Text, Image, Button, SafeAreaView } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

import TrackPlayer from 'react-native-track-player';

export default class MediaPlayerScreen extends React.Component {

  componentDidMount() {
    loc(this);
  }
  
  componentWillUnMount() {
    rol();
  }

  render() {
    let src = this.props.navigation.getParam('src', 'https://google.com')
    let track = {
      id: src, // Must be a string, required
      
      url: src, // Load media from the network
      //url: require('./avaritia.ogg'), // Load media from the app bundle
      //url: 'file:///storage/sdcard0/Music/avaritia.wav' // Load media from the file system 
  
      title: 'WTBU Live',
      artist: 'WTBU DJs',
      //album: 'while(1<2)',
      //genre: 'Progressive House, Electro House',
      //date: '2014-05-20T07:00:00+00:00', // RFC 3339
      
      //artwork: 'http://example.com/avaritia.png', // Load artwork from the network
      artwork: require('../assets/AlbumDefault.png'), // Load artwork from the app bundle
      //artwork: 'file:///storage/sdcard0/Downloads/artwork.png' // Load artwork from the file system
    }
    
    TrackPlayer.getCurrentTrack().then( response => {
      //console.log(response)
      let currentTrack = response

      if (currentTrack) {
        if (currentTrack != track.id){
          TrackPlayer.removeUpcomingTracks()
          TrackPlayer.remove(currentTrack)
          TrackPlayer.add(track).then(function() {
            // The tracks were removed, add a new one.
            console.log(`Fresh track added! : ${track.id}`)
          });
        }
        //The tracks were the same id, we don't need to do anything.
      } else {
        TrackPlayer.add(track).then(function() {
          // The tracks were added
          console.log(`First track added! : ${track.id}`)
        });
      }
      //TrackPlayer.play() TODO: Uncomment when I'm not constantly testing the media player. [Auto start media]
    })   
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{width: wp('100%'), height: hp('50%'), backgroundColor: 'powderblue', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={ require('../assets/AlbumDefault.png') } style={ { resizeMode: 'center', width: '80%', height: '80%' } }/>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 36, textAlign: 'center' }}>{this.props.navigation.getParam('title', 'Default Title!')}</Text>
          <Text style={{ textAlign: 'center' }}>{this.props.navigation.getParam('src', 'https://google.com')}</Text>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'red'
          }}>
            <Button
              title="Pause"
              onPress={() => 
                TrackPlayer.pause()
              }
            />
            <Button
              title="Rev"
              onPress={() => 
                TrackPlayer.getPosition().then( position => TrackPlayer.seekTo( position + 10) )
              }
            />
            <Button
              title="Play"
              onPress={() => {
                TrackPlayer.play()
                TrackPlayer.getCurrentTrack().then( response => 
                  {
                    if (!response) {
                      TrackPlayer.add(track).then( () => {
                        // The tracks were removed, add a new one.
                        console.log(`Fresh track added! : ${track.id}`)
                        TrackPlayer.play()
                      });
                    }
                  })
                }
              }
            />
            <Button
              title="Fwd"
              onPress={() => 
                TrackPlayer.getPosition().then( position => TrackPlayer.seekTo( position - 10) )
              }
            />
            <Button
              title="Stop"
              onPress={() => 
                TrackPlayer.stop()
              }
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
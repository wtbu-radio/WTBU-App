import React from 'react'
import { View, Text, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native'
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

import TrackPlayer from 'react-native-track-player';
import { ProgressComponent } from 'react-native-track-player';

function getPrettyTime(seconds : number) : string {
  let hours = Math.floor(seconds / 3600)
  let minutes = Math.floor((seconds - hours * 3600) / 60)
  let goodSeconds = Math.floor((seconds - hours * 3600 - minutes * 60))

  function str_pad_left(string : number,pad : string,length : number) {
    return (new Array(length+1).join(pad)+string).slice(-length);
  }

  return `${hours}:${str_pad_left(minutes,'0',2)}:${str_pad_left(goodSeconds,'0',2)}`
}

class Rewind extends React.Component {

  render(){
    return (
      <TouchableOpacity
        style={{
          borderWidth:1,
          borderColor:'rgba(0,0,0,0)',
          alignItems:'center',
          justifyContent:'center',
          width:60,
          height:60,
          backgroundColor:'white',
          borderRadius:30,
        }}
        onPress={ () => TrackPlayer.getPosition().then( position => TrackPlayer.seekTo( position - 10) ) }
      >
        <Icon name="fast-rewind" color="#d32f2f" size={40} /> 
      </TouchableOpacity>
    )
  }

}

class Forward extends React.Component {
  render(){
    return (
      <TouchableOpacity
        style={{
            borderWidth:1,
            borderColor:'rgba(0,0,0,0)',
            alignItems:'center',
            justifyContent:'center',
            width:60,
            height:60,
            backgroundColor:'white',
            borderRadius:30,
          }}
        onPress={ () => TrackPlayer.getPosition().then( position => TrackPlayer.seekTo( position + 10) ) }
      >
        <Icon name="fast-forward" color="#d32f2f" size={40} />
      </TouchableOpacity>
    )
  }
}

class PlayPause extends React.Component {

  constructor(props) {
    super(props)
    this.state = { isPlaying: true }
  }
  
  state = { isPlaying: true }

  render() {
    if (this.state.isPlaying){
      return (
        <TouchableOpacity
          style={{
              borderWidth:1,
              borderColor:'rgba(0,0,0,0)',
              alignItems:'center',
              justifyContent:'center',
              width:100,
              height:100,
              backgroundColor:'white',
              borderRadius:50,
            }}
          onPress={ () => {
            TrackPlayer.pause()
            this.setState( () => ({ isPlaying: false}) )
          } }
        >
          <Icon name="pause" color="#d32f2f" size={40} />
        </TouchableOpacity>
      )
    }

    return (
      <TouchableOpacity
        style={{
            borderWidth:1,
            borderColor:'rgba(0,0,0,0)',
            alignItems:'center',
            justifyContent:'center',
            width:100,
            height:100,
            backgroundColor:'white',
            borderRadius:50,
          }}
        onPress={ () => {
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
          this.setState( () => ({ isPlaying: true}) )
        } }
      >
        <Icon name="play-arrow" color="#d32f2f" size={40} />
      </TouchableOpacity>
    )    
    
  }
}

class SeekBar extends ProgressComponent {

  render() {
    let fancyDuration
    if (this.state.duration){
      let adjDuration = this.state.duration -1
      fancyDuration = getPrettyTime(adjDuration)
    } else {
      fancyDuration = 'LIVE'
    }

    let position = this.getProgress()
    return (
      <View style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        //backgroundColor: 'red'
      }}>
        <Slider
          style={{width:'100%', height: 40}}
          minimumValue={0}
          maximumValue={1}      
          onValueChange={value =>
            TrackPlayer.seekTo(Math.floor(this.state.duration * value))
          }    
          
          value={position}
          minimumTrackTintColor="#d32f2f"
          maximumTrackTintColor="#d32f2f"
          thumbTintColor="#d32f2f"
        />
        <View style={{
          flex: 1,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 20,
          //backgroundColor: 'red'
        }}>
          <Text>{getPrettyTime(Math.max(0, Math.floor(this.state.position -1)))}</Text>
          
          <Text>{fancyDuration}</Text>
        </View>
      </View>
    )    
    
  }
}

export default class MediaPlayerScreen extends React.Component {

  componentDidMount() {
    loc(this);
  }
  
  componentWillUnMount() {
    rol();
  }

  constructor(props){
    super(props)
    const src = props.navigation.getParam('src', 'https://google.com')
    const title = props.navigation.getParam('title', 'WTBU')

    const track = {
      id: src, // Must be a string, required
      
      url: src, // Load media from the network
      //url: require('./avaritia.ogg'), // Load media from the app bundle
      //url: 'file:///storage/sdcard0/Music/avaritia.wav' // Load media from the file system 
  
      title: title,
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
          //TrackPlayer.removeUpcomingTracks()
          //TrackPlayer.remove(currentTrack)
          TrackPlayer.reset().then( () => {
            TrackPlayer.add(track).then(function() {
              // The tracks were removed, add a new one.
              console.log(`Fresh track added! : ${track.id}`)
            });
          })
        }
        //The tracks were the same id, we don't need to do anything.
      } else {
        TrackPlayer.add(track).then(function() {
          // The tracks were added
          console.log(`First track added! : ${track.id}`)
        });
      }
      TrackPlayer.play()
    })  

    this.state = { title: title, src: src}
  }

  state = { title: 'WTBU', src: 'https://google.com'}

  render() {  
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6', paddingTop: 10 }}>
        <View style={{width: wp('100%'), height: hp('50%'), alignItems: 'center', justifyContent: 'center' }}>
          <Image source={ require('../assets/AlbumDefault.png') } style={ { resizeMode: 'contain', width: '80%', height: '80%' } }/>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 36, textAlign: 'center' }}>{this.state.title}</Text>
          <SeekBar />
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 64,
            paddingRight: 64
            //backgroundColor: 'red'
          }}>
            <Rewind />
            <PlayPause />
            <Forward />
          </View>
        </View>
      </View>
    )
  }
}

/* Stop button
            <Button
              title="Stop"
              onPress={() => 
                TrackPlayer.stop()
              }
            />
            */

/* Track src debugging
          <Text style={{ textAlign: 'center' }}>{src}</Text>
*/

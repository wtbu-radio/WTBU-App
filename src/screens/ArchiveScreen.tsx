import React from 'react'
import { View, Text, Button, ActivityIndicator, FlatList } from 'react-native'

import RadioShows from '../services/Headphones'
import ShowDetail from '../components/ShowDetail'

export default class ArchiveScreen extends React.Component {

  state = { isLoading: true, shows: {} as RadioShows }

  render() {

    if(this.state.isLoading){
      return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#d32f2f" />
        </View>
      )
    } 

    return (
      <View style={{flex: 1, paddingLeft:16, paddingRight:16, paddingTop:4, paddingBottom:4}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.shows.showList}
          renderItem={ radioShow => <ShowDetail show={radioShow.item} navigation={this.props.navigation} />}
          keyExtractor={({name}) => name}
        />
      </View>
    )
  }

  componentDidMount(){
    let radioShows = new RadioShows()
    let gotData = false

    setInterval(() => {
      if(!gotData){
        radioShows.fetchData().then( showsOnHeadphones => {
          if(showsOnHeadphones){
            radioShows.updateShows(showsOnHeadphones)
            this.setState( () => ({ shows: radioShows }))
            this.setState( () => ({ isLoading: false }))
            console.log('Fetched shows from headphones!')
            gotData = true
          } else {
            console.log('No shows from headphones! Will retry...')
          }
        })
      }
    }, 1000)

  }
}
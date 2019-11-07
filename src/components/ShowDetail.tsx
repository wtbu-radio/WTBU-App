import React from 'react'
import { View, Text, Button, TouchableHighlight, TouchableOpacity } from 'react-native'

export default class ShowDetail extends React.Component {

    broadcastJSX : Element[] = []

    constructor(props){
        super(props)
        for(let i=0; i < props.show.broadcasts.length; i++){
            let broadcast = props.show.broadcasts[i]
            this.broadcastJSX.unshift(
                <TouchableOpacity style={{backgroundColor:'#d32f2f', borderRadius:4, padding:4, margin:4}} onPress={() => props.navigation.navigate('MediaPlayer', { src: broadcast.url, title: props.show.name })}>
                    <View>
                        <Text style={{color:'white', fontSize:14}}>{broadcast.getPrettyTime()}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    state = { showingBroadcasts: false }

    render() {

        if(this.state.showingBroadcasts){
            return (
                <View style={{margin:4, backgroundColor:'white', borderRadius:4 }}>
                    <TouchableOpacity style={{padding:16}} onPress={() => this.setState( () => ({showingBroadcasts: false}))}>
                        <View>
                            <Text style={{fontSize:16}}>{this.props.show.name}</Text>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start', flexWrap:'wrap'}}>
                                {this.broadcastJSX}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={{margin:4, backgroundColor:'white', borderRadius:4 }}>
                <TouchableOpacity style={{padding:16}} onPress={() => this.setState( () => ({showingBroadcasts: true}))}>
                    <View>
                        <Text style={{fontSize:16}}>{this.props.show.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

}

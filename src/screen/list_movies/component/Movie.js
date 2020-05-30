import React from 'react'
import * as Progress from 'react-native-progress';
import {
  View,
  Text,
  Button,
  Image,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Colors from '../../../ext/Colors';
import { parseDate } from '../../../ext/Helper';

class Movie extends React.Component {

  state = {
    loading: true,
    data: []
  }

  componentDidMount = async () => {
    const {
      url
    } = this.props

    const request = await fetch(url)
    if (request.status == 200) {
      const { results } = await request.json()
      this.setState({ loading: false, data: results })
    } else {
      ToastAndroid.show('Fail to request API', ToastAndroid.LONG)
    }


  }

  RenderMovieItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate("Detail", { "movie": item })}
    >
      <View style={{ padding: 10, width: Dimensions.get('window').width / 2 }}>
        <ImageBackground
          style={{ height: 250, backgroundColor: 'grey', borderRadius: 10 }}
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}>
          <View style={{ backgroundColor: 'black', width: 40, height: 40, borderRadius: 40, position: 'absolute', bottom: -20, }}>
            <Progress.Circle
              progress={(item.vote_average * 10) / 100}
              size={40}
              borderWidth={0}
              showsText={true}
              thickness={4}
              formatText={number => `${item.vote_average * 10}`}
              textStyle={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}
              color={Colors.colors.orange}
            />
          </View>
        </ImageBackground>

        <Text style={{ marginTop: 25, fontWeight: 'bold', fontSize: 18 }}>{item.name ?? item.title}</Text>
        <Text>{parseDate(item.first_air_date ?? item.release_date)}</Text>

      </View>
    </TouchableOpacity>
  )

  RenderEmpty = () => (
    this.state.loading ? (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    ) : (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Empty Movies</Text>
        </View>
      )
  )

  render() {

    const {
      loading,
      data
    } = this.state

    return (
      <View style={{ margin: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>{this.props.title}</Text>
          <Text style={{ paddingVertical: 4, paddingHorizontal: 18, backgroundColor: 'black', color: '#7ACAAB', fontWeight: '500', borderRadius: 50 }}>{this.props.defaultFilter}</Text>
        </View>
        <FlatList
          horizontal={true}
          contentContainerStyle={{ flexGrow: 1 }}
          data={data}
          renderItem={this.RenderMovieItem}
          keyExtractor={(_, index) => index.toString()}
          ListEmptyComponent={this.RenderEmpty} />
      </View>
    );
  }
}

export default Movie
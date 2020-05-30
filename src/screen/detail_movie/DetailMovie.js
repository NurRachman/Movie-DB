import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  Linking,
  FlatList,
  ActivityIndicator
} from 'react-native'
import Colors from '../../ext/Colors';
import * as Progress from 'react-native-progress';
import { splitDate } from '../../ext/Helper';
import Icon from 'react-native-vector-icons/MaterialIcons'


class DetailMovie extends React.Component {

  state = {
    otherData: {},
    linkTrailer: [],
    dataCast: [],
    loading: true
  }

  componentDidMount = async () => {
    const {
      movie
    } = this.props.route.params
    const request = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=599f366e432623b8112fa5e7fccb0d21&language=en-US`)
    if (request.status == 200) {
      var response = await request.json()
      this.setState({ otherData: response })
    }

    const requestTrailer = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=599f366e432623b8112fa5e7fccb0d21&language=en-US`)
    if (requestTrailer.status == 200) {
      var { results } = await requestTrailer.json()
      this.setState({ linkTrailer: results })
    }

    const requestCast = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=599f366e432623b8112fa5e7fccb0d21`)
    if (requestCast.status == 200) {
      var { cast } = await requestCast.json()
      this.setState({ dataCast: cast, loading: false })
    }

  }

  RenderCast = ({ item }) => (
    <TouchableOpacity>
      <View style={{ padding: 10, width: Dimensions.get('window').width / 2, elevation: 8 }}>
        <ImageBackground
          style={{ height: 150, backgroundColor: 'grey', borderRadius: 10 }}
          resizeMode='cover'
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }} >
        </ImageBackground>

        <Text style={{ marginTop: 25, fontWeight: 'bold', fontSize: 18 }}>{item.name ?? '-'}</Text>
        <Text>{item.character ?? ''}</Text>

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
      movie
    } = this.props.route.params

    const {
      dataCast
    } = this.state

    return (
      <View style={{ flex: 1 }}>

        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingBottom: Dimensions.get('screen').height / 9.5 }}>
            <ImageBackground
              style={{ height: Dimensions.get('window').height / 4, backgroundColor: 'gray' }}
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}>
              <View style={{ height: Dimensions.get('window').height / 4, width: 120, justifyContent: 'center' }}>
                <Image style={{ width: 100, height: 120, backgroundColor: 'white', alignSelf: 'center', borderRadius: 10 }}
                  source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} />
              </View>
            </ImageBackground>

            <View style={{ backgroundColor: '#1E2F3D', padding: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white', marginHorizontal: 4 }}>
                  {movie.name ?? movie.title}
                </Text>
                <Text style={{ fontSize: 18, color: 'white' }}>{`(${splitDate(movie.first_air_date ?? movie.release_date, "YYYY")})`}</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flex: 1 }}>
                  <Progress.Circle
                    progress={(movie.vote_average * 10) / 100}
                    size={40}
                    borderWidth={0}
                    showsText={true}
                    thickness={4}
                    formatText={number => `${movie.vote_average * 10}`}
                    textStyle={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}
                    color={'green'}
                  />
                  <Text style={{ marginHorizontal: 10, color: 'white', fontSize: 18 }}>User Progress</Text>
                </View>
                <View style={{ marginHorizontal: 10 }}>
                  <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold' }}>|</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.linkTrailer.length > 0) {
                      Linking.canOpenURL(`https://www.youtube.com/watch?v=${this.state.linkTrailer[0]["key"]}`).then(supported => {
                        if (supported) {
                          Linking.openURL(`https://www.youtube.com/watch?v=${this.state.linkTrailer[0]["key"]}`);
                        } else {
                          console.log("Don't know how to open URI: " + this.state.linkTrailer[0]);
                        }
                      });
                    }
                  }}>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Icon name='play-arrow' size={24} color='white' />
                    <Text style={{ marginHorizontal: 10, color: 'white', fontSize: 18 }}>WatchTrailer</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ padding: 16, backgroundColor: '#1B2A37', justifyContent: 'center' }}>
              <Text style={{ color: 'white', fontSize: 16, alignSelf: 'center' }}>{this.state.otherData.genres ? this.state.otherData.genres.map(res => res['name'] + ",") : 'Gaada'}</Text>
            </View>

            <View style={{ backgroundColor: '#1E2F3D', padding: 16 }}>

              <Text style={{ fontSize: 18, color: 'gray', marginHorizontal: 4, fontStyle: 'italic' }}>{this.state.otherData.tagline ?? ''}</Text>
              <Text style={{ fontSize: 20, color: 'white', marginHorizontal: 4, marginTop: 8, fontWeight: 'bold' }}>Overview</Text>
              <Text style={{ fontSize: 18, color: 'white', marginHorizontal: 4, marginTop: 8 }}>{this.state.otherData.overview ?? ''}</Text>

            </View>

            <View style={{ padding: 16 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>Top Billed Cast</Text>
              <FlatList
                horizontal={true}
                data={dataCast}
                renderItem={this.RenderCast}
                contentContainerStyle={{ flexGrow: 1 }}
                keyExtractor={(_, index) => index.toString()}
                ListEmptyComponent={this.RenderEmpty} />
            </View>

          </View>
        </ScrollView>

        <View style={styles.footerNetFlix}>
          <TouchableOpacity onPress={() => {
            if (this.state.linkTrailer.length > 0) {
              Linking.canOpenURL(`${this.state.otherData.homepage}`).then(supported => {
                if (supported) {
                  Linking.openURL(`${this.state.otherData.homepage}`);
                } else {
                  console.log("Don't know how to open URI: " + this.state.otherData.homepage);
                }
              });
            }
          }}>

            <View style={{ flexDirection: 'row' }}>
              <Image
                width={50}
                height={50}
                style={styles.footerImageNetFlix}
                source={{
                  uri: "https://images.justwatch.com/icon/430997/s100"
                }} />
              <View>
                <Text style={{ ...styles.labelFooter }}>Now Streaming</Text>
                <Text style={{ ...styles.labelFooter, fontWeight: 'bold' }}>Watch Now</Text>
              </View>
            </View>

          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerNetFlix: {
    position: 'absolute',
    backgroundColor: '#0B2F42',
    height: Dimensions.get('screen').height / 9.5,
    width: Dimensions.get('screen').width,
    bottom: 0,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerImageNetFlix: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 8,
    marginHorizontal: 16
  },
  labelFooter: {
    fontSize: 16,
    color: 'white',
  }
})

export default DetailMovie
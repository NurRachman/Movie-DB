import React from 'react';
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
  Picker,
  TouchableOpacity
} from 'react-native';
import Colors from '../../ext/Colors';
import Movie from './component/Movie';

class AppListMovies extends React.Component {
  render() {

    var itemMovie = [
      {
        title: "What's Popular",
        defaultFilter: "Streaming",
        url: "https://api.themoviedb.org/3/movie/popular?api_key=599f366e432623b8112fa5e7fccb0d21&language=en-US&page=1"
      },
      {
        title: "Trending",
        defaultFilter: "Today",
        url: "https://api.themoviedb.org/3/trending/movie/day?api_key=599f366e432623b8112fa5e7fccb0d21"
      },
      {
        title: "Upcoming",
        defaultFilter: "-",
        url: "https://api.themoviedb.org/3/movie/upcoming?api_key=599f366e432623b8112fa5e7fccb0d21&language=en-US&page=1"
      },
    ]

    return (
      <ScrollView>
        <View>

          <ImageBackground
            style={styles.containerImage}
            source={{ uri: "https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg" }}
            resizeMode='cover'>

            <View style={{ margin: 10 }}>
              <Text style={{ ...styles.imageLabel, fontSize: 38, fontWeight: 'bold' }}>Welcome.</Text>
              <Text style={styles.imageLabel}>Millions of movies, TV Shows and people to discover. Explor Now</Text>

              <View style={styles.searchWrapper}>
                <Text style={styles.searcLabel}>
                  Search...
                </Text>
                <Text style={styles.searchButton}>
                  Search
                </Text>
              </View>
            </View>
          </ImageBackground>

          {
            itemMovie.map(element => (
              <Movie
                key={element.url}
                {...this.props}
                {...element}
              />
            ))
          }


        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  containerImage: {
    height: Dimensions.get('screen').height / 3.5,
    width: Dimensions.get('screen').width
  },
  imageLabel: {
    fontSize: 24,
    fontWeight: '500',
    color: 'white'
  },
  searchWrapper: {
    borderRadius: 50,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  searcLabel: {
    padding: 10,
    fontSize: 18,
    color: 'grey'
  },
  searchButton: {
    backgroundColor: '#06BADB',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 16,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default AppListMovies
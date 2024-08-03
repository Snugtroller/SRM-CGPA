import { Image, StyleSheet, View, Text } from "react-native";
import { Divider } from 'react-native-elements';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require("../srm.webp")} style={styles.headimg} />
        <Text style={styles.title}>YASYAREM CGPA CALCULATOR</Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.tabletitle}>
      <Text style={styles.coursetitle}>Course</Text>
      <Text style={styles.coursetitle}>Credits</Text>
      <Text style={styles.coursetitle}>Grade</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282c34",
  },
  headerContainer:{
    flexDirection:"row",
  },
  headimg:{
    height:100,
    width:100,
    marginTop:50,
    marginLeft:20,
  },
  title:{
    color:"white",
    marginTop:70,
    marginLeft:50,
    fontSize:25,
    width:250,
    fontWeight:"bold",
  },
  divider:{
    backgroundColor: "#ffffff",
    height: 2,
    marginLeft:15,
    marginRight:15,
    borderRadius: 5,
    marginVertical: 15,
  },
  tabletitle:{
    flexDirection:"row",
    gap:90,
  },
  coursetitle:{
    color:"white",
    marginLeft:15,
    fontSize:18,
  }

});

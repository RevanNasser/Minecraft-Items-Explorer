import { View, Text, StyleSheet, Image } from 'react-native';

export default function Header() {
  
  return (
    <View style={styles.headerContainer}>
      <Image 
        source={require('../../minecraft-app/assets/minecraft-logo.png')}
        style={styles.logo} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: '#252326',
    paddingVertical: 12,
    paddingTop: 50,
    borderRadius: 16,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
     
    shadowOpacity: 0.3, 
    shadowRadius: 4, 

    // Shadow for Android
    elevation: 5,
  },
  logo: {
    width: 150,
    height: 60,
    marginLeft: 10, 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
   
  },
});

// importing React
import * as React from 'react';
// Importing all the necessary components.
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard } from 'react-native';
// Importing "Speech" to say what the user typed in.
import * as Speech from "expo-speech";
import * as ImagePicker from "expo-image-picker";
//import firebase from "firebase";
import { firebase } from '../config'
//import storage from '../config';
import { set } from 'react-native-reanimated';
// exporting the class so other files can import it.
export default class TextToSpeechScreen extends React.Component {
  constructor() {
    super();
    // state will contain what the user typed.
    this.state = {
      name: "",
      imagePath: "",
      isLoading: false,
      status: '',
    }
  }

  chooseFile = async() => {
    this.setState({ status: 'picking image..' });
    // var options = {
    //     title: 'Select Image',
    //     customButtons: [
    //         { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
    //     ],
    //     storageOptions: {
    //         skipBackup: true, // do not backup to iCloud
    //         path: 'images', // store camera images under Pictures/images for android and Documents/images for iOS
    //     },
    // };

    const { cancelled, result } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      //  let path = this.getPlatformPath(response.uri).value;
      //  let fileName = this.getFileName(response.fileName, path);
    
      // let path = response.uri;
      // let fileName = response.fileName;
      this.setState({ imagePath: result.uri, path: result.fileName, status : "uploading.." });
      // this.uploadImageToStorage(result.uri, result.fileName);
    // ImagePicker.showImagePicker(options, response => {
    //     if (response.didCancel) {
    //         console.log('User cancelled image picker', storage());
    //     } else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //     } else if (response.customButton) {
    //         console.log('User tapped custom button: ', response.customButton);
    //     } else {
    //         let path = this.getPlatformPath(response).value;
    //         let fileName = this.getFileName(response.fileName, path);
    //         this.setState({ imagePath: path });
    //         this.uploadImageToStorage(path, fileName);
    //     }
    // });
    if(!cancelled) {
      this.uploadImage(result.uri);
    }
};

// getFileName(name, path) {
//     if (name != null) { return name; }

//     if (Platform.OS === "ios") {
//         path = "~" + path.substring(path.indexOf("/Documents"));
//     }
//     return path.split("/").pop();
// }

uploadImage = async (uri) => {
  this.setState({ isLoading: true });
  this.setState({ isLoading: false, status: uri });
  var response = await fetch(uri);
  var blob = await response.blob();

  var ref = firebase
    .storage()
    .ref()
    .child("files/"+"../text.png");

  return ref.put(blob).then((response) => {
    this.fetchImage("../text.png");
  });
};

/**
 * Get platform specific value from response
 */
getPlatformPath({ path, uri }) {
    return Platform.select({
        android: { "value": path },
        ios: { "value": uri }
    })
}

getPlatformURI(imagePath) {
    let imgSource = imagePath;
    if (isNaN(imagePath)) {
        imgSource = { uri: this.state.imagePath };
        if (Platform.OS == 'android') {
            imgSource.uri = "file:///" + imgSource.uri;
        }
    }
    return imgSource
}


  // function that will say whatever is inside of "name" state.
  speak = () => {
    var thingToSay = this.state.name;
    Speech.speak(thingToSay);
  }

  // selectPicture = async() => {
  // const result  = await ImagePicker.launchImageLibraryAsync({
  //   mediaTypes: ImagePicker.MediaTypeOptions.All,
  //   allowsEditing: true,
  //   aspect: [4, 3],
  //   quality: 1,
  // });
  // console.log(result.uri);

 

  // const {imageName, uploadUri} = this.state;
  // let reference = storage().ref(result.fileName);
  // let task = reference.putFile(result.uri);
  // task.then(() => {
  //   setState({ name : "image uploaded"});
  //   console.log('Image uploaded to the bucket!');
  //   //this.setState({ isLoading: false, status: 'Image uploaded successfully' });
  // }).catch((e) => {
  //     setState({ name : "image upload failed"});
  //     //status = 'Something went wrong';
  //     console.log('uploading image error => ', e);
  //     //this.setState({ isLoading: false, status: 'Something went wrong' });
  // });

  performOCR = async() => {
    try {
    // this.setState({ uploading: true });
    // let { image } = this.state;
    let body = JSON.stringify({
      requests: [
        {
          "image": {
              // "content": result.uri
              "source": {
                "imageUri":   "gs://cloud-samples-data/vision/demo-img.jpg"
              }
          },
          features: [
            { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
          ]
        }
      ]
    });
    console.log(body);
    let response = await fetch(
      'https://vision.googleapis.com/v1/images:annotate?key='+'AIzaSyDs33U1Dwj_k2i-D_vZbkzAdAtGkGeqDKI',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: body
      }
    );
    var responseJson = await response.json();
    console.log(JSON.stringify(responseJson));
    //this.setState({name:responseJson})

    // this.setState({
    //   googleResponse: responseJson,
    //   uploading: false
    // });
  } catch (error) {
    console.log(error);
  }
  
  this.setState({name:JSON.stringify(responseJson)})
}
 render() {
  return (
    // giving style to everything inside of View Component
    <View style={styles.container}>
      <View style={styles.profileContainer}>
          <Text style={styles.title}>Audify</Text>
        </View>
      <View style={styles.buttonContainer}>
      <KeyboardAvoidingView>
      <TextInput style ={styles.inputBox}
      onChangeText= {(text) => {
        this.setState({ name: text});
      }}
      // User can write multiple lines inside of the Text Input.
      multiline={true}
      value= {this.state.text}>
      </TextInput>
      </KeyboardAvoidingView>
      <TouchableOpacity style ={styles.button}
      // onPress will call the speak function, as well as dismiss the keyboard of the phone.
      onPress ={()=> {
        this.speak(); 
        Keyboard.dismiss();
      }}>
        <Text style ={styles.buttonText}>Listen</Text>
      </TouchableOpacity>
      <TouchableOpacity style ={styles.button}
      onPress ={()=> {
        this.chooseFile();
      }}>
        <Text style ={styles.buttonText}>Select A Picture</Text>
      </TouchableOpacity>
      <Text styles={styles.inputBox}>{this.state.status}</Text>
    </View>
  </View>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 78,
    fontWeight: "200",
    paddingBottom: 25,
    color: '#005588',
    marginTop: 10
  },
  inputBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: '#005588',
    fontSize: 20,
    margin: 10,
    marginTop: -20,
    paddingLeft: 10,
  },
  button: {
    width: 300,
    height: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#005588',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: {
    color: '#FFFF',
    fontWeight: "200",
    fontSize: 25,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

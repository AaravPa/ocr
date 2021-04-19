// import * as React from "react";
// import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
// //import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { useEffect, useState } from 'react';
// //import { createWorker } from 'tesseract.js';
// import * as ImagePicker from "expo-image-picker";

// // const [image, setImage] = useState();
// // const [result, setResult] = useState({});

// // const onTakePhoto = () => launchCamera({ mediaType: 'image' }, onImageSelect);

// // const onSelectImagePress = () => launchImageLibrary({ mediaType: 'image' }, onImageSelect);

// // const onImageSelect = async (media) => {
// //     if (!media.didCancel) {
// //       setImage(media.uri);
// //       //const processingResult = ml().cloudDocumentTextRecognizerProcessImage(media.uri)
// //       //console.log(processingResult);
// //       //setResult(processingResult);
// //     }
// //   };

// // const submitToGoogle = async () => {
  
// // };

// const selectPicture = async() => {
//   const { uri } = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.All,
//     allowsEditing: true,
//     aspect: [4, 3],
//     quality: 1,
//   });
//   try {
//     // this.setState({ uploading: true });
//     // let { image } = this.state;
//     let body = JSON.stringify({
//       requests: [
//         {
//           features: [
//             // { type: 'LABEL_DETECTION', maxResults: 10 },
//             // { type: 'LANDMARK_DETECTION', maxResults: 5 },
//             // { type: 'FACE_DETECTION', maxResults: 5 },
//             // { type: 'LOGO_DETECTION', maxResults: 5 },
//             // { type: 'TEXT_DETECTION', maxResults: 5 },
//             { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
//             // { type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
//             // { type: 'IMAGE_PROPERTIES', maxResults: 5 },
//             // { type: 'CROP_HINTS', maxResults: 5 },
//             // { type: 'WEB_DETECTION', maxResults: 5 }
//           ],
//           image: {
//             "content":uri
//           }
//         }
//       ]
//     });
//     console.log(body);
//     let response = await fetch(
//       'https://vision.googleapis.com/v1/images:annotate?key='+'AIzaSyDs33U1Dwj_k2i-D_vZbkzAdAtGkGeqDKI',
//       {
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json'
//         },
//         method: 'POST',
//         body: body
//       }
//     );
//     let responseJson = await response.json();
//     console.log(JSON.stringify(responseJson));
//     // this.setState({
//     //   googleResponse: responseJson,
//     //   uploading: false
//     // });
//   } catch (error) {
//     console.log(error);
//   }
//   // const worker = createWorker({
//   //   logger: m => console.log(m),
//   // });
//   // const doOCR = async () => {
//   //   await worker.load();
//   //   await worker.loadLanguage('eng');
//   //   await worker.initialize('eng');
//   //   const { data: { text } } = await worker.recognize(uri);
//   //   console.log(text);
//   };
//   //const [ocr, setOcr] = useState('Recognizing...');
//   //doOCR();
//   //console.log("url:"+uri);
//   //const processingResult = ml().cloudDocumentTextRecognizerProcessImage(uri)
//   //console.log(processingResult);

// //}

// export default class OCRScreen extends React.Component {
//   constructor() {
//   super();
//   this.state = {
// 		image: "../text.png",
// 		uploading: false,
// 		googleResponse: null
// 	};
//   }

//  render() {
//    return(
//     <ScrollView contentContainerStyle={styles.screen}>
//       <Text style={styles.title}>Text Recognition</Text>
//       <View>
//         <TouchableOpacity style={styles.button} onPress={()=> {
//           selectPicture()
//         }}>
//           <Text style={styles.buttonText}>Take Photo</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={()=> {
//           selectPicture()
//         }}>
//           <Text style={styles.buttonText}>Pick a Photo</Text>
//         </TouchableOpacity>
        
//         <View style={{marginTop: 30}}>
        
//         </View>
//       </View>   
//     </ScrollView>
//   );
//   }
// }
// const styles = StyleSheet.create({
//     image: {
//         height: 300,
//         width: 300,
//         marginTop: 30,
//         borderRadius: 10,
//       },
//     screen: {
//       flex: 1,
//       alignItems: 'center',
//     },
//     title: {
//       fontSize: 35,
//       marginVertical: 40,
//     },
//     button: {
//       backgroundColor: '#47477b',
//       color: '#fff',
//       justifyContent: 'center',
//       alignItems: 'center',
//       paddingVertical: 15,
//       paddingHorizontal: 40,
//       borderRadius: 50,
//       marginTop: 20,
//     },
//     buttonText: {
//       color: '#fff',
//     },
//   })
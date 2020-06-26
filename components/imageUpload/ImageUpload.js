import React from 'react';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import { Image, View, Platform, Button } from 'react-native';

import imagePlaceholder from '../../assets/images/avatar_placeholder.png';

import styles from './styles';

const ImageUpload = (props) => {
  const { onChange, value, buttonTitle } = props;

  const handleImageUpload = () => {
    const options = {
      noData: true,
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('response:', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const { uri, path, fileName } = response;
        const firebaseImage = {
          source: Platform.OS == 'ios' ? uri : path,
          ref: storage().ref(fileName),
        };
        Promise.resolve(firebaseImage.ref.putFile(firebaseImage.source)).then(
          () => {
            firebaseImage.ref.getDownloadURL().then((firebaseURL) => {
              onChange(firebaseURL);
            });
          }
        );
      }
    });
  };

  return (
    <View style={styles.profilePicInputField}>
      <Image
        style={styles.profilePic}
        source={value ? { uri: value } : imagePlaceholder}
      />
      <Button
        onPress={handleImageUpload}
        title={buttonTitle}
        style={styles.profilePicUploadButton}
      />
    </View>
  );
};

export default ImageUpload;

import React, { useEffect } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
} from 'react-native';
import * as firebase from 'firebase'

import styles from './styles';

const LoadingScreen = (props) => {

    const { navigation } = props;

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            navigation.navigate(user ? "App" : "Auth");
        });
    })

    return (
        <View style={styles.container} >
            <Text style={styles.text} >
                LoadingScreen
            </Text>
            <ActivityIndicator size='large'></ActivityIndicator>
        </View>
    )
}

export default LoadingScreen;

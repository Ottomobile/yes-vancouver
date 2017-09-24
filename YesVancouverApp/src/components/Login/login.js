
import React, { Component } from 'react';
import {StyleSheet,View,Image, Text, KeyboardAvoidingView} from 'react-native';
import LoginForm from './LoginForm';
import { StackNavigator } from 'react-navigation';

export default class Login extends Component {

    static navigationOptions = {
        title: 'Login Screen',
    };

  render() {
    return (

      <KeyboardAvoidingView behavior="padding" style={styles.container}>
      

        <View style={styles.bannerContainer}>
          
        </View>
        <View style= {styles.formContainer}>
        <LoginForm/>
        </View>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1

  },

  bannerContainer:{
    paddingBottom: 200
  }

});


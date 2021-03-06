import React, { Component } from 'react'
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default class EditProfile extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isEditProfileLoading: true,
            contactDetails: null,
            newContactFirstName: '',
            newContactLastName: '',
            newContactEmail: '',
            newContactPhone: '',
            newContactCompany: '',
            newContactJobTitle: '',
            newContactLinkedIn: '',
            newContactFacebook: '',
            newContactInstagram: '',
            newContactTwitter: '',
            newContactWebsite: '',
            newContactOtherInfo: ''
        }

        // For determining the next field to focus on when user clicks next on the keyboard
        this.focusNextField = this.focusNextField.bind(this)
        this.inputs = {}
    }

    focusNextField(id) {
        this.inputs[id].focus();
    }

    async componentDidMount(){
        let { params } = this.props.navigation.state;
        let contactDetails = params ? params.contactDetails : null
        console.log(contactDetails)

        this.setState({
            contactDetails: contactDetails,
            newContactFirstName: contactDetails.firstName,
            newContactLastName: contactDetails.lastName,
            newContactEmail: contactDetails.email,
            newContactPhone: contactDetails.phone,
            newContactCompany: contactDetails.company,
            newContactJobTitle: contactDetails.jobTitle,
            newContactLinkedIn: contactDetails.linkedIn,
            newContactFacebook: contactDetails.facebook,
            newContactInstagram: contactDetails.instagram,
            newContactTwitter: contactDetails.twitter,
            newContactWebsite: contactDetails.website,
            newContactOtherInfo: contactDetails.otherInfo,
            isEditProfileLoading: false,
        })
    }

    render(){
        if(this.state.isEditProfileLoading) {
            return (
                <View style={editProfileStyles.activityIndicator}>
                    <ActivityIndicator size="large" color="#ED4969" />
                </View>
            )
        }
        else {
            return this.returnEditProfileView()
        }
    }

    async submitDetails() {
        let { navigation } = this.props

        let newContactDetailsObj = this.state.contactDetails.clone()
        newContactDetailsObj.firstName = this.state.newContactFirstName
        newContactDetailsObj.lastName = this.state.newContactLastName
        newContactDetailsObj.email = this.state.newContactEmail
        newContactDetailsObj.phone = this.state.newContactPhone
        newContactDetailsObj.company = this.state.newContactCompany
        newContactDetailsObj.jobTitle = this.state.newContactJobTitle
        newContactDetailsObj.linkedIn = this.state.newContactLinkedIn
        newContactDetailsObj.facebook = this.state.newContactFacebook
        newContactDetailsObj.instagram = this.state.newContactInstagram
        newContactDetailsObj.twitter = this.state.newContactTwitter
        newContactDetailsObj.website = this.state.newContactWebsite
        newContactDetailsObj.otherInfo = this.state.newContactOtherInfo

        let updateResult = await newContactDetailsObj.updateContactDetails()
        if (updateResult !== null) {
            Alert.alert(
                'Details Updated',
                'Your profile details have been updated.',
                [
                    {text: "Ok", style:'cancel'}
                ]
            )
            await Expo.SecureStore.setItemAsync('contactEmail', newContactDetailsObj.email)
            navigation.state.params.refreshProfileDetails()
            navigation.goBack()
        }
        else {
            Alert.alert(
                'Update Failed',
                'Please try to update your details again.',
                [
                    {text: "Ok", style:'cancel'}
                ]
            )
        }
    }

    returnEditProfileView(){
        let { navigation } = this.props
        return (
            <KeyboardAwareScrollView style={editProfileStyles.scrollView} 
                contentContainerStyle={editProfileStyles.scrollViewContentContainer}
                enableAutomaticScroll={true}
                extraScrollHeight={20}
                enableOnAndroid={true}
                enableResetScrollToCoords={false}>
                
                <View style={editProfileStyles.contentTopSpacer} />

                <View style={editProfileStyles.inputRow}>
                    <View style={editProfileStyles.inputHeader}>
                        <Image source={require('../../images/Settings/iconmonstr-user16.png')}
                                style={editProfileStyles.inputIcon} />
                        <View style={editProfileStyles.inputHeaderVerticalSpacer} />
                        <Text style={editProfileStyles.inputHeaderText}>
                            First Name
                        </Text>
                    </View>
                    <View style={editProfileStyles.inputVerticalSpacer} />
                    <TextInput
                        ref={input => {this.inputs['FirstName'] = input}}
                        onSubmitEditing={() => {this.focusNextField('LastName')}}
                        blurOnSubmit={false}
                        underlineColorAndroid='transparent'
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="words"
                        autoCorrect={false}
                        style={editProfileStyles.inputText}
                        defaultValue = {this.state.contactDetails.firstName}
                        onChangeText={(newContactFirstName)=> this.setState({newContactFirstName})}
                    />
                </View>

                <View style={editProfileStyles.contentHorizontalSpacer} />

                <View style={editProfileStyles.inputRow}>
                    <View style={editProfileStyles.inputHeader}>
                        <Image source={require('../../images/Settings/iconmonstr-user16.png')}
                                style={editProfileStyles.inputIcon} />
                        <View style={editProfileStyles.inputHeaderVerticalSpacer} />
                        <Text style={editProfileStyles.inputHeaderText}>
                            Last Name
                        </Text>
                    </View>
                    <View style={editProfileStyles.inputVerticalSpacer} />
                    <TextInput
                        ref={input => {this.inputs['LastName'] = input}}
                        onSubmitEditing={() => {this.focusNextField('Email')}}
                        blurOnSubmit={false}
                        underlineColorAndroid='transparent'
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="words"
                        autoCorrect={false}
                        style={editProfileStyles.inputText}
                        defaultValue = {this.state.contactDetails.lastName}
                        onChangeText={(newContactLastName)=> this.setState({newContactLastName})}
                    />
                </View>

                <View style={editProfileStyles.contentHorizontalSpacer} />
        
                <View style={editProfileStyles.inputRow}>
                    <View style={editProfileStyles.inputHeader}>
                        <Image source={require('../../images/Settings/iconmonstr-email-4.png')}
                                style={editProfileStyles.inputIcon} />
                        <View style={editProfileStyles.inputHeaderVerticalSpacer} />
                        <Text style={editProfileStyles.inputHeaderText}>
                            Email
                        </Text>
                    </View>
                    <View style={editProfileStyles.inputVerticalSpacer} />
                    <TextInput
                        ref={input => {this.inputs['Email'] = input}}
                        onSubmitEditing={() => {this.focusNextField('Phone')}}
                        blurOnSubmit={false}
                        underlineColorAndroid='transparent'
                        returnKeyType="next"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={editProfileStyles.inputText}
                        defaultValue = {this.state.contactDetails.email}
                        onChangeText={(newContactEmail)=> this.setState({newContactEmail})}
                    />
                </View>

                <View style={editProfileStyles.contentHorizontalSpacer} />
                
                <View style={editProfileStyles.inputRow}>
                    <View style={editProfileStyles.inputHeader}>
                        <Image source={require('../../images/Settings/iconmonstr-phone-1-3x.png')}
                                style={editProfileStyles.inputIcon} />
                        <View style={editProfileStyles.inputHeaderVerticalSpacer} />
                        <Text style={editProfileStyles.inputHeaderText}>
                            Phone
                        </Text>
                    </View>
                    <View style={editProfileStyles.inputVerticalSpacer} />
                    <TextInput
                        ref={input => {this.inputs['Phone'] = input}}
                        onSubmitEditing={() => {this.focusNextField('Company')}}
                        blurOnSubmit={false}
                        underlineColorAndroid='transparent'
                        returnKeyType="next"
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={editProfileStyles.inputText}
                        defaultValue = {this.state.contactDetails.phone}
                        onChangeText={(newContactPhone)=> this.setState({newContactPhone})}
                    />
                </View>

                <View style={editProfileStyles.contentHorizontalSpacer} />
                
                <View style={editProfileStyles.inputRow}>
                    <View style={editProfileStyles.inputHeader}>
                        <Image source={require('../../images/Settings/iconmonstr-company.png')}
                                style={editProfileStyles.inputIcon} />
                        <View style={editProfileStyles.inputHeaderVerticalSpacer} />
                        <Text style={editProfileStyles.inputHeaderText}>
                            Company
                        </Text>
                    </View>
                    <View style={editProfileStyles.inputVerticalSpacer} />
                    <TextInput
                        ref={input => {this.inputs['Company'] = input}}
                        onSubmitEditing={() => {this.focusNextField('JobTitle')}}
                        blurOnSubmit={false}
                        underlineColorAndroid='transparent'
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="words"
                        autoCorrect={false}
                        style={editProfileStyles.inputText}
                        defaultValue = {this.state.contactDetails.company}
                        onChangeText={(newContactCompany)=> this.setState({newContactCompany})}
                    />
                </View>

                <View style={editProfileStyles.contentHorizontalSpacer} />
                
                <View style={editProfileStyles.inputRow}>
                    <View style={editProfileStyles.inputHeader}>
                        <Image source={require('../../images/Settings/iconmonstr-user16.png')}
                                style={editProfileStyles.inputIcon} />
                        <View style={editProfileStyles.inputHeaderVerticalSpacer} />
                        <Text style={editProfileStyles.inputHeaderText}>
                            Job Title
                        </Text>
                    </View>
                    <View style={editProfileStyles.inputVerticalSpacer} />
                    <TextInput
                        ref={input => {this.inputs['JobTitle'] = input}}
                        onSubmitEditing={() => {this.focusNextField('LinkedIn')}}
                        blurOnSubmit={false}
                        underlineColorAndroid='transparent'
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="words"
                        autoCorrect={false}
                        style={editProfileStyles.inputText}
                        defaultValue = {this.state.contactDetails.jobTitle}
                        onChangeText={(newContactJobTitle)=> this.setState({newContactJobTitle})}
                    />
                </View>

                <View style={editProfileStyles.contentHorizontalSpacer} />
                
                <View style={editProfileStyles.inputRow}>
                    <View style={editProfileStyles.inputHeader}>
                        <Image source={require('../../images/Settings/iconmonstr-linkedin-1-3x.png')}
                                style={editProfileStyles.inputIcon} />
                        <View style={editProfileStyles.inputHeaderVerticalSpacer} />
                        <Text style={editProfileStyles.inputHeaderText}>
                            LinkedIn
                        </Text>
                    </View>
                    <View style={editProfileStyles.inputVerticalSpacer} />
                    <TextInput
                        ref={input => {this.inputs['LinkedIn'] = input}}
                        onSubmitEditing={() => {this.focusNextField('Facebook')}}
                        blurOnSubmit={false}
                        underlineColorAndroid='transparent'
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={editProfileStyles.inputText}
                        defaultValue = {this.state.contactDetails.linkedIn}
                        onChangeText={(newContactLinkedIn)=> this.setState({newContactLinkedIn})}
                    />
                </View>

                <View style={editProfileStyles.contentHorizontalSpacer} />
                
                <View style={editProfileStyles.inputRow}>
                    <View style={editProfileStyles.inputHeader}>
                        <Image source={require('../../images/Settings/iconmonstr-facebook.png')}
                                style={editProfileStyles.inputIcon} />
                        <View style={editProfileStyles.inputHeaderVerticalSpacer} />
                        <Text style={editProfileStyles.inputHeaderText}>
                            Facebook
                        </Text>
                    </View>
                    <View style={editProfileStyles.inputVerticalSpacer} />
                    <TextInput
                        ref={input => {this.inputs['Facebook'] = input}}
                        onSubmitEditing={() => {this.focusNextField('Instagram')}}
                        blurOnSubmit={false}
                        underlineColorAndroid='transparent'
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={editProfileStyles.inputText}
                        defaultValue = {this.state.contactDetails.facebook}
                        onChangeText={(newContactFacebook)=> this.setState({newContactFacebook})}
                    />
                </View>

                <View style={editProfileStyles.contentHorizontalSpacer} />
                
                <View style={editProfileStyles.inputRow}>
                    <View style={editProfileStyles.inputHeader}>
                        <Image source={require('../../images/Settings/iconmonstr-instagram-6-3x.png')}
                                style={editProfileStyles.inputIcon} />
                        <View style={editProfileStyles.inputHeaderVerticalSpacer} />
                        <Text style={editProfileStyles.inputHeaderText}>
                            Instagram
                        </Text>
                    </View>
                    <View style={editProfileStyles.inputVerticalSpacer} />
                    <TextInput
                        ref={input => {this.inputs['Instagram'] = input}}
                        onSubmitEditing={() => {this.focusNextField('Twitter')}}
                        blurOnSubmit={false}
                        underlineColorAndroid='transparent'
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={editProfileStyles.inputText}
                        defaultValue = {this.state.contactDetails.instagram}
                        onChangeText={(newContactInstagram)=> this.setState({newContactInstagram})}
                    />
                </View>

                <View style={editProfileStyles.contentHorizontalSpacer} />
                
                <View style={editProfileStyles.inputRow}>
                    <View style={editProfileStyles.inputHeader}>
                        <Image source={require('../../images/Settings/iconmonstr-twitter-1-3x.png')}
                                style={editProfileStyles.inputIcon} />
                        <View style={editProfileStyles.inputHeaderVerticalSpacer} />
                        <Text style={editProfileStyles.inputHeaderText}>
                            Twitter
                        </Text>
                    </View>
                    <View style={editProfileStyles.inputVerticalSpacer} />
                    <TextInput
                        ref={input => {this.inputs['Twitter'] = input}}
                        onSubmitEditing={() => {this.focusNextField('Website')}}
                        blurOnSubmit={false}
                        underlineColorAndroid='transparent'
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={editProfileStyles.inputText}
                        defaultValue = {this.state.contactDetails.twitter}
                        onChangeText={(newContactTwitter)=> this.setState({newContactTwitter})}
                    />
                </View>

                <View style={editProfileStyles.contentHorizontalSpacer} />
                
                <View style={editProfileStyles.inputRow}>
                    <View style={editProfileStyles.inputHeader}>
                        <Image source={require('../../images/Settings/iconmonstr-globe-5.png')}
                                style={editProfileStyles.inputIcon} />
                        <View style={editProfileStyles.inputHeaderVerticalSpacer} />
                        <Text style={editProfileStyles.inputHeaderText}>
                            Website
                        </Text>
                    </View>
                    <View style={editProfileStyles.inputVerticalSpacer} />
                    <TextInput
                        ref={input => {this.inputs['Website'] = input}}
                        onSubmitEditing={() => {this.focusNextField('OtherInfo')}}
                        blurOnSubmit={false}
                        underlineColorAndroid='transparent'
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={editProfileStyles.inputText}
                        defaultValue = {this.state.contactDetails.website}
                        onChangeText={(newContactWebsite)=> this.setState({newContactWebsite})}
                    />
                </View>

                <View style={editProfileStyles.contentHorizontalSpacer} />
                
                <View style={editProfileStyles.inputRow}>
                    <View style={editProfileStyles.inputHeader}>
                        <Image source={require('../../images/Settings/iconmonstr-info.png')}
                                style={editProfileStyles.inputIcon} />
                        <View style={editProfileStyles.inputHeaderVerticalSpacer} />
                        <Text style={editProfileStyles.inputHeaderText}>
                            Other Info
                        </Text>
                    </View>
                    <View style={editProfileStyles.inputVerticalSpacer} />
                    <TextInput
                        ref={input => {this.inputs['OtherInfo'] = input}}
                        blurOnSubmit={true}
                        underlineColorAndroid='transparent'
                        returnKeyType="done"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={editProfileStyles.inputText}
                        defaultValue = {this.state.contactDetails.otherInfo}
                        onChangeText={(newContactOtherInfo)=> this.setState({newContactOtherInfo})}
                    />
                </View>

                <View style={editProfileStyles.contentHorizontalSpacer} />

                <View style={editProfileStyles.buttonContainer}>
                    <View style={editProfileStyles.buttonSpacer} />
                    <TouchableOpacity style={editProfileStyles.button}
                        onPress={() => this.submitDetails()}>
                        <Text style={editProfileStyles.buttonText}>Update Profile</Text>
                    </TouchableOpacity>
                    <View style={editProfileStyles.buttonSpacer} />
                </View>

                <View style={editProfileStyles.spacerBetweenButtons} />

                <View style={editProfileStyles.buttonContainer}>
                    <View style={editProfileStyles.buttonSpacer} />
                    <TouchableOpacity style={editProfileStyles.button}
                        onPress={
                            ()=> Alert.alert(
                                'Exit Edit Profile',
                                'Are you sure you want to go back? Unsaved changes will be lost.',
                                [
                                    {text: 'Yes', onPress: () => navigation.goBack()},
                                    {text: 'No'}
                                ]
                        )}>
                        <Text style={editProfileStyles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <View style={editProfileStyles.buttonSpacer} />
                </View>

                <View style={editProfileStyles.contentTopSpacer}></View>

            </KeyboardAwareScrollView>
        )
    }
}

const editProfileStyles = StyleSheet.create({
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    scrollView: {
        backgroundColor: 'white'
    },
    scrollViewContentContainer: {
        paddingHorizontal: 25,
        backgroundColor: 'white'
    },
    contentTopSpacer: {
        height: 50
    },
    contentHorizontalSpacer: {
        height: 50
    },
    inputRow: {
        flexDirection:'column',
        justifyContent: 'flex-start'
    },
    inputHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    inputIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    inputHeaderVerticalSpacer: {
        width: 10
    },
    inputHeaderText: {
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24,
        color: 'black'
    },
    inputVerticalSpacer: {
        height: 10
    },
    inputText: {
        borderBottomWidth: 1,
        fontFamily: 'alternate-gothic-no3-d-regular',
        color: '#979797',
        fontSize: 24,
        height: 30
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#EA4B6C',
        paddingVertical: 10,
        alignItems: 'center',
        flex: 0.6
    },
    buttonText: {
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24,
        color: 'white'
    },
    buttonSpacer: {
        flex: 0.2
    },
    spacerBetweenButtons: {
        height: 20
    }
})

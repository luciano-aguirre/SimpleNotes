import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView 
} from 'react-native';
import { Button, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import realm from '../realm';

type Props = {};
export default class ConfigScreen extends Component<Props> {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    
    this.state = {
        currentConfig: realm.objects('UserConfig')[0],
        password: null,
        newPassword: null,
        repeatedPassword: null
    };
    
    this.saveConfig = this.saveConfig.bind(this);
    //this.titleRef = null;
  }

  saveConfig() {
    if (this.state.password === null || this.state.password === '') {
        alert('Ingrese el PIN actual');
    }
    else if (this.state.newPassword === null || this.state.newPassword === '') {
        alert('Ingrese el nuevo PIN');
    }
    else if (this.state.repeatedPassword === null || this.state.repeatedPassword === '') {
        alert('Repita el nuevo PIN');
    }
    else if (this.state.currentConfig.password !== this.state.password) {
        alert('El PIN ingresado no coincide con el actual');
    }
    else if (this.state.newPassword !== this.state.repeatedPassword){
        alert('El nuevo PIN no coincide con la confirmación');
    }
    else {
        realm.write(() => {
            realm.create('UserConfig', {id: this.state.currentConfig.id, password: this.state.newPassword}, true);
          });
        this.props.navigation.navigate('Home');
    }

   /* if (this.state.title === null || this.state.title === '' || this.state.description === null || this.state.description === '') {
      alert('Complete todo');
    } else {
      //let nextID = ((realm.objects('Note').length > 0)?realm.objects('Note').max('id'):0) + 1; // = (int) (realm.where(dbObj.class).maximumInt("id") + 1);
      realm.write(() => {
        realm.create('Note', {id: this.state.id, title: this.state.title, description: this.state.description, privated: this.state.privated, creationDate: this.state.creationDate}, this.state.editionMode);
      });
      this.props.navigation.navigate('Home');*/
    
  //  navigate('Home', { notes: { latitud: this.state.marcadores[0].coordinate.latitude, longitud: this.state.marcadores[0].coordinate.longitude } });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View  style={styles.container}>
        {/* <View style={styles.header}>            
          <Icon
            name='arrow-left'
            color='white'
            size={30}
            onPress={ () => navigate('Home') }//navigate('Note', {}) }
          />
          <Text 
            style={styles.save}
            onPress={ () => this.saveConfig() }>
              Guardar
          </Text>         
        </View> */}
        <Header
          leftComponent={{ icon: 'arrow-back', color: 'white', size: 30, onPress: () => navigate('Home') }}//navigate('Note', {}) }}
          centerComponent={{ text: 'Configuración', style: { color: 'white', fontSize: 20 } }}
          rightComponent={{ icon: 'save', color: 'white', size: 30 }}
        />
        <View style={styles.body}> 
          <FormLabel labelStyle={{color: 'black'}}>PIN</FormLabel>
          <FormInput 
            value={this.state.title}
            onChangeText={(value) => this.setState({password: value}) }
            placeholder={"Ingrese el PIN actual"}
            secureTextEntry={true}
            maxLength={4}
            keyboardType='numeric'
            underlineColorAndroid = {0}/>
          {/* <FormValidationMessage>Error message</FormValidationMessage> */}

          <FormLabel labelStyle={{color: 'black'}}>Nuevo PIN</FormLabel>
          <FormInput 
            value={this.state.description}
            onChangeText={(value) => this.setState({newPassword: value}) }
            placeholder={"Ingrese el nuevo PIN"}
            secureTextEntry={true}
            maxLength={4}
            keyboardType='numeric'
            underlineColorAndroid = {0}/>

        <FormLabel labelStyle={{color: 'black'}}>Confirmar PIN</FormLabel>
          <FormInput 
            value={this.state.description}
            onChangeText={(value) => this.setState({repeatedPassword: value}) }
            placeholder={"Repita el nuevo PIN"}
            secureTextEntry={true}
            maxLength={4}
            keyboardType='numeric'
            underlineColorAndroid = {0}/>

        <View style={{flexDirection: 'row'}}>       
            <Icon
                name='info-circle'
                size={20}
                style={{marginLeft: 5, marginRight: 5}}
            />
            <Text style={{color: 'red', fontWeight: 'bold'}}>
                Un PIN es un número de 4 dígitos
            </Text>
        </View>          
          {/* <FormValidationMessage>Error message</FormValidationMessage> */}
        </View>        
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  header: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    //paddingBottom: -50,
  //  borderBottomColor: 'black',
   // borderBottomWidth: 1,
   // backgroundColor: 'black'
   backgroundColor: '#2196F3'
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
    color: 'white'
  },  
  save: {
    fontSize: 20,
    textAlign: 'right',
    color: 'white',
    fontWeight: 'bold',
  },
  body: {
    flex: 14
   // backgroundColor: 'white'
  },
  textAreaContainer: {
    //borderColor: COLORS.grey20,
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  }
});
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { CheckBox, List, ListItem } from 'react-native-elements';
import { Button, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import realm from '../realm';
import ActionButton from 'react-native-action-button';
import Modal from "react-native-modal";
import ModalAlert from '../components/modal-alert';

export default class NoteScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    const { params } = this.props.navigation.state;
    if (params.note) {
      this.state = {
        editionMode: true,
        delete: false,
        showErrors: false,
        id: params.note.id,
        title: params.note.title,
        description: params.note.description,
        privated: params.note.privated
      }  
    } else {
        this.state = {
          editionMode: false,
          delete: false,
          showErrors: false,
          id: ((realm.objects('Note').length > 0)?realm.objects('Note').max('id'):0) + 1,
          title: '',
          description: '',
          privated: false
      };
    }
    
    this.saveNote = this.saveNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.validateModalRef = React.createRef();
    this.deleteModalRef = React.createRef();
  }

    deleteNote() {
      //this.deleteModalRef.current.hideModal();
      const { params } = this.props.navigation.state;
      realm.write(() => {
        realm.delete(params.note);
      });
      this.props.navigation.navigate('Home');
  }

  saveNote() {
    if (this.state.title === null || this.state.title === '' || this.state.description === null || this.state.description === '') {
      this.validateModalRef.current.showModal();
    } else {
      realm.write(() => {
        realm.create('Note', {id: this.state.id, title: this.state.title, description: this.state.description, privated: this.state.privated, creationDate: new Date()}, this.state.editionMode);
      });
      this.props.navigation.navigate('Home');
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'arrow-back', color: 'white', size: 30, onPress: () => navigate('Home') }}
          centerComponent={{ text: this.state.editionMode?'Edición nota':'Nueva nota', style: { color: 'white', fontSize: 20, fontWeight: 'bold' } }}
          rightComponent={{ icon: 'save', color: 'white', size: 30, onPress: () => this.saveNote() }}
        />
        <View style={styles.body}>
          <FormLabel labelStyle={{color: 'black'}}>Título</FormLabel>
          <FormInput 
            value={this.state.title}
            onChangeText={(value) => this.setState({title: value}) }
            placeholder={"Ingrese el título de la nota"}
            underlineColorAndroid = {0}/>
          {/* <FormValidationMessage>Error message</FormValidationMessage> */}

          <FormLabel labelStyle={{color: 'black'}}>Descripción</FormLabel>
          <FormInput 
            value={this.state.description}
            onChangeText={(value) => this.setState({description: value}) }
            placeholder={"Ingrese la descripción de la nota"}
            multiline
            underlineColorAndroid = {0}/>

          <CheckBox
            title='Privada'
            checked={ this.state.privated }
            checkedColor='black'
            onIconPress={ () => this.setState({privated: !this.state.privated}) }
            containerStyle={{backgroundColor: 'white', borderWidth: 0}}
          />

          {this.state.editionMode && 
            <ActionButton
              buttonColor="rgba(231,76,60,1)"
              onPress={ () => this.deleteModalRef.current.showModal() } 
              degrees={0}
              renderIcon={() => <Icon name='trash' size={30} />}
          />}
        
          <ModalAlert
            ref = { this.deleteModalRef }
            message = '¿Está seguro de que desea eliminar la nota?'
            onAcceptPress = { () => this.deleteNote() }
            onCancelPress = { () => this.deleteModalRef.current.hideModal() }
          />

          <ModalAlert
            ref = { this.validateModalRef }
            message = 'Complete todos los campos'
            onAcceptPress = { () => this.validateModalRef.current.hideModal() }
          />          
        </View>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white', 
  },
  title: {
    fontSize: 30,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
    color: 'white'
  },  
  action: {
    fontSize: 20,
    textAlign: 'right',
    color: 'black',
    fontWeight: 'bold',
    color: 'white'
  },
  body: {
    flex: 14,
   // marginTop: -15
 //  backgroundColor: 'white'
  },
  textAreaContainer: {
    //borderColor: COLORS.grey20,
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
});
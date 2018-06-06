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

type Props = {};
export default class NoteScreen extends Component<Props> {
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
        id: params.note.id,
        title: params.note.title,
        description: params.note.description,
        privated: params.note.privated,
        creationDate: params.note.creationDate
      }  
    } else {
        this.state = {
          editionMode: false,
          delete: false,
          id: ((realm.objects('Note').length > 0)?realm.objects('Note').max('id'):0) + 1,
          title: '',
          description: '',
          privated: false,
          creationDate: new Date()
      };
    }
    
    this.saveNote = this.saveNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    //this.titleRef = null;
  }

  deleteNote() {
    if (this.state.delete) {
      const { params } = this.props.navigation.state;
      realm.write(() => {
        realm.delete(params.note);
      });
      this.props.navigation.navigate('Home');
    }
  }

  saveNote() {
    if (this.state.title === null || this.state.title === '' || this.state.description === null || this.state.description === '') {
      alert('Complete todo');
    } else {
      //let nextID = ((realm.objects('Note').length > 0)?realm.objects('Note').max('id'):0) + 1; // = (int) (realm.where(dbObj.class).maximumInt("id") + 1);
      realm.write(() => {
        realm.create('Note', {id: this.state.id, title: this.state.title, description: this.state.description, privated: this.state.privated, creationDate: this.state.creationDate}, this.state.editionMode);
      });
      this.props.navigation.navigate('Home');
    }

  //  navigate('Home', { notes: { latitud: this.state.marcadores[0].coordinate.latitude, longitud: this.state.marcadores[0].coordinate.longitude } });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {/* <View style={styles.header}>
          <Icon
            name='arrow-left'
            color='white'
            size={30}
            onPress={ () => navigate('Home') }//navigate('Note', {}) }
          />        
          <Text 
            style={styles.action}
            onPress={ () => this.saveNote() }>
              {this.state.editionMode?'Guardar':'Agregar'}
          </Text>         
        </View> */}
        <Header
          leftComponent={{ icon: 'arrow-back', color: 'white', size: 30, onPress: () => navigate('Home') }}//navigate('Note', {}) }}
          centerComponent={{ text: this.state.editionMode?'Edición nota':'Nueva nota', style: { color: 'white', fontSize: 20 } }}
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
            checked={ this.state.privated }//this.state.checked}
            checkedColor='black'
            onIconPress={ () => this.setState({privated: !this.state.privated}) }
            containerStyle={{backgroundColor: 'white', borderWidth: 0}}
          />

          {this.state.editionMode && 
            <ActionButton
              buttonColor="rgba(231,76,60,1)"
              onPress={() => this.setState({delete: true})}
              degrees={0}
              renderIcon={() => <Icon name='trash' size={30} />}
          />}

        <Modal isVisible={this.state.delete}>
          <View style={styles.modalContent}>
            <Text>¿Está seguro de que desea eliminar la nota?</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => this.setState({delete: false})}>
                <View style={styles.modalButton}>
                  <Text>Cancel</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.deleteNote()}>
                <View style={styles.modalButton}>
                  <Text>OK</Text>
                </View>
              </TouchableOpacity>  
            </View>            
          </View>
        </Modal>          
          
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
  header: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    //paddingBottom: -50,
   // borderBottomColor: 'black',
   // borderBottomWidth: 1,
    //backgroundColor: 'black'
    backgroundColor: '#2196F3'  
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
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalButton: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
});
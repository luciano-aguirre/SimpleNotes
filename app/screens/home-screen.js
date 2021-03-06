import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Button, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import realm from '../realm';
import Modal from "react-native-modal";
import moment from 'moment';
import { sha256 } from 'react-native-sha256';
import NoteListView from '../components/note-list-view';
import ModalInput from '../components/modal-input';

//type Props = {};
export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentConfig: (realm.objects('UserConfig').length === 0) ? null : realm.objects('UserConfig')[0],
      notes: realm.objects('Note').sorted('creationDate', true),
      firstTime: (realm.objects('UserConfig').length === 0),
      actualNote: null,
      visibleModal: (realm.objects('UserConfig').length === 0),
      password: null,
      errorMessage: false,
    }

    realm.addListener('change', () => {
      this.setState({notes: realm.objects('Note').sorted('creationDate', true) })
    });
    
    this.viewNote = this.viewNote.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.modalRef = React.createRef();
  }

  async validatePassword() {
    if (this.state.password === null || this.state.password.length !== 4) {
      //this.setState({errorMessage: true});
      this.modalRef.current.showError();
    } else if (this.state.firstTime) {
        let newPassword = await sha256(this.state.password);
        realm.write(() => {
            realm.create('UserConfig', {id: 1, password: newPassword});            
          });
        this.setState({currentConfig: realm.objects('UserConfig')[0].value, firstTime: false, visibleModal: false, errorMessage: false, password: null})
        this.modalRef.current.hideModal();
    } else if (await sha256(this.state.password) === this.state.currentConfig.password) {
        this.props.navigation.navigate('Note', {note: this.state.actualNote}); 
        //this.modalRef.current.hide(); 
        //this.setState({visibleModal: false, actualNote: null, errorMessage: false, password: null}); 
        
    } else {
        this.modalRef.current.showError();
        //this.setState({errorMessage: true, password: null});
    }    
  }

  viewNote(note) {
    if (note.privated) {
      //this.setState({visibleModal: true, actualNote: note});
      this.setState({actualNote: note});
      this.modalRef.current.showModal();
    }
    else {
      this.props.navigation.navigate('Note', {note: note})      
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    return (
      <View style={styles.container}> 
        <Header
          leftComponent={{ icon: 'settings', color: 'white', size: 30, onPress: () => navigate('Config') }}//navigate('Note', {}) }}
          centerComponent={{ text: this.state.notes.length + ' notas', style: { color: 'white', fontSize: 20, fontWeight: 'bold' } }}
          rightComponent={{ icon: 'create', color: 'white', size: 30, onPress: () => navigate('Note', {}) }}
        />
        <View style={styles.body}>
          <List
            containerStyle={{marginTop: 0}}>            
            {
              this.state.notes.map((note, i) => (
                <NoteListView
                  key = { i }
                  title = { note.title }
                  subtitle = { moment(note.creationDate).format("D/M/YY") }
                  privated = { note.privated }
                  onPress={ () => this.viewNote(note) } 
              />))}
          </List>
          
          <ModalInput
            ref = { this.modalRef }
            message = { (this.state.firstTime) ? ('Ingrese el PIN (número de 4 dígitos) para la aplicación') : ('Ingrese el PIN') }
            errorMessage = 'El PIN ingresado es incorrecto'
            secureTextEntry = { true }
            onAcceptPress = { () => this.validatePassword().done() }   
            onCancelPress = { (!this.state.firstTime) ? () => this.modalRef.current.hideModal() : null }     
          />

          {/* <Modal isVisible={this.state.visibleModal}>
            <View style={styles.modalContent}>
              <Text style={{color: 'black', fontSize: 20, textAlign: 'center'}}>{this.state.firstTime ? 'Ingrese el PIN (número de 4 dígitos) para la aplicación' : 'Ingrese el PIN' }</Text>
              { this.state.errorMessage && 
                <Text style={{color: 'red'}}>El PIN ingresado es incorrecto</Text>}
              <TextInput 
                secureTextEntry={true}
                onChangeText={(text) => this.setState({password: text})}
                maxLength={4}
                keyboardType='numeric'
                style={{width: 40, fontSize: 20, textAlign: 'center'}}
              />
              <View style={{flexDirection: 'row'}}>
                {!this.state.firstTime &&
                <TouchableOpacity onPress={() => this.setState({visibleModal: false, errorMessage: false, actualNote: null})}>
                  <View style={styles.modalButton}>
                    <Text style={{color:'white'}}>Cancelar</Text>
                  </View>
                </TouchableOpacity>}

                <TouchableOpacity onPress={() => this.validatePassword().done()}>
                  <View style={styles.modalButton}>
                    <Text style={{color:'white'}}>Aceptar</Text>
                  </View>
                </TouchableOpacity>  
              </View>            
            </View>
        </Modal> */}
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
  body: {
    flex: 14,
    //marginTop: -20,
   // backgroundColor: 'white'
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black'//"rgba(0, 0, 0, 0.1)"
  },
  modalButton: {
    backgroundColor: '#476DC5',
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
});

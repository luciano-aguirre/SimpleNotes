import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { CheckBox, List, ListItem } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import realm from '../realm';

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
        id: params.note.id,
        title: params.note.title,
        description: params.note.description,
        privated: params.note.privated,
        creationDate: params.note.creationDate
      }  
    } else {
        this.state = {
          editionMode: false,
          id: ((realm.objects('Note').length > 0)?realm.objects('Note').max('id'):0) + 1,
          title: '',
          description: '',
          privated: false,
          creationDate: new Date()
      };
    }
    
    this.saveNote = this.saveNote.bind(this);
    //this.titleRef = null;
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
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {this.state.editionMode?'Edit note':'New note'}
          </Text>  
          <Text 
            style={styles.add}
            onPress={ () => this.saveNote() }>
              {this.state.editionMode?'Save':'Add'}
          </Text>         
        </View>
        <View style={styles.body}>
          <FormLabel>Title</FormLabel>
          <FormInput 
            value={this.state.title}
            onChangeText={(value) => this.setState({title: value}) }
            placeholder={"Please enter the title"}/>
          {/* <FormValidationMessage>Error message</FormValidationMessage> */}

          <FormLabel>Description</FormLabel>
          <FormInput 
            value={this.state.description}
            onChangeText={(value) => this.setState({description: value}) }
            placeholder={"Please enter the description"}
            multiline
            underlineColorAndroid = {0}/>

          <CheckBox
            title='Private'
            checked={ this.state.privated }//this.state.checked}
            checkedColor='black'
            onIconPress={ () => this.setState({privated: !this.state.privated}) }
            containerStyle={{backgroundColor: '#F5FCFF', borderWidth: 0}}
          />
          {/* <FormValidationMessage>Error message</FormValidationMessage> */}
         
        {/*     <View style={styles.textAreaContainer} >
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder={"Type something"}
                placeholderTextColor={"grey"}
                numberOfLines={10}
                multiline={true}
              />
            </View> */}
        </View>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  header: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
  },  
  add: {
    fontSize: 20,
    textAlign: 'right',
  },
  body: {
    flex: 14
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
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import realm from '../realm';

type Props = {};
export default class HomeScreen extends Component<Props> {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      notes: realm.objects('Note').sorted('creationDate')
    }

    realm.addListener('change', () => {
      this.setState({notes: realm.objects('Note').sorted('creationDate') })
    });
    
    /*if (this.notes.length < 1) {
        realm.write(() => {
          realm.create('Note', {title: 'Title 1', description: 'Description 1', privated: false, creationDate: new Date()});
        });
    }*/
//    this.state = { notes: null };
    this.viewNote = this.viewNote.bind(this);
  }

  viewNote(note) {
    if (note.privated) {
      alert('Nota privada');
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
        <View style={styles.header}>
          <Text style={styles.title}>
              Notas
          </Text>  
          <Icon
            name='plus'
            size={30}
            onPress={ () => navigate('Note', {}) }
          />
        </View>
        <View style={styles.body}>
          <List>
          {
              this.state.notes.map((note, i) => (
                (note.privated)? (<ListItem
                  key={i}
                  title={note.title}     
                  leftIcon={{name: 'lock', size: 25}}
                  onPress={() => this.viewNote(note)}
                />): (<ListItem
                        key={i}
                        title={note.title}       
                        onPress={() => this.viewNote(note)}
                        containerStyle={styles.note}
                    />)                
              ))                  
          }
          </List>
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
  addBtn: {
    backgroundColor: 'transparent'
  },
  body: {
    flex: 14
  },
  note: {
    paddingLeft: 25
  }
});

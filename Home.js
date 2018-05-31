/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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

const list = [
    {
      title: 'Tarjeta Visa',
      icon: 'credit-card'
    },
    {
      title: 'Contraseña Home Banking Galicia',
      icon: 'lock'
    },
    {
        title: 'Dentista',
        icon: 'av-timer'
      },
]

type Props = {};
export default class Home extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>
                Notas
            </Text>  
    <Icon
      name='plus'
      size={30}
      onPress={() => alert('Agregar nueva tarea')}
    />
        </View>
        <View style={styles.body}>
            <List>
                {
                    list.map((item, i) => (
                    <ListItem
                        key={i}
                        title={item.title}
                        leftIcon={{name: item.icon}}
                        onPress={() => alert(item.title)}
                    />
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
  }
});

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Button, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import realm from '../realm';
import Modal from "react-native-modal";
import { sha256 } from 'react-native-sha256';
import PropTypes from 'prop-types';

export default class ModalInput extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      error: false,
      input: null
    }
  }
  
  static propTypes = {
    message: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    onAcceptPress: PropTypes.func.isRequired,
    onCancelPress: PropTypes.func
  }

  static defaultProps = {
      secureTextEntry: false
  }

  showModal() {
    this.setState({ visible: true });
  }

  showError() {
    this.setState({ error: true });
  }

  hideModal() {
    this.setState({ visible: false, error: false });
  }

  hideError() {
    this.setState({ error: false });
  }

  render() {
    return (
      <Modal isVisible={this.state.visible}>
        <View style={styles.modalContent}>
          <Text style={{color: 'black', fontSize: 20, textAlign: 'center'}}>{ this.props.message }</Text>
          { this.state.error && 
                <Text style={{color: 'red'}}> { this.props.errorMessage } </Text>}
            <TextInput 
              secureTextEntry={ this.props.secureTextEntry }
              onChangeText={(text) => this.setState({input: text})}
              maxLength={4}
              keyboardType='numeric'
              style={{width: 40, fontSize: 20, textAlign: 'center'}}
            /> 
          <View style={{flexDirection: 'row'}}>
            {
              this.props.onCancelPress && 
              <TouchableOpacity onPress={ this.props.onCancelPress }>
                <View style={styles.modalButton}>
                  <Text style={{color: 'white'}}>Cancelar</Text>
                </View>
              </TouchableOpacity>
            }         
            <TouchableOpacity onPress={ this.props.onAcceptPress }>
              <View style={styles.modalButton}>
                <Text style={{color: 'white'}}>Aceptar</Text>
              </View>
            </TouchableOpacity>  
          </View>            
        </View>
      </Modal>    
    );
  }
}

const styles = StyleSheet.create({
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
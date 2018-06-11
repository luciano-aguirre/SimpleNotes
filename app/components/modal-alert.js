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

export default class ModalAlert extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }
  
  static propTypes = {
  //  reference: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    onAcceptPress: PropTypes.func.isRequired,
    onCancelPress: PropTypes.func
  }

  showModal() {
    this.setState({ visible: true });
  }

  hideModal() {
    this.setState({ visible: false });
  }

  render() {
    // //ref = { this.props.reference } >
    return (
      <Modal isVisible={this.state.visible}>
        <View style={styles.modalContent}>
          <Text style={{color: 'black', fontSize: 20, textAlign: 'center'}}>{ this.props.message }</Text>
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
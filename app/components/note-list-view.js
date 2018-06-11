import React, { Component } from 'react';
import { StyleSheet } from 'react-native'; 
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

export default class NoteListView extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    privated: PropTypes.bool,
    onPress: PropTypes.func.isRequired
  }

  static defaultProps = {
    privated: false
  }

  render() {
    return (
      <ListItem
        title = { this.props.title }
        subtitle = { this.props.subtitle }     
        leftIcon = { this.props.privated ? {name: 'lock', size: 25} : null }
        onPress = { this.props.onPress }
        titleStyle = { styles.title } 
        containerStyle = { this.props.privated ? styles.containerStyle : [styles.containerStyle,styles.privated] }
      />
    );
  }    
}

const styles = StyleSheet.create({
  title: {
    color: 'black', 
    fontWeight: 'bold'
  },
  containerStyle: {
    backgroundColor: 'white'
  },
  privated: {
    paddingLeft: 25
  }
});
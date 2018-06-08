import React, { Component } from 'react'; 
import { View, Text } from 'react-native'; 
import { List, ListItem, Platform, StyleSheet } from 'react-native-elements';
import PropTypes from 'prop-types';

export default class NoteListView extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
        privated: PropTypes.bool,
        onPress: PropTypes.func.isRequired
    }

    static defaultProps = {
        privated: false
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListItem
                title={this.props.title}
                subtitle={this.props.subtitle}     
                leftIcon={this.props.privated && {name: 'lock', size: 25}}
                onPress={this.props.onPress}
                titleStyle={styles.title} 
                containerStyle={this.props.privated?styles.containerStyle:[styles.containerStyle,styles.privated]}
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
import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {windowHeight} from '../utils/Dimensions';

const FormButton = ({buttonTitle, bgColor, ...rest}) => {
  let background;
  let colour;

  if (bgColor === 'light') {
    background = '#FFBB0E';
    colour = '#000';
  } else if (bgColor === 'dark') {
    background = '#000';
    colour = '#FFF';
  }
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, {backgroundColor: background}]}
      {...rest}>
      <Text style={[styles.buttonText, {color: colour}]}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

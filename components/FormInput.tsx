import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {windowHeight} from '../utils/Dimensions';

const FormInput = ({labelValue, placeholderText, ...rest}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        {...rest}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderBottomColor: '#393939',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  input: {
    flex: 1,
    fontSize: 22,
    color: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

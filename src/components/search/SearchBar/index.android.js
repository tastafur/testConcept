import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TextInput, View, Image} from 'react-native';
import Touchable from 'react-native-platform-touchable';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    marginBottom: 2,
    paddingLeft: 5,
    marginRight: 5,
  },
});

function SearchBar({
  onChangeQuery,
  onSubmit,
  textColor,
  placeholderTextColor,
  selectionColor,
  underlineColorAndroid,
  tintColor,
}) {
  const _textInput = useRef(null);
  const [text, setText] = useState('');

  const _handleClear = () => {
    setText('');
  };
  const _handleChangeText = textUpdate => {
    setText(textUpdate);
    onChangeQuery && onChangeQuery(textUpdate);
  };

  const _handleSubmit = () => {
    onSubmit && onSubmit(text);
    _textInput.current.blur();
  };

  useEffect(() => {
    requestAnimationFrame(() => _textInput.current.focus());
  });

  let searchInputStyle = {};
  if (textColor) {
    searchInputStyle.color = textColor;
  }

  return (
    <View style={styles.container}>
      <TextInput
        ref={_textInput}
        placeholder="Search"
        placeholderTextColor={placeholderTextColor || '#ccc'}
        value={text}
        autoCapitalize="none"
        autoCorrect={false}
        selectionColor={selectionColor}
        underlineColorAndroid={underlineColorAndroid || '#ccc'}
        onSubmitEditing={_handleSubmit}
        onChangeText={_handleChangeText}
        style={[styles.searchInput, searchInputStyle]}
      />
      <View style={{width: 50, alignItems: 'center', justifyContent: 'center'}}>
        {text ? (
          <Touchable
            onPress={_handleClear}
            hitSlop={{top: 15, left: 10, right: 15, bottom: 15}}
            style={{padding: 5}}
            background={Touchable.Ripple(tintColor, true)}>
            <Image
              style={{width: 15, height: 15}}
              source={require('../../../assets/close.png')}
            />
          </Touchable>
        ) : null}
      </View>
    </View>
  );
}

SearchBar.propTypes = {
  textColor: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  selectionColor: PropTypes.string,
  underlineColorAndroid: PropTypes.string,
  tintColor: PropTypes.string,
  onChangeQuery: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default SearchBar;

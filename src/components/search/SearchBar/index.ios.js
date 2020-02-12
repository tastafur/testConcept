import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Layout = {
  window: {
    width: Dimensions.get('window').width,
  },
};
const SearchContainerHorizontalMargin = 10;
const SearchContainerWidth =
  Layout.window.width - SearchContainerHorizontalMargin * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingRight: 17,
    paddingLeft: 2,
  },
  searchContainer: {
    height: 30,
    width: SearchContainerWidth,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    marginHorizontal: SearchContainerHorizontalMargin,
    marginTop: 10,
    paddingLeft: 27,
  },
  searchIconContainer: {
    position: 'absolute',
    left: 7,
    top: 6,
    bottom: 0,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingTop: 1,
  },
});

const SearchIcon = () => (
  <View style={styles.searchIconContainer}>
    <Image
      source={require('../../../assets/search.png')}
      style={{width: 18, height: 18}}
    />
  </View>
);

function SearchBar({
  onChangeQuery,
  onSubmit,
  onCancelPress,
  textColor,
  placeholderTextColor,
  cancelButtonText,
  tintColor,
}) {
  const navigation = useNavigation();
  const _textInput = useRef(null);
  const [text, setText] = useState('');
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [inputWidth, setInputWidth] = useState(SearchContainerWidth);

  const _handleChangeText = textUpdate => {
    setText(textUpdate);
    onChangeQuery && onChangeQuery(textUpdate);
  };

  const _handleSubmit = () => {
    onSubmit && onSubmit(text);
    _textInput.current.blur();
  };

  const _handlePressCancelButton = () => {
    if (onCancelPress) {
      onCancelPress(navigation.goBack);
    } else {
      navigation.goBack();
    }
  };

  const _handleLayoutCancelButton = e => {
    if (showCancelButton) {
      return;
    }

    const cancelButtonWidth = e.nativeEvent.layout.width;

    requestAnimationFrame(() => {
      LayoutAnimation.configureNext({
        duration: 200,
        create: {
          type: LayoutAnimation.Types.linear,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.spring,
          springDamping: 0.9,
          initialVelocity: 10,
        },
      });

      setShowCancelButton(true);
      setInputWidth(SearchContainerWidth - cancelButtonWidth);
    });
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
      <View style={[styles.searchContainer, {width: inputWidth}]}>
        <TextInput
          ref={_textInput}
          clearButtonMode="while-editing"
          onChangeText={_handleChangeText}
          value={text}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          placeholder="Search"
          placeholderTextColor={placeholderTextColor || '#ccc'}
          onSubmitEditing={_handleSubmit}
          style={[styles.searchInput, searchInputStyle]}
        />

        <SearchIcon />
      </View>

      <View
        key={
          showCancelButton
            ? 'visible-cancel-button'
            : 'layout-only-cancel-button'
        }
        style={[styles.buttonContainer, {opacity: showCancelButton ? 1 : 0}]}>
        <TouchableOpacity
          style={styles.button}
          hitSlop={{top: 15, bottom: 15, left: 15, right: 20}}
          onLayout={_handleLayoutCancelButton}
          onPress={_handlePressCancelButton}>
          <Text
            style={{
              fontSize: 17,
              color: tintColor || '#007AFF',
            }}>
            {cancelButtonText || 'Cancel'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

SearchBar.propTypes = {
  textColor: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  cancelButtonText: PropTypes.string,
  tintColor: PropTypes.string,
  onChangeQuery: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancelPress: PropTypes.func,
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};

export default SearchBar;

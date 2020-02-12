import React from 'react';
import {Animated, Platform, StatusBar, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/stack';
import {isIphoneX} from 'react-native-iphone-x-helper';
import PropTypes from 'prop-types';

// @todo: make this work properly when in landscape
const hasNotch = isIphoneX();

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 50 : 56;
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;

// @todo: this is static and we don't know if it's visible or not on iOS.
// need to use a more reliable and cross-platform API when one exists, like
// LayoutContext.
const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? (hasNotch ? 40 : 25) : StatusBar.currentHeight;

let platformContainerStyles;
if (Platform.OS === 'ios') {
  platformContainerStyles = {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#A7A7AA',
  };
} else {
  platformContainerStyles = {
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth,
    },
    elevation: 4,
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: STATUSBAR_HEIGHT,
    height: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
    ...platformContainerStyles,
  },
  appBar: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    bottom: 0,
    left: TITLE_OFFSET,
    right: TITLE_OFFSET,
    top: 0,
    position: 'absolute',
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
  },
  left: {
    left: 0,
    bottom: 0,
    top: 0,
    position: 'absolute',
  },
  right: {
    right: 0,
    bottom: 0,
    top: 0,
    position: 'absolute',
  },
});

function SearchHeader({children, backButton, tintColor, backButtonTitle, backButtonTruncatedTitle, backButtonTitleStyle, backgroundColor}) {
  const navigation = useNavigation();

  const _navigateBack = () => {
    navigation.goBack(null);
  };

 const _maybeRenderBackButton = () => {
    if (!backButton) {
      return;
    }

    return (
      <HeaderBackButton
        onPress={_navigateBack}
        pressColorAndroid={tintColor || '#fff'}
        tintColor={tintColor}
        title={backButtonTitle || null}
        truncatedTitle={backButtonTruncatedTitle || null}
        titleStyle={backButtonTitleStyle || null}
      />
    );
  };

  let headerStyle = {};
  if (backgroundColor) {
    headerStyle.backgroundColor = backgroundColor;
  }

  return (
    <Animated.View style={[styles.container, headerStyle]}>
      <View style={styles.appBar}>
        <View style={[StyleSheet.absoluteFill, styles.header]}>
          {_maybeRenderBackButton()}
          {children}
        </View>
      </View>
    </Animated.View>
  );
}

SearchHeader.propTypes = {
  backButton: PropTypes.bool,
  backButtonTitle: PropTypes.string,
  cancelButtonText: PropTypes.string,
  tintColor: PropTypes.string,
  backButtonTruncatedTitle: PropTypes.string,
  backButtonTitleStyle: PropTypes.object,
  backgroundColor: PropTypes.string,
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  children: PropTypes.object,
};

export default SearchHeader;

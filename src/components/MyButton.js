import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';

const MyButton = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
  ...props 
}) => {
  const getButtonStyle = () => {
    let buttonStyle = [styles.button];
    
    // Variant styles
    switch (variant) {
      case 'primary':
        buttonStyle.push(styles.primaryButton);
        break;
      case 'secondary':
        buttonStyle.push(styles.secondaryButton);
        break;
      case 'outline':
        buttonStyle.push(styles.outlineButton);
        break;
      default:
        buttonStyle.push(styles.primaryButton);
    }

    // Size styles
    switch (size) {
      case 'small':
        buttonStyle.push(styles.smallButton);
        break;
      case 'large':
        buttonStyle.push(styles.largeButton);
        break;
      default:
        buttonStyle.push(styles.mediumButton);
    }

    // State styles
    if (disabled || loading) {
      buttonStyle.push(styles.disabledButton);
    }

    return buttonStyle;
  };

  const getTextStyle = () => {
    let textStyleArray = [styles.buttonText];
    
    switch (variant) {
      case 'primary':
        textStyleArray.push(styles.primaryText);
        break;
      case 'secondary':
        textStyleArray.push(styles.secondaryText);
        break;
      case 'outline':
        textStyleArray.push(styles.outlineText);
        break;
    }

    switch (size) {
      case 'small':
        textStyleArray.push(styles.smallText);
        break;
      case 'large':
        textStyleArray.push(styles.largeText);
        break;
    }

    return textStyleArray;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      <View style={styles.buttonContent}>
        {loading && (
          <ActivityIndicator 
            size="small" 
            color={variant === 'outline' ? '#007AFF' : '#fff'} 
            style={styles.loader}
          />
        )}
        <Text style={[...getTextStyle(), textStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  
  // Variant styles
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  
  // Size styles
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 48,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 56,
  },
  
  // Text variant styles
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#fff',
  },
  outlineText: {
    color: '#007AFF',
  },
  
  // Text size styles
  smallText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 18,
  },
  
  // State styles
  disabledButton: {
    opacity: 0.6,
  },
  
  loader: {
    marginRight: 8,
  },
});

export default MyButton; 
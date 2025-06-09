import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

const LanguageToggle = ({ style }) => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const currentLanguage = i18n.language;
    const newLanguage = currentLanguage === 'tr' ? 'en' : 'tr';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={toggleLanguage}>
      <View style={styles.languageButton}>
        <Text style={styles.languageText}>
          {i18n.language === 'tr' ? '🇹🇷 TR' : '🇺🇸 EN'}
        </Text>
        <Text style={styles.arrowText}>🌐</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  arrowText: {
    fontSize: 12,
    marginLeft: 4,
    color: '#666',
  },
});

export default LanguageToggle; 
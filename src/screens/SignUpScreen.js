import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { MyInput, MyButton, LanguageToggle } from '../components';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';

const SignUpScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // En az 8 karakter, bir büyük harf, bir küçük harf ve bir rakam
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Name validation
    if (!name.trim()) {
      setNameError(t('validation.nameRequired'));
      isValid = false;
    } else if (name.trim().length < 2) {
      setNameError(t('validation.nameMin'));
      isValid = false;
    }

    // Email validation
    if (!email.trim()) {
      setEmailError(t('validation.emailRequired'));
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError(t('validation.validEmail'));
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError(t('validation.passwordRequired'));
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError(t('validation.passwordStrong'));
      isValid = false;
    }

    // Confirm password validation
    if (!confirmPassword.trim()) {
      setConfirmPasswordError(t('validation.confirmPasswordRequired'));
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(t('validation.passwordsMatch'));
      isValid = false;
    }

    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    dispatch(loginStart());

    try {
      // Simulated API call
      setTimeout(() => {
        // Simulate successful registration
        dispatch(loginSuccess({
          id: Math.random(),
          email: email,
          name: name,
        }));
        Alert.alert(t('messages.success'), t('messages.accountCreated'));
      }, 2000);
    } catch (error) {
      dispatch(loginFailure(t('messages.registerError')));
      Alert.alert(t('messages.error'), t('messages.registerError'));
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LanguageToggle style={styles.languageToggle} />

        <View style={styles.header}>
          <Text style={styles.title}>{t('auth.signUpTitle')}</Text>
          <Text style={styles.subtitle}>{t('auth.signUpSubtitle')}</Text>
        </View>

        <View style={styles.form}>
          <MyInput
            label={t('auth.fullName')}
            placeholder={t('auth.fullNamePlaceholder')}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            error={nameError}
            required
          />

          <MyInput
            label={t('auth.email')}
            placeholder={t('auth.emailPlaceholder')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
            required
          />

          <MyInput
            label={t('auth.password')}
            placeholder={t('auth.strongPasswordPlaceholder')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={passwordError}
            required
          />

          <MyInput
            label={t('auth.confirmPassword')}
            placeholder={t('auth.confirmPasswordPlaceholder')}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={confirmPasswordError}
            required
          />

          <View style={styles.passwordHint}>
            <Text style={styles.passwordHintText}>
              {t('auth.passwordHint')}
            </Text>
          </View>

          <MyButton
            title={t('auth.createAccount')}
            onPress={handleSignUp}
            loading={isLoading}
            style={styles.signUpButton}
            size="large"
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{t('auth.or')}</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Google SignUp')}>
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Facebook SignUp')}>
              <Text style={styles.facebookIcon}>f</Text>
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>

          <MyButton
            title={t('auth.signIn')}
            onPress={() => navigation.navigate('SignIn')}
            variant="outline"
            style={styles.signInButton}
          />
        </View>

        <Text style={styles.termsText}>
          {t('auth.termsText', {
            terms: t('auth.termsOfService'),
            privacy: t('auth.privacyPolicy')
          })}
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  languageToggle: {
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  passwordHint: {
    marginBottom: 16,
  },
  passwordHintText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    fontStyle: 'italic',
  },
  signUpButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#666',
    fontSize: 14,
  },
  termsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 24,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4285F4',
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#4285F4',
  },
  facebookIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#1877F2',
    borderRadius: 12,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 8,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  signInButton: {
    marginTop: 16,
  },
});

export default SignUpScreen; 
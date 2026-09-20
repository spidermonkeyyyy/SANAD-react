import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { spacing, typography, shapes } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';
import { useAuthStore } from '../features/authentication/hooks/use-auth-store';
import { isNurseSideRole } from '../utils/navigation/redirect';

// Screens
import SplashScreen from '../features/authentication/screens/SplashScreen';
import AuthGateScreen from '../features/authentication/screens/AuthGateScreen';
import LoginScreen from '../features/authentication/screens/LoginScreen';
import RegisterScreen from '../features/authentication/screens/RegisterScreen';
import ForgotPasswordScreen from '../features/authentication/screens/ForgotPasswordScreen';
import PatientHomeScreen from '../features/patient/screens/PatientHomeScreen';
import MonitoringIntroScreen from '../features/monitoring/screens/MonitoringIntroScreen';
import MonitoringQuestionScreen from '../features/monitoring/screens/MonitoringQuestionScreen';
import MonitoringReviewScreen from '../features/monitoring/screens/MonitoringReviewScreen';
import MonitoringResultScreen from '../features/monitoring/screens/MonitoringResultScreen';
import MonitoringHistoryScreen from '../features/monitoring/screens/MonitoringHistoryScreen';
import PatientMessagesScreen from '../features/communication/screens/PatientMessagesScreen';
import PatientProfileScreen from '../features/patient/screens/PatientProfileScreen';
import PatientTreatmentScreen from '../features/patient/screens/PatientTreatmentScreen';
import NurseDashboardScreen from '../features/nurse/screens/NurseDashboardScreen';
import NursePatientsScreen from '../features/nurse/screens/NursePatientsScreen';
import NurseAlertsScreen from '../features/nurse/screens/NurseAlertsScreen';
import NurseMessagesScreen from '../features/communication/screens/NurseMessagesScreen';
import NurseProfileScreen from '../features/nurse/screens/NurseProfileScreen';
import NursePatientProfileScreen from '../features/nurse/patients/screens/NursePatientProfileScreen';
import { RulesScreen } from '../features/nurse/rules/screens/RulesScreen';
import RuleDetailScreen from '../features/nurse/rules/screens/RuleDetailScreen';
import RuleBuilderScreen from '../features/nurse/rules/screens/RuleBuilderScreen';
import DesignSystemScreen from '../features/design_preview/screens/DesignSystemScreen';

import Icon from 'react-native-vector-icons/Feather';

import { RootStackParamList, PatientTabParamList, NurseTabParamList } from './routes';

const Stack = createNativeStackNavigator<RootStackParamList>();
const PatientTabs = createBottomTabNavigator<PatientTabParamList>();
const NurseTabs = createBottomTabNavigator<NurseTabParamList>();
const NursePatientsStack = createNativeStackNavigator<{ patients: undefined; patientDetail: { patientId: string } }>();

function PatientTabsNavigator() {
  const { colors } = useTheme();

  return (
    <PatientTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontFamily: typography.fontFamily.openSans,
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <PatientTabs.Screen
        name="patientHome"
        component={PatientHomeScreen}
        options={{
          title: 'Accueil',
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
        }}
      />
      <PatientTabs.Screen
        name="monitor"
        component={MonitoringIntroScreen}
        options={{
          title: 'Suivi',
          tabBarLabel: 'Suivi',
          tabBarIcon: ({ color, size }) => <Icon name="activity" color={color} size={size} />,
        }}
      />
      <PatientTabs.Screen
        name="messages"
        component={PatientMessagesScreen}
        options={{
          title: 'Messages',
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => <Icon name="message-circle" color={color} size={size} />,
        }}
      />
      <PatientTabs.Screen
        name="treatment"
        component={PatientTreatmentScreen}
        options={{
          title: 'Traitement',
          tabBarLabel: 'Traitement',
          tabBarIcon: ({ color, size }) => <Icon name="package" color={color} size={size} />,
        }}
      />
      <PatientTabs.Screen
        name="profile"
        component={PatientProfileScreen}
        options={{
          title: 'Profil',
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => <Icon name="user" color={color} size={size} />,
        }}
      />
    </PatientTabs.Navigator>
  );
}

function NurseTabsNavigator() {
  const { colors } = useTheme();

  return (
    <NurseTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontFamily: typography.fontFamily.openSans,
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <NurseTabs.Screen
        name="nurseDashboard"
        component={NurseDashboardScreen}
        options={{
          title: 'Accueil',
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
        }}
      />
      <NurseTabs.Screen
        name="patients"
        component={NursePatientsStackNavigator}
        options={{
          title: 'Patients',
          tabBarLabel: 'Patients',
          tabBarIcon: ({ color, size }) => <Icon name="users" color={color} size={size} />,
        }}
      />
      <NurseTabs.Screen
        name="alerts"
        component={NurseAlertsScreen}
        options={{
          title: 'Alertes',
          tabBarLabel: 'Alertes',
          tabBarIcon: ({ color, size }) => <Icon name="bell" color={color} size={size} />,
        }}
      />
      <NurseTabs.Screen
        name="messages"
        component={NurseMessagesScreen}
        options={{
          title: 'Messages',
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => <Icon name="message-circle" color={color} size={size} />,
        }}
      />
      <NurseTabs.Screen
        name="profile"
        component={NurseProfileScreen}
        options={{
          title: 'Profil',
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => <Icon name="user" color={color} size={size} />,
        }}
      />
    </NurseTabs.Navigator>
  );
}

function NursePatientsStackNavigator() {
  return (
    <NursePatientsStack.Navigator screenOptions={{ headerShown: false }}>
      <NursePatientsStack.Screen name="patients" component={NursePatientsScreen} />
      <NursePatientsStack.Screen name="patientDetail" component={NursePatientProfileScreen} />
    </NursePatientsStack.Navigator>
  );
}

function SessionExpiryModal({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  const { colors } = useTheme();

  if (!visible) return null;
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={modalStyles.overlay}>
        <View style={[modalStyles.card, { backgroundColor: colors.surface }]}>
          <Text style={[modalStyles.title, { color: colors.foreground }]}>Session Expired</Text>
          <Text style={[modalStyles.body, { color: colors.mutedForeground }]}>
            For your security, your session has expired. Please sign in again to continue.
          </Text>
          <TouchableOpacity style={[modalStyles.button, { backgroundColor: colors.primary }]} onPress={onDismiss}>
            <Text style={[modalStyles.buttonText, { color: colors.primaryForeground }]}>Sign In Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: '#000000AA', alignItems: 'center', justifyContent: 'center', padding: spacing[6] },
  card: { borderRadius: shapes.lg, padding: spacing[6], width: '100%', maxWidth: 360, alignItems: 'center', gap: spacing[4] },
  title: { fontFamily: typography.fontFamily.urbanist, fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, textAlign: 'center' },
  body: { fontFamily: typography.fontFamily.openSans, fontSize: typography.fontSize.md, textAlign: 'center' },
  button: { padding: spacing[4], borderRadius: shapes.sm, alignItems: 'center', width: '100%' },
  buttonText: { fontWeight: typography.fontWeight.semibold, fontFamily: typography.fontFamily.openSans },
});

export default function AppNavigator() {
  const status = useAuthStore((s) => s.status);
  const user = useAuthStore((s) => s.user);
  const errorMessage = useAuthStore((s) => s.errorMessage);
  const role = user?.role ?? null;
  const nurseSide = isNurseSideRole(role);
  const [showSessionExpiry, setShowSessionExpiry] = useState(false);
  const { colors, isDark } = useTheme();

  const navTheme = {
    dark: isDark,
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.foreground,
      border: colors.border,
      notification: colors.destructive,
    },
  };

  useEffect(() => {
    if (status === 'error' && errorMessage) {
      const msg = errorMessage.toLowerCase();
      if (msg.includes('expired') || msg.includes('jwt') || msg.includes('token') || msg.includes('session')) {
        setShowSessionExpiry(true);
      }
    }
  }, [status, errorMessage]);

  const handleSessionExpiryDismiss = () => {
    setShowSessionExpiry(false);
    useAuthStore.getState().logout();
  };

  return (
    <>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {status === 'initializing' ? (
            <Stack.Screen name="splash" component={SplashScreen} />
          ) : status === 'unauthenticated' || status === 'error' ? (
            <>
              <Stack.Screen name="authGate" component={AuthGateScreen} />
              <Stack.Screen name="signIn" component={LoginScreen} />
              <Stack.Screen name="signUp" component={RegisterScreen} />
              <Stack.Screen name="forgotPassword" component={ForgotPasswordScreen} />
            </>
          ) : status === 'authenticated' && nurseSide ? (
            <>
              <Stack.Screen name="nurseTabs" component={NurseTabsNavigator} />
              <Stack.Screen name="rules" component={RulesScreen} options={{ headerShown: true, title: 'Règles' }} />
              <Stack.Screen name="ruleDetail" component={RuleDetailScreen} options={{ headerShown: true, title: 'Détail de la règle' }} />
              <Stack.Screen name="ruleBuilder" component={RuleBuilderScreen} options={{ headerShown: true, title: 'Règle' }} />
              <Stack.Screen name="designSystem" component={DesignSystemScreen} />
            </>
          ) : status === 'authenticated' && !nurseSide ? (
            <>
              <Stack.Screen name="patientTabs" component={PatientTabsNavigator} />
              <Stack.Screen name="designSystem" component={DesignSystemScreen} />
            </>
          ) : (
            <Stack.Screen name="authGate" component={AuthGateScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <SessionExpiryModal visible={showSessionExpiry} onDismiss={handleSessionExpiryDismiss} />
    </>
  );
}

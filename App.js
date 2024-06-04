import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';
import RootNavigator from './src/routes/RootNavigator';
import Toast from 'react-native-toast-message';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
        <Toast />
      </PersistGate>
    </Provider>
  );
};
export default App;

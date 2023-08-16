
import 'expo-dev-client';

import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Platform, StyleSheet, Text, View } from 'react-native';
import * as AliyunPush from 'aliyun-react-native-push'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title='init' onPress={async ()=>{

        AliyunPush.initPush('333881792', 'b86f1c0064214b69ab63226694c0b337').then((initPushRes)=>{
          const code = initPushRes.code;
          if (code === AliyunPush.kAliyunPushSuccessCode) {
            Alert.alert('Init iOS AliyunPush successfully👋');
          } else {
            const errorMsg = initPushRes.errorMsg?.toString();
            Alert.alert(`Failed to Init iOS AliyunPush, errorMsg: ${errorMsg}`);
          }
        });

        AliyunPush.showNoticeWhenForeground(true);

        AliyunPush.setPluginLogEnabled(true);

        await AliyunPush.turnOnIOSDebug().then((res)=>{
          console.info('~~~PUSH~~~=======打开IOS推送日志======', res);
        });

        AliyunPush.addNotificationCallback(event => {
          console.log('~~~PUSH~~~onNotification: ', event);
        });

        AliyunPush.addNotificationReceivedInApp(event => {
          console.log('~~~PUSH~~~onNotificationReceivedInApp: ', event);
        });

        AliyunPush.addMessageCallback(event => {
          console.log('~~~PUSH~~~onMessage: ', event);
        });

        AliyunPush.addNotificationOpenedCallback(event => {
          console.log('~~~PUSH~~~onNotificationOpen: ', event);
        });

        AliyunPush.addNotificationRemovedCallback(event => {
          console.log('~~~PUSH~~~onNotificationRemoved: ', event);
        });

        AliyunPush.addNotificationClickedWithNoAction(event => {
          console.log('~~~PUSH~~~onNotificationClickedWithNoAction: ', event);
        });

        AliyunPush.addChannelOpenCallback(event => {
          console.log('~~~PUSH~~~onChannelOpen: ', event);
        });

        AliyunPush.addRegisterDeviceTokenSuccessCallback(event => {
          console.log('~~~PUSH~~~onRegisterDeviceTokenSuccess: ', event);
        });

        AliyunPush.addRegisterDeviceTokenFailedCallback(event => {
          console.log('~~~PUSH~~~onRegisterDeviceTokenFailed: ', event);
        });

        if (Platform.OS !== 'ios') {
          AliyunPush.createAndroidChannel({
            id: '8.0up',
            name: '测试通道A',
            importance: 3,
            desc: '测试创建通知通道',
          }).then(result => {
            console.log(result);
          });
        }
      }} />

      <Button title='get info' onPress={async ()=>{
         const deviceId = await AliyunPush.getDeviceId();
         console.info('=======aliyun:deviceId======', deviceId);

         const isIOSChannelOpenedRes = await AliyunPush.isIOSChannelOpened();
         console.info('=======aliyun:isIOSChannelOpenedRes======', isIOSChannelOpenedRes);

         const getApnsDeviceTokenRes = await AliyunPush.getApnsDeviceToken();
         console.info('=======aliyun:getApnsDeviceTokenRes======', getApnsDeviceTokenRes);

        //  const getDevicePushTokenAsyncRes = await Notifications.getDevicePushTokenAsync();
        //  console.info('=======expo:getDevicePushTokenAsyncRes======', getDevicePushTokenAsyncRes);
      }}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

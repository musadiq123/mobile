/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App(): React.JSX.Element {
  const [message, setMessage] = useState<any>('');
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    socket.on('chat message',(msg:any) => {
      console.log("msg", msg)
      setMessages([...messages, msg]);
    });
    console.log("message:::",message, messages)
  }, [messages]);

  const sendMessage = () => {
    socket.emit('chat message', message);
    setMessage('');
  };

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  const ChatMessages = messages.map((msg:any,  i: any) =><Text key={i}>{msg}</Text>)

  return (
    <SafeAreaView>
      <View>
        {messages.map((msg: any, i: any) => (
          <Text key={i}>{msg}</Text>
        ))}
        <TextInput
          value={message}
          autoCorrect={false}
          onChangeText={setMessage}
          onSubmitEditing={sendMessage}
          style={{height: 40, borderWidth: 2, borderColor: 'gray'}}
        />

        <Button title="Send" onPress={sendMessage} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Appbar, TextInput, Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Quiz from './Quiz';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthProvider';

const CreateQuizScreen = () => {
  const {user} = useContext(AuthContext);
  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const ref = firestore().collection('todos');

  async function addTodo() {
    await ref.add({
      id: user.uid,
      title: todo,
      complete: false,
    });
    setTodo('');
  }

  useEffect(() => {
    return ref.where('id', '==', user.uid).onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const {title, complete} = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });

      setTodos(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return null; // or a spinner
  }

  return (
    <>
      <Appbar>
        <Appbar.Content title={'TODOs List'} />
      </Appbar>
      <FlatList
        style={{flex: 1}}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <Quiz {...item} />}
      />
      <TextInput label={'New Todo'} value={todo} onChangeText={setTodo} />
      <Button onPress={() => addTodo()}>Add TODO</Button>
    </>
  );
};

export default CreateQuizScreen;

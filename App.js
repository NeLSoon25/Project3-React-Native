import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState('');
  const [editedTaskIndex, setEditedTaskIndex] = useState(null);
  const [searchText, setSearchText] = useState('');

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const removeTask = (taskIndex) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
    // Salir del modo de edición si se elimina la tarea en edición
    if (taskIndex === editedTaskIndex) {
      setEditMode(false);
      setEditedTask('');
      setEditedTaskIndex(null);
    }
  };

  const editTask = (task, taskIndex) => {
    setEditMode(true);
    setEditedTask(task);
    setEditedTaskIndex(taskIndex);
  };

  const saveEditedTask = () => {
    if (editedTask !== null && editedTaskIndex !== null) {
      const updatedTasks = tasks.map((item, index) =>
        index === editedTaskIndex ? editedTask : item
      );
      setTasks(updatedTasks);
      setEditMode(false);
      setEditedTask('');
      setEditedTaskIndex(null);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Manager</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar tarea"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      {editMode ? (
        <View style={styles.editTask}>
          <TextInput
            style={styles.editInput}
            value={editedTask}
            onChangeText={(text) => setEditedTask(text)}
          />
          <Button title="Guardar" color="#e8732a" onPress={saveEditedTask} />
        </View>
      ) : (
        <Button title="Agregar tarea" color="#e8732a" onPress={addTask} />
      )}
      
      <TextInput
        style={styles.input}
        placeholder="Nueva tarea"
        value={newTask}
        onChangeText={(text) => setNewTask(text)}
      />
      <FlatList
        data={filteredTasks}
        renderItem={({ item, index }) => (
          <View style={styles.task}>
            <Text style={styles.taskText}>{item}</Text>
            <View style={{ marginRight: 15 }}>
              <Button
                title="Editar"
                color="#e8732a"
                onPress={() => editTask(item, index)}
              />
            </View>
            <Button title="Eliminar" color="#e8732a" onPress={() => removeTask(index)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop:20
  },
  editInput: {
    flex: 1,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  editTask: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  taskText: {
    flex: 1,
    fontSize: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

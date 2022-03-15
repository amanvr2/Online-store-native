import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import db from "../firebase";

export default function Category({ navigation }) {
  const [category, setCategory] = useState("");
  const [fetchedCategories, setfetchedCategories] = useState([]);
  const [toEdit, setToEdit] = useState({ id: null, name: "" });
  const [modalOpen, setModalOpen] = useState(false);

  const changeHandler = (val) => {
    setCategory(val);
  };

  const categoryObj = {
    name: category,
  };

  const queryOnResult = (data) => {
    const fetchedCategoriesArray = [];
    data.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      fetchedCategoriesArray.push(data);
    });
    setfetchedCategories(fetchedCategoriesArray);
  };

  useEffect(() => {
    getDocs(collection(db, "categories")).then(queryOnResult);
  }, []);

  const updateCategory = () => {
    console.log(toEdit.id);
    const categoryRef = doc(db, "categories", toEdit.id);
    updateDoc(categoryRef, {
      ...toEdit,
    })
      .then(() => {
        getDocs(collection(db, "categories")).then(queryOnResult);
      })
      .catch((e) => console.log(e));
  };

  const addCategory = (categoryObj) => {
    const usrColl = collection(db, "categories");
    addDoc(usrColl, categoryObj)
      .then((docRef) => {
        setfetchedCategories((prevCategories) => [
          ...prevCategories,
          { id: docRef.id, ...categoryObj },
        ]);
        console.log("Document written with ID: ", docRef.id);
      })

      .catch((e) => {
        console.error("Error adding document: ", e);
      });
  };

  const deleteCategory = (id) => {
    // console.log(id);
    deleteDoc(doc(db, "categories", id));
    const fiteredCategories = fetchedCategories.filter(
      (category) => category.id !== id
    );
    setfetchedCategories(fiteredCategories);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.categoryHeader}>Add Category</Text>
        </View>
        <View style={styles.categoryForm}>
          <TextInput
            style={styles.input}
            placeholder="Enter Category"
            value={category}
            onChangeText={(val) => changeHandler(val)}
          ></TextInput>
          <Text>{category}</Text>

          <Button onPress={() => addCategory(categoryObj)} title="Add" />
        </View>

        <View style={styles.categoryList}>
          <View style={styles.list}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={fetchedCategories}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Products", item)}
                >
                  <Modal visible={modalOpen} animationType="slide">
                    <MaterialIcons
                      name="close"
                      size={28}
                      color="#333"
                      style={styles.deleteIcon}
                      onPress={() => {
                        setModalOpen(false);
                      }}
                    />

                    <View style={styles.editForm}>
                      <Text>Category Name:</Text>
                      <TextInput
                        style={styles.input}
                        value={toEdit.name}
                        onChangeText={(val) =>
                          setToEdit((prev) => ({ ...prev, name: val }))
                        }
                      ></TextInput>
                      <Button title="update" onPress={updateCategory} />
                    </View>
                  </Modal>
                  <View style={styles.item}>
                    <MaterialIcons
                      name="delete"
                      size={18}
                      color="#333"
                      onPress={() => {
                        deleteCategory(item.id);
                      }}
                    />
                    <MaterialIcons
                      name="edit"
                      size={28}
                      color="#333"
                      onPress={(e) => {
                        setToEdit(item);
                        setModalOpen(true);
                      }}
                    />
                    <Text style={styles.textItem}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  categoryHeader: {
    textAlign: "center",
    backgroundColor: "coral",
    padding: 20,
    color: "white",
    textDecorationStyle: "double",
    fontSize: 20,
  },
  categoryForm: {
    padding: 20,
  },

  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  categoryList: {
    marginTop: 40,
    marginBottom: 200,
    padding: 20,
  },

  item: {
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    flexDirection: "row",
  },
  textItem: {
    marginLeft: 10,
  },
  deleteIcon: {
    margin: 20,
  },
  editForm: { padding: 20 },
});

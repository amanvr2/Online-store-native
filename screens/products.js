import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import db from "../firebase";

export default function Products({ route, navigation }) {
  const item = route.params;

  const [product, setproduct] = useState({});
  const [fetchedProducts, setfetchedProducts] = useState([]);
  const productObj = {
    name: product.name,
    price: product.price,
    categoryId: item.id,
  };
  const [toEditProduct, setToEditProduct] = useState({ id: null, name: "" });
  const [modalOpen, setModalOpen] = useState(false);

  const queryOnResult = (data) => {
    const fetchedProductsArray = [];
    data.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      fetchedProductsArray.push(data);
    });
    setfetchedProducts(fetchedProductsArray);
  };

  // useEffect(() => {
  //   getDocs(collection(db, "products")).then(queryOnResult);
  // }, []);

  const productsRef = collection(db, "products");

  // Create a query against the collection.
  const q = query(productsRef, where("categoryId", "==", item.id));
  useEffect(() => {
    getDocs(q).then(queryOnResult);
  }, []);

  const productNamechangeHandler = (val) => {
    setproduct((prev) => ({ ...prev, name: val }));
  };

  const productPricechangeHandler = (val) => {
    setproduct((prev) => ({ ...prev, price: val }));
  };

  const addProduct = (productObj) => {
    const usrColl = collection(db, "products");
    addDoc(usrColl, productObj)
      .then((docRef) => {
        setfetchedProducts((prevProducts) => [
          ...prevProducts,
          { id: docRef.id, ...productObj },
        ]);
        console.log("Document written with ID: ", docRef.id);
      })

      .catch((e) => {
        console.error("Error adding document: ", e);
      });
  };

  const deleteProduct = (id) => {
    console.log(id);
    deleteDoc(doc(db, "products", id));
    const fiteredProducts = fetchedProducts.filter(
      (product) => product.id !== id
    );
    setfetchedProducts(fiteredProducts);
  };
  const updateProduct = () => {
    console.log(toEditProduct.id);
    const productRef = doc(db, "products", toEditProduct.id);
    updateDoc(productRef, {
      ...toEditProduct,
    })
      .then(() => {
        const productsRef = collection(db, "products");

        // Create a query against the collection.
        const q = query(productsRef, where("categoryId", "==", item.id));
        getDocs(q).then(queryOnResult);
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={styles.container}>
      <View style={styles.productForm}>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          onChangeText={(val) => productNamechangeHandler(val)}
        ></TextInput>

        <TextInput
          style={styles.input}
          placeholder="Enter price"
          onChangeText={(val) => productPricechangeHandler(val)}
        ></TextInput>

        <Button
          title="Add Product"
          onPress={() => {
            addProduct(productObj);
          }}
        />
      </View>

      <View style={styles.productList}>
        <FlatList
          data={fetchedProducts}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Home", item)}>
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
                  <Text>Product Name:</Text>
                  <TextInput
                    style={styles.input}
                    value={toEditProduct.name}
                    onChangeText={(val) =>
                      setToEditProduct((prev) => ({ ...prev, name: val }))
                    }
                  ></TextInput>
                  <TextInput
                    style={styles.input}
                    value={toEditProduct.price}
                    onChangeText={(val) =>
                      setToEditProduct((prev) => ({ ...prev, price: val }))
                    }
                  ></TextInput>
                  <Button title="update" onPress={updateProduct} />
                </View>
              </Modal>
              <View style={styles.item}>
                <MaterialIcons
                  name="delete"
                  size={18}
                  color="#333"
                  onPress={() => {
                    deleteProduct(item.id);
                  }}
                />
                <MaterialIcons
                  name="edit"
                  size={28}
                  color="#333"
                  onPress={(e) => {
                    setToEditProduct(item);
                    setModalOpen(true);
                  }}
                />
                <Text style={styles.textItem}>
                  {item.name} -{item.price}
                </Text>
              </View>
              {/* <Text style={styles.item}>{item.name}</Text> */}
            </TouchableOpacity>
          )}
        />
      </View>

      {/* <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  productForm: {
    padding: 20,
  },

  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  productList: {
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

// const user = {
//   first: "Ada",
//   last: "Lovelace",
//   born: 1815,
// };
// const addNewUser = (user) => {
//   const usrColl = collection(db, "users");
//   addDoc(usrColl, user)
//     .then((docRef) => {
//       console.log("Document written with ID: ", docRef.id);
//     })
//     .catch((e) => {
//       console.error("Error adding document: ", e);
//     });
// };

// addNewUser(user);
// const queryOnResult = (data) => {
//   data.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data().first, " ", doc.data().last);
//   });
// };

// const getUsers = () => {
//   getDocs(collection(db, "users")).then(queryOnResult);
// };

// getUsers();

//read user

// const [users, setUsers] = useState([]);
// const [reviews, setReviews] = useState([
//   { title: "aman", id: "1" },
//   { title: "john", id: "2" },
// ]);
// const queryOnResult = (data) => {
//   data.forEach((doc) => {
//     setUsers((prevUsers) => {
//       return [doc.data(), ...prevUsers];
//     });
//   });
// };

// useEffect(() => {
//   getDocs(collection(db, "users")).then(queryOnResult);
// }, []);

{
  /* <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ReviewDetails", item)}
          >
            <Text style={styles.item}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.first} {item.last}
          </Text>
        )}
      /> */
}

/*
     const prevCategories = [
       {name :a},
       {name :p}
     ]
      [
      ...prevCategories, --> {name:a}, {name:p}
      {name :c}
      ]

  */

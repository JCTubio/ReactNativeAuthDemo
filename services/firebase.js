import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

class FirebaseService {
  async getDocuments(collection) {
    /*
    firestore()
      .collection(collection)
      .get()
      .then(querySnapshot => {
        return querySnapshot.docs.map(documentSnapshot => documentSnapshot.data())
      })
      .catch((error) => {
          console.log(error)
      });
      */
    try {
      const response = await firestore()
        .collection(collection)
        .get();
      return response.docs.map((documentSnapshot) => documentSnapshot.data());
    } catch (e) {
      console.log('Error retrieving documents from collection:', collection);
      console.log(e);
    }
  }

  async getDocument(collection, documentId) {
    try {
      const docRef = await firestore()
        .collection(collection)
        .doc(documentId)
        .get();
      return docRef.exists ? docRef.data() : null;
    } catch (e) {
      console.log(`Error retrieving a document from collection ${collection}`);
      console.log(e);
    }
  }

  async getDocumentsWithQuery(collection, query) {
    try {
      const { field, operator, value } = query;
      const response = await firestore()
        .collection(collection)
        .where(field, operator, value)
        .get();

      return response.docs.map((documentSnapshot) => documentSnapshot.data());
    } catch (e) {
      console.log(
        `Error retrieving documents from collection ${collection} with query: `,
        query
      );
      console.log(e);
    }
  }

  async createDocument(collection, data, documentId = null) {
    try {
      if (documentId) {
        await firestore()
          .collection(collection)
          .doc(documentId)
          .set(data);
      } else {
        await firestore()
          .collection(collection)
          .add(data);
      }
    } catch (e) {
      console.log(`Error uploading a document to collection: ${collection}`);
      console.log(e);
    }
  }

  async updateDocument(collection, data, documentId) {
    try {
      await firestore()
        .collection(collection)
        .doc(documentId)
        .update(data);
    } catch (e) {
      // when a global state manager is installed, upload the error message from here
      console.log(`Error updating a document to collection: ${collection}`);
      console.log(e);
    }
  }

  async replaceDocument(collection, data, documentId) {
    try {
      await firestore()
        .collection(collection)
        .doc(documentId)
        .set(data);
    } catch (e) {
      console.log(`Error replacing a document in collection: ${collection}`);
      console.log(e);
    }
  }

  createUserWithEmailAndPassword(email, password) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        return ({ code, message } = error);
      });
  }
}

export default new FirebaseService();

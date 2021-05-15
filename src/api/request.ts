import firebase from 'firebase';
import { SCHEMA } from '../constant';
import { firestore } from '../firebase';

const collection = {
  [SCHEMA.PRODUCT]: firestore.collection(SCHEMA.PRODUCT),
  [SCHEMA.ORDER]: firestore.collection(SCHEMA.ORDER),
  [SCHEMA.SHOPPING_CART]: firestore.collection(SCHEMA.SHOPPING_CART),
};

const requestTable = {
  GET: async (ref: string | number, targetId?: string | undefined) => {
    if (targetId) {
      return (await collection[ref].doc(targetId).get()).data();
    }
    return (await collection[ref].get()).docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
  POST: async (
    ref: string | number,
    content: firebase.firestore.DocumentData
  ) => collection[ref].add(content),
  PUT: async (
    ref: string | number,
    targetId: string | undefined,
    content: firebase.firestore.UpdateData
  ) => collection[ref].doc(targetId).update(content),
  DELETE: async (ref: string | number, targetId: string | undefined) =>
    collection[ref].doc(targetId).delete(),
};

export { requestTable };

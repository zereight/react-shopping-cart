import firebase from 'firebase';
import { useState, useEffect, useCallback } from 'react';

import { requestTable } from '../api/request';
import { activateLoading, deactivateLoading } from '../redux/action';
import { store } from '../redux/store';

const useServerAPI = (defaultValue: any, schema: string | number) => {
  const [value, setValue] = useState(defaultValue);

  const getAllData = useCallback(async () => {
    try {
      store.dispatch(activateLoading());
      const data = await requestTable.GET(schema);
      setValue(data);
    } catch (error) {
      console.error(error);
      setValue(defaultValue);
    } finally {
      store.dispatch(deactivateLoading());
    }
  }, [defaultValue, schema]);

  const getData = async (targetId: string | undefined) => {
    try {
      store.dispatch(activateLoading());
      const data = await requestTable.GET(schema, targetId);

      return data;
    } catch (error) {
      console.error(error);
    } finally {
      store.dispatch(deactivateLoading());
    }
  };

  const putData = async (
    targetId: string | undefined,
    content: firebase.firestore.UpdateData
  ) => {
    try {
      store.dispatch(activateLoading());
      await requestTable.PUT(schema, targetId, content);

      setValue((prevState: any[]) => {
        const newState = prevState.filter(
          (state: { id: any }) => state.id !== targetId
        );

        newState.push({
          id: targetId,
          ...content,
        });
        return newState;
      });
    } catch (error) {
      console.error(error);
    } finally {
      store.dispatch(deactivateLoading());
    }
  };

  const postData = async (content: firebase.firestore.DocumentData) => {
    try {
      store.dispatch(activateLoading());
      const newDataId = await requestTable.POST(schema, content);

      setValue((prevState: any) => {
        const newState = [...prevState];
        newState.push({
          id: newDataId,
          ...content,
        });

        return newState;
      });
    } catch (error) {
      console.error(error);
    } finally {
      store.dispatch(deactivateLoading());
    }
  };

  useEffect(() => {
    getAllData();

    return () => setValue(defaultValue);
  }, [defaultValue, getAllData]);

  return { value, setValue, getAllData, getData, putData, postData };
};

export default useServerAPI;

import { useState, useEffect } from 'react';

import { requestTable } from '../api/request';
import { activateLoading, deactivateLoading } from '../redux/action';
import { store } from '../redux/store';

const useServerAPI = (getQuery: string) => {
  const [value, setValue] = useState<Array<any>>([]);

  const getAllData = async (query: string) => {
    try {
      store.dispatch(activateLoading());
      const data = await requestTable.GET(query);

      setValue(data);
    } catch (error) {
      console.error(error);
      setValue([]);
    } finally {
      store.dispatch(deactivateLoading());
    }
  };

  const getData = async (query: string) => {
    try {
      store.dispatch(activateLoading());
      const data = await requestTable.GET(query);

      return data;
    } catch (error) {
      console.error(error);
    } finally {
      store.dispatch(deactivateLoading());
    }
  };

  const postData = async (query: string, payload: any) => {
    try {
      store.dispatch(activateLoading());

      const response = await requestTable.POST(query, payload);

      if (!response.ok) throw new Error(await response.text());

      setValue((prevState) => {
        const newState = [...prevState];
        newState.push({
          ...payload,
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
    getAllData(getQuery);

    return () => setValue([]);
  }, []);

  return { value, setValue, getAllData, getData, postData };
};

export default useServerAPI;

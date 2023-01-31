import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '../firebase-config';

const useGetFiat = () => {
  const [fiat, setFiat] = useState([]);

  const fetchYourFiat = (db) => {
    const yourFiatQuery = query(collection(db, 'yourFiat'));

    return onSnapshot(yourFiatQuery, (querySnapshot) => {
      setFiat(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          symbol: 'USD',
          name: 'Dollar',
          icon: 'https://firebasestorage.googleapis.com/v0/b/fireck-4c36e.appspot.com/o/ccm8H3qiABeVqHFGst1b4Y.svg?alt=media&token=e807e17a-0522-44f7-b00d-b40a9e0a4b5b',
          id: doc.id,
        }))
      );
    });
  };

  useEffect(() => {
    fetchYourFiat(db);
  }, []);

  return { fiat };
};

export default useGetFiat;

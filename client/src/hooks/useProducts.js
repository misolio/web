import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function useProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [loadingProducts, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, "products"));
      setAllProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };

    fetch();
  }, []);

  return { allProducts, loadingProducts };
}

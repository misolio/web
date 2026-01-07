import { useEffect, useMemo, useState } from "react";
import { SKIN_FEATURES, ALLERGENS } from "../assets/data/skinData";

export default function useRecommendationsFilter(allProducts, profile) {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [filterSkinType, setFilterSkinType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterAllergens, setFilterAllergens] = useState([]);
  const [filterFeatures, setFilterFeatures] = useState([]);
  const [sortPrice, setSortPrice] = useState("");
  const normalizeHighlights = (highlights) => {
    if (!highlights) return "";

    // якщо масив
    if (Array.isArray(highlights)) {
        return highlights.join(" ");
    }

    // якщо JSON-рядок
    if (typeof highlights === "string") {
        try {
        const parsed = JSON.parse(highlights);
        if (Array.isArray(parsed)) {
            return parsed.join(" ");
        }
        } catch {
        // звичайний рядок
        return highlights;
        }
    }

    return "";
  };

  useEffect(() => {
    if (!profile) return;

    setFilterSkinType(profile.skinType || "");
    setFilterAllergens(profile.allergens || []);
    setFilterFeatures(profile.skinFeatures || []);
  }, [profile]);

  const categories = useMemo(
    () => [...new Set(allProducts.map(p => p.category_2).filter(Boolean))],
    [allProducts]
  );

  const allFeatures = useMemo(
    () => [...new Set([...SKIN_FEATURES, ...allProducts.flatMap(p => p.skinFeatures || [])])],
    [allProducts]
  );

  const allAllergense = useMemo(
    () => [...new Set([...ALLERGENS, ...allProducts.flatMap(p => p.allergens || [])])],
    [allProducts]
  );

  useEffect(() => {
    let result = [...allProducts];

    /* === skin type === */
    if (filterSkinType && filterSkinType !== "all_skin_types") {
      const normalized = filterSkinType.replace(/_/g, " ").toLowerCase();
      const regex = new RegExp(`\\b${normalized}\\b`, "i");

      result = result.filter(p => regex.test(p.description || ""));
    }

    /* === category === */
    if (filterCategory) {
      result = result.filter(p => p.category_2 === filterCategory);
    }

    /* === allergens === */
    if (filterAllergens.length) {
      result = result.filter(p => {
        const text = (p.ingredients || "").toLowerCase();

        return !filterAllergens.some(a => {
          const n = a.replace(/_/g, " ");
          const r = new RegExp(`\\b${n}\\b(?!\\s*-?\\s*free)`, "i");
          return r.test(text);
        });
      });
    }

    /* === features === */
    if (filterFeatures.length) {
      result = result.filter(p => {
        const text = `${p.description || ""} ${(p.highlights || [])}${normalizeHighlights(p.highlights)}`.toLowerCase();

        return filterFeatures.every(f => {
          const n = f.replace(/_/g, " ");
          return new RegExp(`\\b${n}\\b`, "i").test(text);
        });
      });
    }

    /* === sort price === */
    if (sortPrice) {
      result.sort((a, b) =>
        sortPrice === "asc"
          ? (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0)
          : (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0)
      );
    }

    setFilteredProducts(result);
  }, [
    allProducts,
    filterSkinType,
    filterCategory,
    filterAllergens,
    filterFeatures,
    sortPrice
  ]);

  return {
    filteredProducts,
    filters: {
      filterSkinType,
      filterCategory,
      filterAllergens,
      filterFeatures,
      sortPrice
    },
    setters: {
      setFilterSkinType,
      setFilterCategory,
      setFilterAllergens,
      setFilterFeatures,
      setSortPrice
    },
    meta: {
      categories,
      allFeatures,
      allAllergense
    }
  };
}

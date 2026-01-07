import { SKIN_TYPES } from "../../assets/data/skinData";

export default function FiltersPanel({
  t,

  filterSkinType,
  setFilterSkinType,

  filterCategory,
  setFilterCategory,
  categories = [],

  filterAllergens = [],
  setFilterAllergens,

  filterFeatures = [],
  setFilterFeatures,

  allAllergense = [],
  allFeatures = [],

  sortPrice,
  setSortPrice
}) {
  const toggle = (arr, value, setter) => {
    if (arr.includes(value)) {
      setter(arr.filter(v => v !== value));
    } else {
      setter([...arr, value]);
    }
  };

  const halfAllergens = Math.ceil(allAllergense.length / 2);
  const halfFeatures = Math.ceil(allFeatures.length / 2);

  return (
    <div className="filters-panel">
     

      {/* ===== Column 1 ===== */}
      <div className="filters-column">
        <label>{t("recommendations.skinType")}</label>
        <select value={filterSkinType} onChange={e => setFilterSkinType(e.target.value)}>
          <option value="">{t("recommendations.all")}</option>
          {SKIN_TYPES.map(type => (
            <option key={type} value={type}>
              {t(`profile.skinTypes.${type}`)}
            </option>
          ))}
        </select>

        <label>{t("recommendations.category")}</label>
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
          <option value="">{t("recommendations.all")}</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label>{t("recommendations.sortPrice")}</label>
        <select value={sortPrice} onChange={e => setSortPrice(e.target.value)}>
          <option value="">{t("recommendations.none")}</option>
          <option value="asc">{t("recommendations.lowToHigh")}</option>
          <option value="desc">{t("recommendations.highToLow")}</option>
        </select>
      </div>

      {/* ===== Column 2 & 3: Allergens ===== */}
      <div className="filters-column">
        <strong>{t("recommendations.allergens")}</strong>
        {allAllergense.slice(0, halfAllergens).map(a => (
          <label key={a}>
            <input
              type="checkbox"
              checked={filterAllergens.includes(a)}
              onChange={() => toggle(filterAllergens, a, setFilterAllergens)}
            />
            {t(`profile.allergensList.${a}`)}
          </label>
        ))}
      </div>

      <div className="filters-column">
        {allAllergense.slice(halfAllergens).map(a => (
          <label key={a}>
            <input
              type="checkbox"
              checked={filterAllergens.includes(a)}
              onChange={() => toggle(filterAllergens, a, setFilterAllergens)}
            />
            {t(`profile.allergensList.${a}`)}
          </label>
        ))}
      </div>

      {/* ===== Column 4 & 5: Features ===== */}
      <div className="filters-column">
        <strong>{t("recommendations.skinFeatures")}</strong>
        {allFeatures.slice(0, halfFeatures).map(f => (
          <label key={f}>
            <input
              type="checkbox"
              checked={filterFeatures.includes(f)}
              onChange={() => toggle(filterFeatures, f, setFilterFeatures)}
            />
            {t(`profile.skinFeaturesList.${f}`)}
          </label>
        ))}
      </div>

      <div className="filters-column">
        {allFeatures.slice(halfFeatures).map(f => (
          <label key={f}>
            <input
              type="checkbox"
              checked={filterFeatures.includes(f)}
              onChange={() => toggle(filterFeatures, f, setFilterFeatures)}
            />
            {t(`profile.skinFeaturesList.${f}`)}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function UserPreferences({ profile }) {
  if (!profile) return null;

  return (
    <div className="user-preferences">
      <h2>Your preferences</h2>
      <p>Skin type: {profile.skinType}</p>
      <p>Allergens: {profile.allergens?.join(", ")}</p>
      <p>Skin features: {profile.skinFeatures?.join(", ")}</p>
    </div>
  );
}

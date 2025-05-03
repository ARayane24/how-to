"use client";
import { Profile } from "@/models/user_profiles";
import React, { useState } from "react";
import EditProfilePage from "./components/EditProfile";
import ProfilePage from "./components/ProfilePage";
import SettingsPopup from "./components/SettingsPopup";
import { get } from "http";
import { getLocalProfile } from "@/utils/local_store";

const App = () => {
  // Mock user data (replace with actual data loading)

  const [profile, setProfile] = useState<Profile>( getLocalProfile() || new Profile(0, 0, "AM", "BN", "FN", new Date(), "MM", "biooo"));
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <EditProfilePage
          profile={profile}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
        />
      ) : (
        <ProfilePage
          profile={profile}
          onEdit={handleEditProfile}
          onSettings={() => setShowSettings(true)}
        />
      )}
      <SettingsPopup
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
};

export default App;

"use client";
import { Profile } from "@/models/user_profiles";
import React, { useState } from "react";
import EditProfilePage from "./components/EditProfile";
import ProfilePage from "./components/ProfilePage";
import SettingsPopup from "./components/SettingsPopup";

const App = () => {
  // Mock user data (replace with actual data loading)
  const mockProfileData = {
    id: 1,
    idAccount: 123,
    first_name: "John",
    mid_name: "Michael",
    last_name: "Doe",
    joined: "2023-01-15",
    profile_picture: "/holder_profile_image.svg", // Replace with a real URL
    bio: "Software Engineer with a passion for web development.",
  };

  const [profile, setProfile] = useState<Profile>(
    Profile.fromJson(mockProfileData)
  );
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

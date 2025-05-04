"use client";
import { Profile } from "@/models/user_profiles";
import React, { useEffect, useState } from "react";
import EditProfilePage from "./components/EditProfile";
import ProfilePage from "./components/ProfilePage";
import SettingsPopup from "./components/SettingsPopup";
import { get } from "http";
import { getLocalProfile } from "@/utils/local_store";
import LaravelApiClient from "@/api-clients/laravel_client";

const App = () => {
  // Mock user data (replace with actual data loading)

  const [profile, setProfile] = useState<Profile>();
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const localProfile = await getLocalProfile();
      if (localProfile) {
        setProfile(localProfile);
      }
    };
    fetchProfile();
  }, []);
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    localStorage.removeItem("profile");
    localStorage.setItem("profile", JSON.stringify(updatedProfile));
    console.log(updatedProfile );
    const updateProfile = async () => {
      await LaravelApiClient.put("/api/v1/profiles/" + updatedProfile.id, Profile.toXML(updatedProfile));
    };
    updateProfile();
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <EditProfilePage
          profile={profile!}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
        />
      ) : (
        <ProfilePage
          profile={profile!}
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

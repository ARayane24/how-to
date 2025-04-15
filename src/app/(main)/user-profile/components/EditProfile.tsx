"use client";
import { Profile } from "@/models/user_profiles";
import { useState } from "react";
import Image from "next/image";
import PageWrapper from "../../components/PageWrapper";
import { AlertCircle, Save, User, X } from "lucide-react";
import FormInput from "../../components/FormInput";
import ActionButton from "../../components/ActionButton";

const EditProfilePage = ({
  profile,
  onSave,
  onCancel,
}: {
  profile: Profile;
  onSave: (updatedProfile: Profile) => void;
  onCancel: () => void;
}) => {
  const [firstName, setFirstName] = useState(profile.firstName);
  const [midName, setMidName] = useState(profile.midName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [bio, setBio] = useState(profile.bio);
  const [profilePicture, setProfilePicture] = useState(profile.profilePicture);
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    const updatedProfile = new Profile(
      profile.id,
      profile.idAccount,
      firstName,
      midName,
      lastName,
      profile.joined,
      profilePicture,
      bio
    );
    onSave(updatedProfile);
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <PageWrapper
      title="Edit Profile"
      subtitle="Modify your profile information."
    >
      <div className="bg-gray-800/50 rounded-xl p-6 space-y-6 shadow-lg border border-gray-700">
        <div className="flex items-center gap-4">
          {profilePicture ? (
            <Image
              src={profilePicture || "/holder_profile_image.svg"}
              alt="Profile"
              width={48}
              height={48}
              className="rounded-full bg-gray-300 p-0.5 "
            />
          ) : (
            <User className="w-12 h-12 text-purple-300" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handlePictureChange}
            className="text-gray-300"
          />
        </div>
        <FormInput
          id="firstName"
          label="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Your First Name"
        />
        <FormInput
          id="midName"
          label="Middle Name"
          type="text"
          value={midName}
          onChange={(e) => setMidName(e.target.value)}
          placeholder="Your Middle Name"
        />
        <FormInput
          id="lastName"
          label="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Your Last Name"
        />
        <FormInput
          id="bio"
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself..."
          className="min-h-[100px] resize-y p-2 bg-gray-800 text-white border border-gray-700 rounded-md"
          type="textarea"
        />

        {error && (
          <div className="text-red-500 text-sm flex items-center gap-1">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}
        <div className="flex gap-4">
          <ActionButton
            onClick={handleSave}
            className="flex-1 bg-green-500/20 text-green-300 hover:bg-green-500/30 hover:text-green-200"
          >
            <Save className="mr-2 w-4 h-4" /> Save
          </ActionButton>
          <ActionButton
            onClick={onCancel}
            className="flex-1 bg-gray-700/50 text-gray-300 hover:bg-gray-700/70"
          >
            <X className="mr-2 w-4 h-4" /> Cancel
          </ActionButton>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EditProfilePage;

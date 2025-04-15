import { Profile } from "@/models/user_profiles";
import PageWrapper from "../../components/PageWrapper";
import { Edit, Settings, User } from "lucide-react";
import Image from "next/image";
import ActionButton from "../../components/ActionButton";
import { format } from "date-fns";

const ProfilePage = ({
  profile,
  onEdit,
  onSettings,
}: {
  profile: Profile;
  onEdit: () => void;
  onSettings: () => void;
}) => (
  <PageWrapper
    title="Your Profile"
    subtitle="View and manage your profile information."
  >
    <div className="bg-gray-800/50 rounded-xl p-6 space-y-6 shadow-lg border border-gray-700">
      <div className="flex items-center gap-4">
        {profile.profilePicture ? (
          <Image
            src={profile.profilePicture || "/holder_profile_image.svg"}
            alt="Profile"
            width={48}
            height={48}
            className="rounded-full bg-gray-300 p-0.5 "
          />
        ) : (
          <User className="w-12 h-12 text-purple-300" />
        )}
        <div>
          <h3 className="text-xl font-semibold text-white">
            {profile.getFullName()}
          </h3>
          <p className="text-gray-400">
            Joined: {format(profile.joined, "MMMM dd, yyyy")}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-medium text-gray-200">
          Personal Information
        </h4>
        <p className="text-gray-300">
          <span className="font-medium text-gray-400">Username: </span>
          {profile.firstName}
        </p>
        <p className="text-gray-300">
          <span className="font-medium text-gray-400">Bio: </span> <br />
          {profile.bio}
        </p>
      </div>
      <div className="flex gap-4">
        <ActionButton
          onClick={onEdit}
          className="flex-1 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 hover:text-blue-200"
        >
          <Edit className="mr-2 w-4 h-4" /> Edit Profile
        </ActionButton>
        <ActionButton
          onClick={onSettings}
          className="flex-1 bg-gray-700/50 text-gray-300 hover:bg-gray-700/70"
        >
          <Settings className="mr-2 w-4 h-4" /> Settings
        </ActionButton>
      </div>
    </div>
  </PageWrapper>
);

export default ProfilePage;

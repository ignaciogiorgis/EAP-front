import {
  handleShowProfile,
  handleUploadProfilePicture,
} from "@/utils/dashboard/profile";
import ContainerProfile from "@/components/dashboard/profile/containerProfile";
export const dynamic = 'force-dynamic';

const Page = async () => {
  const response = await handleShowProfile();
  return (
    <div>
      <ContainerProfile
        user={response?.data || []}
        handleUploadProfilePicture={handleUploadProfilePicture}
      />
    </div>
  );
};

export default Page;

import {
  handleShowProfile,
  handleUploadProfilePicture,
} from "@/app/dashboard/api/route";
import ContainerProfile from "@/components/dashboard/profile/containerProfile";

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

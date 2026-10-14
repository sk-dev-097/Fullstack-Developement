import profileData from "../data/profileData";
import ProfileHeader from "./ProfileHeader";
import ProfileDetails from "./ProfileDetails";
import About from "./About";
import Skills from "./Skills";
import Contact from "./Contact";

function Profile() {
  return (
    <div className="profile-card">
      <ProfileHeader profile={profileData} />
      <ProfileDetails profile={profileData} />
      <About description={profileData.about} />
      <Skills />
      <Contact
        email={profileData.email}
        phone={profileData.phone}
      />
    </div>
  );
}

export default Profile;
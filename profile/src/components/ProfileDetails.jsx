function ProfileDetails({ profile }) {
  return (
    <div className="profile-details">
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <p><strong>Location:</strong> {profile.location}</p>
    </div>
  );
}

export default ProfileDetails;
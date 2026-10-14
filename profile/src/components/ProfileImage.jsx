function ProfileImage({ image, name }) {
  return (
    <img
      src={image}
      alt={name}
      className="profile-image"
    />
  );
}

export default ProfileImage;
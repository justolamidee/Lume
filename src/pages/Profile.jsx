import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";

const Profile = () => {
  const navigate = useNavigate();
  const {
    token,
    user,
    updateProfile,
    updateProfilePicture,
  } = useAuth();
  const [form, setForm] = useState({ firstname: "", lastname: "", bio: "" });
  const [saving, setSaving] = useState(false);
  const [pictureSaving, setPictureSaving] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    if (!user) return;
    setForm({
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      bio: user.bio || "",
    });
  }, [user]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await updateProfile(form);
    } finally {
      setSaving(false);
    }
  };

  const handlePictureChange = async (event) => {
    const image = event.target.files?.[0];
    if (!image) return;

    setPictureSaving(true);
    try {
      await updateProfilePicture(image);
    } finally {
      setPictureSaving(false);
      event.target.value = "";
    }
  };

  if (!user) return null;

  return (
    <main className="profile-page">
      <section className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.profile_image ? (
              <img src={user.profile_image} alt={`${user.firstname}'s avatar`} />
            ) : (
              user.firstname?.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <p className="profile-eyebrow">User dashboard</p>
            <h1>Welcome, {user.firstname}</h1>
            <p className="profile-email">{user.email}</p>
          </div>
          <label className="picture-button">
            {pictureSaving ? "Uploading..." : "Change picture"}
            <input type="file" accept="image/png,image/jpeg" onChange={handlePictureChange} disabled={pictureSaving} />
          </label>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <h2>Personal details</h2>
          <label>
            First name
            <input name="firstname" value={form.firstname} onChange={handleChange} required />
          </label>
          <label>
            Last name
            <input name="lastname" value={form.lastname} onChange={handleChange} required />
          </label>
          <label>
            Bio
            <textarea name="bio" value={form.bio} onChange={handleChange} rows="4" placeholder="Tell us a little about yourself" />
          </label>
          <div className="profile-form-actions">
            <button type="submit" className="save-profile-button" disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </button>
            <button
              type="button"
              className="back-profile-button"
              onClick={() => navigate("/")}
            >
              Back to market
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Profile;
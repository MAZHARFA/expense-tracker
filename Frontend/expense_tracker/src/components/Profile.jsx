import React from "react";
import { User, Upload, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
const Profile = ({ imagePreview, setImagePreview, setImageFile }) => {
  const fileInputRef = React.useRef();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // For display
        setImageFile(file); // For upload
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Upload a valid image.");
    }
  };

  const handleDelete = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <div
        onClick={handleIconClick}
        className="relative w-24 h-24 rounded-full cursor-pointer group"
      >
        <div className="w-full h-full rounded-full bg-gray-100 border border-green-400 flex items-center justify-center overflow-hidden shadow-md group-hover:ring-2 ring-green-300 transition">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User
              size={20}
              className="text-gray-400 group-hover:text-green-500 transition"
            />
          )}
        </div>

        <div
          className="absolute bottom-0 right-0 bg-green-500 p-1.5 rounded-full shadow-lg group-hover:scale-110 transition"
          onClick={imagePreview ? handleDelete : undefined}
        >
          {imagePreview ? (
            <Trash2 size={16} className="text-white" />
          ) : (
            <Upload size={16} className="text-white" />
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default Profile;

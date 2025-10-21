import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      // Generate the image preview url from the file
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveChange = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="mb-6 flex justify-center">
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="relative flex size-20 items-center justify-center rounded-full bg-purple-100">
          <LuUser className="text-primary text-4xl" />

          <button
            type="button"
            className="bg-primary absolute -right-1 -bottom-1 flex size-8 cursor-pointer items-center justify-center rounded-full text-white"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img src={previewUrl} alt="profile photo" className="size-20 rounded-full object-cover" />
          <button
            type="button"
            className="absolute -right-1 -bottom-1 flex size-8 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white"
            onClick={handleRemoveChange}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;

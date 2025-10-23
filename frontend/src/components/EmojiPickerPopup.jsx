import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiSelect = (emojiData) => {
    onSelect(emojiData?.imageUrl || '');
    setIsOpen(false); //  Close popup after selecting
  };

  return (
    <div className="mb-6 flex flex-col items-start gap-5 md:flex-row">
      {/* Icon Button */}
      <div className="flex cursor-pointer items-center gap-4" onClick={() => setIsOpen(true)}>
        <div className="text-primary flex size-12 items-center justify-center rounded-lg bg-purple-50 text-2xl">
          {icon ? <img src={icon} alt="Icon" className="size-12" /> : <LuImage size={20} />}
        </div>
        <p className="text-white">{icon ? 'Change Icon' : 'Pick Icon'}</p>
      </div>

      {/* Emoji Picker Popup */}
      {isOpen && (
        <div className="relative">
          <button
            className="absolute -top-2 -right-2 z-10 flex size-7 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white"
            onClick={() => setIsOpen(false)}
          >
            <LuX size={18} />
          </button>

          <EmojiPicker open={isOpen} onEmojiClick={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;

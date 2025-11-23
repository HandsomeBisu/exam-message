import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Button from './Button';
import { CardColor, EMOJI_OPTIONS } from '../types';

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (author: string, content: string, emoji: string, color: string) => void;
}

const COLORS = Object.values(CardColor);

const WriteModal: React.FC<WriteModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJI_OPTIONS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setAuthor('');
      setContent('');
      setSelectedEmoji(EMOJI_OPTIONS[0]);
      setSelectedColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!author.trim() || !content.trim()) return;
    onSubmit(author, content, selectedEmoji, selectedColor);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-50 p-6 max-h-[90vh] overflow-y-auto w-full max-w-lg mx-auto shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#191f28]">응원 메시지 남기기</h2>
              <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Emoji Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2">아이콘 선택</label>
                {/* Added padding to prevent scale clipping */}
                <div className="flex gap-3 overflow-x-auto p-2 no-scrollbar -mx-2 px-4">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`
                        w-12 h-12 flex-shrink-0 rounded-full text-2xl flex items-center justify-center transition-all
                        ${selectedEmoji === emoji ? 'bg-blue-100 border-2 border-blue-500 scale-110 shadow-md' : 'bg-gray-50'}
                      `}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Author Input */}
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2">보내는 사람</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="닉네임을 입력해주세요"
                  className="w-full bg-[#f2f4f6] rounded-xl px-4 py-3 text-lg font-medium text-[#191f28] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow placeholder-gray-400"
                  maxLength={10}
                />
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2">응원 메시지</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="친구들에게 힘이 되는 말을 적어주세요!"
                  className="w-full bg-[#f2f4f6] rounded-xl px-4 py-3 text-lg font-medium text-[#191f28] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow placeholder-gray-400 resize-none h-32"
                  maxLength={100}
                />
              </div>

              <div className="pt-4">
                <Button 
                  fullWidth 
                  onClick={handleSubmit} 
                  disabled={!author.trim() || !content.trim()}
                >
                  등록하기
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WriteModal;
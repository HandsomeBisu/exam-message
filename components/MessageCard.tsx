import React from 'react';
import { motion } from 'framer-motion';
import { CheerMessage } from '../types';
import { Heart } from 'lucide-react';

interface MessageCardProps {
  message: CheerMessage;
  onLike: (id: string) => void;
  index: number;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, onLike, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30, 
        delay: index * 0.05 
      }}
      className="bg-white rounded-[24px] p-6 mb-4 shadow-sm border border-gray-100 relative overflow-hidden group"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${message.color} text-white`}>
            {message.emoji}
          </div>
          <div className="flex flex-col">
            <span className="text-[#191f28] font-bold text-lg leading-tight">{message.author}</span>
            <span className="text-[#8b95a1] text-xs">
              {new Date(message.timestamp).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
        <button 
          onClick={() => onLike(message.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <Heart size={16} className={message.likes > 0 ? "fill-red-500 text-red-500" : ""} />
          <span className="text-sm font-medium">{message.likes}</span>
        </button>
      </div>
      
      <p className="text-[#333d4b] text-[17px] leading-relaxed font-medium break-keep">
        {message.content}
      </p>
    </motion.div>
  );
};

export default MessageCard;
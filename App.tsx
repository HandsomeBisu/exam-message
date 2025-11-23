import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Trophy, Users } from 'lucide-react';
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, increment } from 'firebase/firestore';
import MessageCard from './components/MessageCard';
import WriteModal from './components/WriteModal';
import Button from './components/Button';
import { CheerMessage } from './types';
import { db } from './services/firebase';

const App = () => {
  const [messages, setMessages] = useState<CheerMessage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

  // Protection: Disable Right Click, Drag, etc.
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      // Allow selection only in inputs and textareas
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('selectstart', handleSelectStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);

  // Load from Firebase Realtime (Firestore)
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CheerMessage[];
      
      setMessages(msgs);
      
      // Calculate total likes from live data
      const total = msgs.reduce((acc, curr) => acc + (curr.likes || 0), 0);
      setTotalLikes(total);
    });

    return () => unsubscribe();
  }, []);

  const handleAddMessage = async (author: string, content: string, emoji: string, color: string) => {
    try {
      await addDoc(collection(db, "messages"), {
        author,
        content,
        emoji,
        color,
        timestamp: Date.now(),
        likes: 0
      });
      // No need to manually update state, onSnapshot will handle it
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("메시지 등록 중 오류가 발생했습니다.");
    }
  };

  const handleLike = async (id: string) => {
    try {
      const messageRef = doc(db, "messages", id);
      await updateDoc(messageRef, {
        likes: increment(1)
      });
    } catch (error) {
      console.error("Error updating likes: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f4f6] pb-32 max-w-md mx-auto relative shadow-2xl shadow-gray-200">
      {/* Header / Hero Section */}
      <header className="pt-16 pb-8 px-6 bg-white rounded-b-[32px] shadow-sm z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-bold mb-4">
            <Trophy size={16} />
            <span>기말고사까지 얼마 남지 않았어요</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#191f28] leading-[1.3] mb-4">
            친구들을 위한 <span className="text-[#3182f6]">기말고사</span><br />응원 메시지를 남겨주세요!
          </h1>
          <p className="text-[#8b95a1] text-lg mb-8">
            시험 기간 힘내고<br />
            모두 즐겁게 놀아요 :)
          </p>

          <div className="flex gap-4">
            <div className="flex-1 bg-[#f9fafb] p-4 rounded-2xl">
              <div className="text-[#8b95a1] text-sm font-bold mb-1 flex items-center gap-1">
                <MessageCircle size={14} /> 메시지
              </div>
              <div className="text-2xl font-bold text-[#191f28]">{messages.length}개</div>
            </div>
            <div className="flex-1 bg-[#f9fafb] p-4 rounded-2xl">
              <div className="text-[#8b95a1] text-sm font-bold mb-1 flex items-center gap-1">
                <Users size={14} /> 총 응원
              </div>
              <div className="text-2xl font-bold text-[#191f28]">{totalLikes.toLocaleString()}회</div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Message Feed */}
      <main className="px-5 pt-8">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xl font-bold text-[#333d4b]">실시간 응원 메시지</h2>
          <span className="text-sm text-[#8b95a1]">최신순</span>
        </div>

        {messages.map((msg, index) => (
          <MessageCard 
            key={msg.id} 
            message={msg} 
            onLike={handleLike} 
            index={index} 
          />
        ))}

        {messages.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            아직 작성된 응원 메시지가 없어요.<br />
            첫 번째 응원을 남겨주세요!
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-gradient-to-t from-[#f2f4f6] via-[#f2f4f6] to-transparent pointer-events-none z-40 h-32 flex items-end justify-center">
        <div className="pointer-events-auto w-full">
            <Button 
                variant="primary" 
                fullWidth 
                className="shadow-lg shadow-blue-500/30 text-lg py-4"
                onClick={() => setIsModalOpen(true)}
            >
                응원 메시지 남기기
            </Button>
        </div>
      </div>

      <WriteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddMessage}
      />
    </div>
  );
};

export default App;
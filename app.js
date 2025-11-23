
// --- Constants & Types ---
const CardColor = {
  Blue: 'bg-blue-500',
  Indigo: 'bg-indigo-500',
  Teal: 'bg-teal-500',
  Rose: 'bg-rose-500',
  Orange: 'bg-orange-500',
};

const EMOJI_OPTIONS = [
  '🔥', '💯', '🍀', '📚', '💪', '✨', '🎓', '☕️',
  '✏️', '🏫', '🎒', '🌈', '🍔', '🎮', '🎵', '⚽️',
  '💡', '🧸', '🌙', '⭐', '🐱', '🐶', '🍕', '🍭'
];

// --- Firebase Initialization ---
const firebaseConfig = {
  apiKey: "AIzaSyCbL9Dm3_dJFySXAC3rwgDh6Vpos-7-x30",
  authDomain: "dpsteam.firebaseapp.com",
  projectId: "dpsteam",
  storageBucket: "dpsteam.firebasestorage.app",
  messagingSenderId: "681061854285",
  appId: "1:681061854285:web:d1a770ba597fcb785b4004",
  measurementId: "G-93XNC4MZYV"
};

// Initialize Firebase (Compat)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- Icons (SVG Components) ---
const Icons = {
  Heart: ({ className, size = 24 }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  MessageCircle: ({ className, size = 24 }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  ),
  Trophy: ({ className, size = 24 }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17" />
      <path d="M14 14.66V17" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  Users: ({ className, size = 24 }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  X: ({ className, size = 24 }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
};

// --- Components ---

const { useState, useEffect } = React;
const { motion, AnimatePresence } = window.Motion;

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  fullWidth = false
}) => {
  const baseStyles = "font-bold rounded-2xl py-4 px-6 flex items-center justify-center transition-colors select-none";
  
  const variants = {
    primary: "bg-[#3182f6] text-white hover:bg-[#1b64da] disabled:bg-[#b0b8c1]",
    secondary: "bg-[#e8f3ff] text-[#1b64da] hover:bg-[#dbe9ff]",
    ghost: "bg-transparent text-[#4e5968] hover:bg-black/5",
    floating: "fixed bottom-8 left-1/2 -translate-x-1/2 shadow-lg shadow-blue-500/30 bg-[#3182f6] text-white z-50 rounded-full px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

const MessageCard = ({ message, onLike, index }) => {
  const { Heart } = Icons;
  
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

const WriteModal = ({ isOpen, onClose, onSubmit }) => {
  const { X } = Icons;
  const COLORS = Object.values(CardColor);

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJI_OPTIONS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

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
        <React.Fragment>
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
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};

const App = () => {
  const { MessageCircle, Trophy, Users } = Icons;
  
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

  // Protection: Disable Right Click, Drag, etc.
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleDragStart = (e) => e.preventDefault();
    const handleSelectStart = (e) => {
      const target = e.target;
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

  // Load from Firebase
  useEffect(() => {
    const q = db.collection("messages").orderBy("timestamp", "desc");
    
    const unsubscribe = q.onSnapshot((snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setMessages(msgs);
      const total = msgs.reduce((acc, curr) => acc + (curr.likes || 0), 0);
      setTotalLikes(total);
    });

    return () => unsubscribe();
  }, []);

  const handleAddMessage = async (author, content, emoji, color) => {
    try {
      await db.collection("messages").add({
        author,
        content,
        emoji,
        color,
        timestamp: Date.now(),
        likes: 0
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("메시지 등록 중 오류가 발생했습니다.");
    }
  };

  const handleLike = async (id) => {
    try {
      await db.collection("messages").doc(id).update({
        likes: firebase.firestore.FieldValue.increment(1)
      });
    } catch (error) {
      console.error("Error updating likes: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f4f6] pb-32 max-w-md mx-auto relative shadow-2xl shadow-gray-200">
      {/* Header */}
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

      {/* Feed */}
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

      {/* FAB */}
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

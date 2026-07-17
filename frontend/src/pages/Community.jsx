import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';

const INITIAL_POSTS = [
  {
    id: 1,
    category: 'Milestone',
    categoryNy: 'Chipambano',
    author: 'Anonymous Tadala',
    content: 'Today makes 30 days since I deleted my Aviator account and stopped betting. I have saved enough to buy fertilizer for my parents in Lilongwe! Tiyeni tizithandizana!',
    likes: 18,
    likedByUser: false,
    time: '2 hours ago'
  },
  {
    id: 2,
    category: 'Story',
    categoryNy: 'Mbiri Yanga',
    author: 'Anonymous Friend',
    content: 'I used to borrow katapila to play virtual football betting. I lost my small business capital and almost lost my family. Since joining BASM, I have completed 2 weeks bet-free and started an agribusiness training track.',
    likes: 12,
    likedByUser: false,
    time: '5 hours ago'
  },
  {
    id: 3,
    category: 'Encouragement',
    categoryNy: 'Chilimbikitso',
    author: 'Anonymous Coach',
    content: 'Remember, a betting company makes its millions of profits because you lose your hard-earned Kwachas. Do not feed them today. Feed your children instead!',
    likes: 24,
    likedByUser: false,
    time: 'Yesterday'
  }
];

export default function Community() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('Story');

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const newPost = {
      id: posts.length + 1,
      category: newCategory,
      categoryNy: newCategory === 'Story' ? 'Mbiri Yanga' : newCategory === 'Milestone' ? 'Chipambano' : newCategory === 'Question' ? 'Funso' : 'Chilimbikitso',
      author: t('Anonymous User', 'Wobetchera Mwachinsinsi'),
      content: newContent,
      likes: 0,
      likedByUser: false,
      time: t('Just now', 'Pakadali pano')
    };

    setPosts([newPost, ...posts]);
    setNewContent('');
  };

  const handleLike = (postId) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          likes: p.likedByUser ? p.likes - 1 : p.likes + 1,
          likedByUser: !p.likedByUser
        };
      }
      return p;
    }));
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 pb-24 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Title */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950">
            {t('Anonymous Support Circle', 'Gulu la Macheza Mwachinsinsi')}
          </h1>
          <p className="text-gray-500 text-sm">
            {t('Share your journey, celebrate milestones, and encourage fellow Malawians. Fully anonymous.', 'Siyanitsani mbiri yanu, limbikitsani anzanu, ndipo kondwererani masiku osabetcha. Zaulere komanso zachinsinsi.')}
          </p>
        </div>

        {/* Challenge Widget */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white shadow-sm flex items-start space-x-3">
          <span className="text-2xl animate-bounce">🏆</span>
          <div>
            <h4 className="font-extrabold text-amber-50 text-xs uppercase tracking-widest leading-none">
              {t("TODAY'S RECOVERY CHALLENGE", 'CHOLINGA CHA LERO')}
            </h4>
            <p className="font-extrabold text-sm md:text-base mt-1">
              {t(
                "Go for a 20-minute walk or help a neighbor instead of opening any betting application.",
                "Kawayendeni m&apos;mbali mwa msewu kwa mphindi 20 kapena kathandizeni mnzanu panyumba m&apos;malo motsegula foni yobetcha."
              )}
            </p>
          </div>
        </div>

        {/* Create Post Card */}
        <form onSubmit={handleCreatePost} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-sm md:text-base">
            {t('Share an Update (Anonymous)', 'Lembani Uthenga (Mwachinsinsi)')}
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'Story', label: t('Story', 'Mbiri Yanga') },
              { id: 'Question', label: t('Question', 'Funso') },
              { id: 'Encouragement', label: t('Encouragement', 'Chilimbikitso') },
              { id: 'Milestone', label: t('Milestone', 'Chipambano') }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setNewCategory(cat.id)}
                className={`py-1.5 px-3 rounded-full text-xs font-bold transition ${
                  newCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-50 text-gray-600 hover:bg-slate-100 border border-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <textarea
            rows="3"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder={t('Tell us about your day, triggers, or savings...', 'Tiuze momwe tsiku lanu layendera, kapena zosokoneza zomwe mwakumana nazo...')}
            className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="flex justify-between items-center">
            <span className="text-[10px] text-gray-400 font-semibold italic">
              🔒 {t('Your identity is hidden', 'Mwayendabe mwachinsinsi pasakhale maina')}
            </span>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-2 rounded-xl transition"
            >
              {t('Post Anonymously', 'Tumizani Mwachinsinsi')}
            </button>
          </div>
        </form>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase bg-indigo-50 border border-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full">
                  {t(post.category, post.categoryNy)}
                </span>
                <span className="text-[11px] text-gray-400 font-semibold">{post.time}</span>
              </div>

              <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium">
                {post.content}
              </p>

              <div className="flex justify-between items-center pt-2 border-t border-gray-50 text-xs">
                <span className="text-gray-400 font-bold italic">
                  ✍️ {post.author}
                </span>
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-1.5 font-bold transition px-3 py-1 rounded-full ${
                    post.likedByUser
                      ? 'bg-red-50 text-red-600 border border-red-100'
                      : 'bg-slate-50 hover:bg-slate-100 text-gray-600'
                  }`}
                >
                  <span>{post.likedByUser ? '❤️' : '🤍'}</span>
                  <span>{post.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

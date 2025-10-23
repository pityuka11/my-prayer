'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

type Discussion = {
  id: number;
  group_id: number;
  user_id: number | null;
  user_name: string;
  message: string;
  created_at: string;
};

type DiscussionGroup = {
  id: number;
  name: string;
  description: string;
  category: string;
};

interface DiscussionChatProps {
  groupId: number;
}

export default function DiscussionChat({ groupId }: DiscussionChatProps) {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [group, setGroup] = useState<DiscussionGroup | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const t = useTranslations('community');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch group info
        const groupsRes = await fetch('/api/discussion-groups');
        const groupsData: { groups: DiscussionGroup[] } = await groupsRes.json();
        const currentGroup = groupsData.groups.find(g => g.id === groupId);
        setGroup(currentGroup || null);
        
        // Fetch discussions
        const discussionsRes = await fetch(`/api/discussions?groupId=${groupId}`);
        const discussionsData: { discussions: Discussion[] } = await discussionsRes.json();
        setDiscussions(discussionsData.discussions || []);
      } catch (error) {
        console.error('Failed to fetch discussion data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [groupId]);

  useEffect(() => {
    scrollToBottom();
  }, [discussions]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/discussions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ 
          groupId,
          userId: null, // For now, allow anonymous messages
          userName: 'Anonymous', // This should come from auth context
          message: newMessage.trim()
        })
      });

      if (res.ok) {
        setNewMessage('');
        // Refresh discussions
        const discussionsRes = await fetch(`/api/discussions?groupId=${groupId}`);
        const discussionsData: { discussions: Discussion[] } = await discussionsRes.json();
        setDiscussions(discussionsData.discussions || []);
      } else {
        const errorData = await res.json() as { error?: string };
        alert('Failed to send message: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Error sending message: ' + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F7F2] flex items-center justify-center">
        <div className="text-[#3A504B] opacity-70">Loading discussion...</div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-[#F8F7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="text-[#3A504B] opacity-70 mb-4">Discussion group not found</div>
          <button 
            onClick={() => router.back()}
            className="bg-[#8ECDCF] text-white px-6 py-2 rounded-lg hover:bg-[#7BB8BA] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-playfair text-[#3A504B] mb-2">
                {group.name}
              </h1>
              <p className="text-[#3A504B] opacity-70">
                {group.description}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-[#8ECDCF] text-white px-3 py-1 rounded-full text-sm">
                {group.category}
              </span>
              <button 
                onClick={() => router.back()}
                className="bg-gray-300 text-[#3A504B] px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {discussions.length === 0 ? (
              <div className="text-center text-[#3A504B] opacity-70 py-8">
                {t('noMessagesYet', { default: 'No messages yet. Be the first to start the conversation!' })}
              </div>
            ) : (
              discussions.map((discussion) => (
                <div key={discussion.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#8ECDCF] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">
                      {discussion.user_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-[#3A504B]">
                        {discussion.user_name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(discussion.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[#3A504B] bg-[#F8F7F2] rounded-lg p-3">
                      {discussion.message}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={t('typeMessage', { default: 'Type your message...' })}
              className="flex-1 px-4 py-3 border border-[#8ECDCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ECDCF]"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting || !newMessage.trim()}
              className="bg-[#8ECDCF] text-white px-6 py-3 rounded-lg hover:bg-[#7BB8BA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('sending', { default: 'Sending...' }) : t('send', { default: 'Send' })}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

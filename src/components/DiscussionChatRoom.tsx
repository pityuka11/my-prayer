'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

interface DiscussionGroup {
  id: number;
  name: string;
  description: string;
  category: string;
  created_at: string;
}

interface Message {
  id: number;
  user_name: string;
  message: string;
  created_at: string;
}

export default function DiscussionChatRoom() {
  const [groups, setGroups] = useState<DiscussionGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<DiscussionGroup | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const t = useTranslations('discussions');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch discussion groups
  const fetchGroups = async () => {
    try {
      const res = await fetch('/api/discussion-groups');
      const data: { groups: DiscussionGroup[] } = await res.json();
      setGroups(data.groups || []);
      if (data.groups && data.groups.length > 0) {
        setSelectedGroup(data.groups[0]); // Select first group by default
      }
    } catch (error) {
      console.error('Failed to fetch discussion groups:', error);
      setGroups([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch messages for selected group
  const fetchMessages = async (groupId: number) => {
    try {
      const res = await fetch(`/api/discussions?groupId=${groupId}`);
      const data: { discussions: Message[] } = await res.json();
      setMessages(data.discussions || []);
    } catch (error) {
      console.error('Failed to fetch discussions:', error);
      setMessages([]);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      fetchMessages(selectedGroup.id);
      // Poll for new messages every 3 seconds
      const interval = setInterval(() => {
        fetchMessages(selectedGroup.id);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedGroup]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedGroup || !userName.trim()) return;

    setIsSending(true);
    try {
      const res = await fetch('/api/discussions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupId: selectedGroup.id,
          userId: null, // Anonymous for now
          userName: userName.trim(),
          message: newMessage.trim(),
        }),
      });

      if (res.ok) {
        setNewMessage('');
        fetchMessages(selectedGroup.id); // Refresh messages
      } else {
        alert(t('sendMessageError', { default: 'Failed to send message.' }));
      }
    } catch (error) {
      alert(t('sendMessageError', { default: 'Error sending message.' }));
    } finally {
      setIsSending(false);
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setShowNameInput(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
        <div className="text-[#3A504B] opacity-70">Loading discussion groups...</div>
      </div>
    );
  }

  if (showNameInput) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-playfair text-[#3A504B] mb-6 text-center">
          {t('enterName', { default: 'Enter Your Name' })}
        </h2>
        <form onSubmit={handleNameSubmit} className="space-y-4">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder={t('yourName', { default: 'Your name' })}
            className="w-full px-4 py-3 border border-[#8ECDCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ECDCF]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#8ECDCF] text-white py-3 rounded-lg font-open-sans font-semibold hover:bg-[#7BB8BA] transition-colors"
          >
            {t('joinChat', { default: 'Join Chat' })}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[#8ECDCF] text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-playfair mb-2">
              {t('communityChat', { default: 'Community Chat' })}
            </h1>
            <p className="text-white/90">
              {t('welcomeMessage', { default: 'Welcome' })} {userName}!
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">
              {t('activeGroup', { default: 'Active Group' })}
            </div>
            <div className="font-semibold">
              {selectedGroup?.name || t('noGroup', { default: 'No Group' })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-96">
        {/* Group Sidebar */}
        <div className="w-1/3 bg-[#F8F7F2] border-r border-gray-200 p-4 overflow-y-auto">
          <h3 className="font-playfair text-lg text-[#3A504B] mb-4">
            {t('discussionGroups', { default: 'Discussion Groups' })}
          </h3>
          <div className="space-y-2">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedGroup?.id === group.id
                    ? 'bg-[#8ECDCF] text-white'
                    : 'bg-white hover:bg-gray-50 text-[#3A504B]'
                }`}
              >
                <div className="font-semibold">{group.name}</div>
                <div className={`text-sm ${
                  selectedGroup?.id === group.id ? 'text-white/80' : 'text-gray-600'
                }`}>
                  {group.category}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                {t('noMessages', { default: 'No messages yet. Be the first to say hello!' })}
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#8ECDCF] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {msg.user_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-baseline space-x-2 mb-1">
                        <span className="font-semibold text-[#3A504B]">{msg.user_name}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(msg.created_at).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={t('typeMessage', { default: 'Type your message...' })}
                className="flex-1 px-4 py-3 border border-[#8ECDCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ECDCF]"
                disabled={isSending}
              />
              <button
                type="submit"
                className="bg-[#8ECDCF] text-white px-6 py-3 rounded-lg hover:bg-[#7BB8BA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSending || !newMessage.trim()}
              >
                {isSending ? t('sending', { default: 'Sending...' }) : t('send', { default: 'Send' })}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

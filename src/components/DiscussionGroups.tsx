'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type DiscussionGroup = {
  id: number;
  name: string;
  description: string;
  category: string;
  created_at: string;
};

export default function DiscussionGroups() {
  const [groups, setGroups] = useState<DiscussionGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('community');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/discussion-groups');
        const data: { groups: DiscussionGroup[] } = await res.json();
        setGroups(data.groups || []);
      } catch (error) {
        console.error('Failed to fetch discussion groups:', error);
        setGroups([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-playfair text-[#3A504B] mb-6">
          {t('discussions')}
        </h2>
        <div className="flex justify-center items-center h-32">
          <div className="text-[#3A504B] opacity-70">Loading discussions...</div>
        </div>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-playfair text-[#3A504B] mb-6">
          {t('discussions')}
        </h2>
        <div className="text-center py-8">
          <div className="text-[#3A504B] opacity-70 mb-4">
            {t('noDiscussionsYet', { default: 'No discussion groups available yet.' })}
          </div>
          <div className="text-sm text-[#3A504B] opacity-60">
            {t('checkBackLater', { default: 'Check back later for new discussion groups!' })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-3xl font-playfair text-[#3A504B] mb-6">
        {t('discussions')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group) => (
          <Link
            key={group.id}
            href={`/discussions/${group.id}`}
            className="block bg-gradient-to-br from-[#F8F7F2] to-[#E8F4F4] rounded-xl p-6 hover:shadow-md transition-shadow border border-[#8ECDCF]/20"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-playfair text-[#3A504B] font-semibold">
                {group.name}
              </h3>
              <span className="bg-[#8ECDCF] text-white px-3 py-1 rounded-full text-sm">
                {group.category}
              </span>
            </div>
            
            <p className="text-[#3A504B] font-open-sans mb-4 opacity-80">
              {group.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#3A504B] opacity-60">
                {new Date(group.created_at).toLocaleDateString()}
              </span>
              <span className="text-[#8ECDCF] font-medium">
                {t('joinDiscussion')} →
              </span>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="bg-[#8ECDCF] text-white px-6 py-3 rounded-lg hover:bg-[#7BB8BA] transition-colors font-medium">
          {t('createNewGroup', { default: 'Create New Group' })}
        </button>
      </div>
    </div>
  );
}

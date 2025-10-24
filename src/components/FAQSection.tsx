'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const t = useTranslations('faq');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      id: 1,
      question: t('faq1Question', { default: 'How do I submit a prayer request?' }),
      answer: t('faq1Answer', { default: 'Simply click on "Submit Prayer Request" and fill out the form with your prayer needs. You can choose to remain anonymous or share your name. Your request will be shared with our community for prayer support.' })
    },
    {
      id: 2,
      question: t('faq2Question', { default: 'Is my personal information kept private?' }),
      answer: t('faq2Answer', { default: 'Yes, we respect your privacy. You can submit prayer requests anonymously, and we never share personal contact information. Only the prayer content you choose to share will be visible to the community.' })
    },
    {
      id: 3,
      question: t('faq3Question', { default: 'How often should I pray for others?' }),
      answer: t('faq3Answer', { default: 'There\'s no set requirement, but we encourage daily prayer for community members. You can pray as often as you feel called to do so. Every prayer makes a difference in someone\'s life.' })
    },
    {
      id: 4,
      question: t('faq4Question', { default: 'Can I join discussion groups?' }),
      answer: t('faq4Answer', { default: 'Absolutely! Our discussion groups are open to all members. You can join groups focused on different topics like Bible study, family faith, young adults, and more. Simply visit the Discussions page to get started.' })
    },
    {
      id: 5,
      question: t('faq5Question', { default: 'What languages are supported?' }),
      answer: t('faq5Answer', { default: 'Our platform supports 12 languages including English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese, Romanian, and Hungarian. You can switch languages at any time.' })
    },
    {
      id: 6,
      question: t('faq6Question', { default: 'How can I get involved in the community?' }),
      answer: t('faq6Answer', { default: 'There are many ways to get involved: submit prayer requests, pray for others, join discussion groups, share biblical messages, and participate in community events. Every interaction helps build our faith community.' })
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-8 md:py-16 bg-[#F8F7F2]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-playfair text-[#3A504B] mb-3 md:mb-4">
            {t('title', { default: 'Frequently Asked Questions' })}
          </h2>
          <p className="text-[#3A504B] font-open-sans text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-4">
            {t('description', { default: 'Find answers to common questions about our prayer community and how to get the most out of your spiritual journey with us.' })}
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-4 md:px-6 py-3 md:py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-playfair text-base md:text-lg text-[#3A504B] pr-2 md:pr-4">
                  {faq.question}
                </h3>
                <div className={`transform transition-transform duration-200 flex-shrink-0 ${
                  openFAQ === faq.id ? 'rotate-180' : ''
                }`}>
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-[#8ECDCF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openFAQ === faq.id && (
                <div className="px-4 md:px-6 pb-3 md:pb-4">
                  <p className="text-gray-700 font-open-sans leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
            <h3 className="text-xl md:text-2xl font-playfair text-[#3A504B] mb-3 md:mb-4">
              {t('contactTitle', { default: 'Still Have Questions?' })}
            </h3>
            <p className="text-[#3A504B] font-open-sans mb-4 md:mb-6 text-sm md:text-base">
              {t('contactDescription', { default: 'We\'re here to help! Contact us if you have any questions or need support.' })}
            </p>
            <a 
              href="mailto:contact@myprayer.online"
              className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-[#8ECDCF] text-white font-semibold rounded-lg hover:bg-[#7BB8BA] transition-colors text-sm md:text-base"
            >
              {t('contactButton', { default: 'Contact Us' })}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

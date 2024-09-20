"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Home() {

  const [searchFAQ, setSearchFAQ] = useState(''); // handles search query given
  const [getAnswer, setGetAnswer] = useState(null); // handles storing the expanded answer
  const searchParams = useSearchParams(); // Uses next navigation to store query upon refresh
  const [allExpanded, setAllExpanded] = useState(false); // Simple checker to see if questions are all expanded or not

  const faqs = [
    { question: 'What is Next.js?', answer: 'Next.js is a React framework for building web applications.' },
    { question: 'How does Tailwind CSS work?', answer: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.' },
    { question: 'What is the purpose of getStaticProps?', answer: 'getStaticProps is used to fetch data at build time in Next.js.' },
  ];

  // Obtains 'q=?' from URL upon instantiation if applicable.
  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchFAQ(query);
  }, [searchParams]);

  // Method is used to handle the persisted search state, by adding query to the URL string as 'q=?'
  const handleSearchState = (e) => {
    const searchquery = e.target.value;
    setSearchFAQ(searchquery);

    const params = new URLSearchParams(searchParams.toString());
    params.set('q', searchquery);

    window.history.replaceState(null, '', `?${params.toString()}`);
  };

  // Searchs for question containing given characters in search
  const faqToLower = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchFAQ.toLowerCase())
  );

  // Will toggle between showing or hiding answers for questions
  const toggleFAQ = (index) => {
    setGetAnswer(getAnswer === index ? null : index);
    if (allExpanded) {
      setAllExpanded(false);
    }
  };


  // Methods below are used to check if questions are expanded or collapsed
  const handleCollapseAll = () => {
    setAllExpanded(false);
  };

  const handleExpandAll = () => {
    setAllExpanded(true);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl text-center font-bold mb-8">Frequently Asked Questions</h1>
        <input
          type="text"
          placeholder="Search commonly asked FAQ questions"
          value={searchFAQ}
          onChange={handleSearchState}
          className="rounded-md w-full mb-6 p-3 text-gray-700"
        />
        
        <div className="flex justify-end mb-6 space-x-4">
          <button
            onClick={handleExpandAll}
            className="text-white px-3 py-2 bg-blue-700 rounded-md"
          >
            Expand All Questions
          </button>
          <button
            onClick={handleCollapseAll}
            className="text-white px-3 py-2 bg-red-700 rounded-md"
          >
            Collapse All Questions
          </button>
        </div>

        <div className="space-y-4">
          {faqToLower.length > 0 ? (
            faqToLower.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md"
              >
                <button
                  onClick={() => {
                    if (allExpanded) {
                      setAllExpanded(false);
                    }
                    toggleFAQ(index);
                  }}
                  className="w-full text-left text-lg text-blue-600"
                >
                  {faq.question}
                </button>
                {(getAnswer === index || allExpanded) && (
                  <p className="mt-2 text-green-700">{faq.answer}</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-white">Questions not found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

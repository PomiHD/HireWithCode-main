import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const GuidePage = () => {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the markdown content
    fetch(
      'https://raw.githubusercontent.com/InfiniteStatesInc/HireWithCode/refs/heads/main/README.md',
    )
      .then((response) => response.text())
      .then((data) => {
        setMarkdown(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching markdown:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="prose prose-lg mx-auto">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
      <div className="mt-8 flex justify-center">
        <Link to="/accept-challenge" className="btn">
          接受挑战
        </Link>
      </div>
    </div>
  );
};

export default GuidePage;

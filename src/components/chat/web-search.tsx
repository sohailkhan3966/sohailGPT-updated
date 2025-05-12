<<<<<<< HEAD
import { useState } from 'react';
import { webSearch } from '@/lib/webSearchService';

export function WebSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const searchResults = await webSearch(query);
      setResults(searchResults);
    } catch (err) {
      setError('Failed to perform web search');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="web-search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query..."
        className="search-input"
      />
      <button onClick={handleSearch} disabled={isLoading} className="search-button">
        {isLoading ? 'Searching...' : 'Search'}
      </button>
      {error && <div className="error-message">{error}</div>}
      <ul className="search-results">
        {results.map((result, index) => (
          <li key={index} className="search-result-item">
            <a href={result.url} target="_blank" rel="noopener noreferrer">
              {result.name}
            </a>
            <p>{result.snippet}</p>
            <button onClick={() => window.open(result.url, '_blank')} className="source-button">
              View Source
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
=======
import { useState } from 'react';
import { webSearch } from '@/lib/webSearchService';

export function WebSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const searchResults = await webSearch(query);
      setResults(searchResults);
    } catch (err) {
      setError('Failed to perform web search');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="web-search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query..."
        className="search-input"
      />
      <button onClick={handleSearch} disabled={isLoading} className="search-button">
        {isLoading ? 'Searching...' : 'Search'}
      </button>
      {error && <div className="error-message">{error}</div>}
      <ul className="search-results">
        {results.map((result, index) => (
          <li key={index} className="search-result-item">
            <a href={result.url} target="_blank" rel="noopener noreferrer">
              {result.name}
            </a>
            <p>{result.snippet}</p>
            <button onClick={() => window.open(result.url, '_blank')} className="source-button">
              View Source
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
>>>>>>> 819db223 (first commit)
} 
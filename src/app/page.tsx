'use client';
import React, { useState } from 'react';
import VectorizeText from '@/actions/embeddings';
import Footer from '@/components/Footer';
const Home = () => {
  const [inputText, setInputText] = useState('');
  const [vectorizedText, setVectorizedText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e: any) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await VectorizeText(inputText);
    console.log(response);

    setVectorizedText(response.data);
    setIsCopied(false);
    setIsLoading(false);
  };

  const handleCopyToClipboard = () => {
    if (vectorizedText) {
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = vectorizedText
        .map((item) => item.embedding)
        .flat()
        .join(', ');
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextArea);

      setIsCopied(true);
    }
  };

  return (
    <div>
      <p className="text-bold text-2xl text-center px-auto py-8">
        Vectorize text with Open AI "text-embedding-ada-002" model
      </p>
      <div className="flex flex-col md:flex-row gap-8 items-center p-16 ">
        <form onSubmit={handleSubmit} className="md:w-1/2 p-4">
          <textarea
            value={inputText}
            onChange={handleInputChange}
            className="overflow-y-auto break-words w-full h-64 md:h-70vh mb-4 p-2 border border-gray-300 rounded "
            placeholder="Enter text to vectorize here"
          />
          <button
            className="w-full md:w-auto bg-green-500 text-white px-4 py-2 rounded"
            type="submit"
          >
            {isLoading ? 'Vectorizing...' : 'Vectorize Text'}
          </button>
        </form>
        <div className="md:w-1/2 p-4 ">
          <div className="md:h-70vh border border-gray-300 rounded p-2 overflow-y-auto h-64">
            {vectorizedText ? (
              <div>
                {vectorizedText.length > 0 ? (
                  <>
                    <p>
                      Embeddings: [{' '}
                      {vectorizedText
                        .map((item) => item.embedding)
                        .flat()
                        .join(', ')}{' '}
                      ]
                    </p>
                  </>
                ) : (
                  <p>No embeddings available</p>
                )}
              </div>
            ) : (
              <p className="text-gray-300">
                {isLoading
                  ? 'Vectorizing text...'
                  : 'Vector embeddings will appear'}
              </p>
            )}
          </div>
          <button
            disabled={!vectorizedText || isCopied || isLoading}
            className={`w-full md:w-auto ${
              vectorizedText ? 'bg-green-700' : 'bg-gray-300'
            } text-white px-4 py-2 rounded mt-3`}
            onClick={handleCopyToClipboard}
          >
            {isCopied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import "./App.css";

// Components
import SurprisePage from "./components/SurprisePage";
import LoadingPage from "./components/LoadingPage";
import CountdownPage from "./components/CountdownPage";
import MessagePage from "./components/MessagePage";
import MemoriesPage from "./components/MemoriesPage";
import ReviewPage from "./components/ReviewPage";
import FinalPage from "./components/FinalPage";
import AboutPage from "./components/AboutPage";

// Hooks
import { useEmail } from "./hooks/useEmail";

// Constants
import { reactionMeanings } from "./constants/emojis";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please refresh the page.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  const [page, setPage] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [reactionEmoji, setReactionEmoji] = useState(null);

  const { sendEmail, isSubmitting, showSuccess, setShowSuccess, errorMessage } = useEmail();

  const handleReactionChange = (emoji) => setReactionEmoji(emoji);

  const handleSubmitReview = async ({ rating, reviewText }) => {
    await sendEmail({
      rating: rating,
      message: reviewText,
      reaction: reactionEmoji ? `${reactionEmoji} ${reactionMeanings[reactionEmoji]}` : 'No reaction',
      to_email: 'rohitbora178@gmail.com',
      name: `Rating: ${rating} stars`,
      time: new Date().toLocaleString()
    });
    setTimeout(() => {
      setShowSuccess(false);
      setPage(5);
    }, 3000);
  };

  useEffect(() => {
    if (page === 1) {
      const timer = setTimeout(() => setPage(1.5), 3000);
      return () => clearTimeout(timer);
    }
  }, [page]);

  useEffect(() => {
    if (page === 1.5 && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (page === 1.5 && countdown === 0) {
      const timer = setTimeout(() => {
        setPage(2);
        setCountdown(3);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [page, countdown]);

  const renderPage = () => {
    switch (page) {
      case 0:
        return <SurprisePage onNext={() => setPage(1)} />;
      case 1:
        return <LoadingPage />;
      case 1.5:
        return <CountdownPage countdown={countdown} />;
      case 2:
        return <MessagePage onNext={() => setPage(3)} onReactionChange={handleReactionChange} reactionEmoji={reactionEmoji} reactionMeanings={reactionMeanings} />;
      case 3:
        return <MemoriesPage onNext={() => setPage(6)} />;
      case 4:
        return <ReviewPage onNext={() => setPage(5)} onSubmit={handleSubmitReview} isSubmitting={isSubmitting} showSuccess={showSuccess} errorMessage={errorMessage} />;
      case 5:
        return <FinalPage onRestart={() => setPage(0)} />;
      case 6:
        return <AboutPage onNext={() => setPage(4)} />;
      default:
        return null;
    }
  };

  return (
    <ErrorBoundary>
      <div className="container">
        {renderPage()}
      </div>
    </ErrorBoundary>
  );
}

export default App;

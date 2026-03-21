import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import FunnelLayout from '../../components/layout/FunnelLayout';
import LandingPage from './LandingPage';
import RatingPage from './RatingPage';
import ActionPage from './ActionPage';
import RedirectPage from './RedirectPage';
import FeedbackPage from './FeedbackPage';
import { useFunnelTracking } from '../../hooks/useFunnelTracking';

const FunnelPage: React.FC = () => {
  const { currentStep } = useSelector((state: RootState) => state.funnel);
  useFunnelTracking();

  const renderStep = () => {
    switch (currentStep) {
      case 'landing':
        return <LandingPage />;
      case 'rating':
        return <RatingPage />;
      case 'action':
        return <ActionPage />;
      case 'redirect':
        return <RedirectPage />;
      case 'feedback':
        return <FeedbackPage />;
      case 'success':
        return (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold">Thank You!</h2>
            <p className="text-slate-500 mt-2">Your review has been submitted.</p>
          </div>
        );
      default:
        return <LandingPage />;
    }
  };

  return <FunnelLayout>{renderStep()}</FunnelLayout>;
};

export default FunnelPage;

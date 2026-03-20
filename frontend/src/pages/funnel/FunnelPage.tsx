import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import FunnelLayout from '../../components/layout/FunnelLayout';
import LandingPage from './LandingPage';
import RatingPage from './RatingPage';

const FunnelPage: React.FC = () => {
  const { currentStep } = useSelector((state: RootState) => state.funnel);

  const renderStep = () => {
    switch (currentStep) {
      case 'landing':
        return <LandingPage />;
      case 'rating':
        return <RatingPage />;
      case 'feedback':
        return (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold">Feedback Step</h2>
            <p className="text-slate-500 mt-2">Coming soon: Smart routing based on rating!</p>
          </div>
        );
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

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setTracking } from '../store/slices/funnelSlice';

export const useFunnelTracking = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const source = params.get('source');
    const campaign = params.get('campaign');

    if (source || campaign) {
      dispatch(setTracking({ source, campaign }));
      console.log(`[Tracking] Funnel visit from ${source || 'direct'} - Campaign: ${campaign || 'none'}`);
    }
  }, [dispatch, location]);

  const trackEvent = (eventName: string, data?: any) => {
    // Mock analytics event tracking
    console.log(`[Analytics] ${eventName}`, data || {});
  };

  return { trackEvent };
};

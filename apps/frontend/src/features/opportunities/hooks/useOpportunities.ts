import { useEffect, useState } from 'react';
import {
  getAllOpportunitiesService,
  getMentorOpportunitiesService,
  type Opportunity,
} from '../services/opportunityService';
import useAuthStore from '../../auth/store/useAuthStore';

interface UseOpportunitiesReturn {
  opportunities: Opportunity[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useOpportunities = (): UseOpportunitiesReturn => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);

  const fetchOpportunities = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let data: Opportunity[];
      if (user.role === 'ROLE_USER') {
        data = await getAllOpportunitiesService();
      } else if (user.role === 'ROLE_MENTOR') {
        data = await getMentorOpportunitiesService();
      } else {
        data = [];
      }

      setOpportunities(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al cargar oportunidades'
      );
      console.error('Error fetching opportunities:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [user?.role]);

  return {
    opportunities,
    loading,
    error,
    refetch: fetchOpportunities,
  };
};

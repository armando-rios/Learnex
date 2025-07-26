import api from '../../../shared/lib/axios';

export interface DashboardCard {
  opportunity: OpportunityCardType[];
}

export interface OpportunityCardType {
  contentType: 'COURSE' | 'CHALLENGES' | 'PROJECTS';
  contentId: number;
  contentPreview: {
    id: number;
    title: string;
    description: string;
    hasCertification: boolean;
    tags: string[];
    difficultyLevel?: string;
    deadline?: string;
  };
}

// ===== API CALLS =====

export async function getMyLearning(): Promise<OpportunityCardType[]> {
  try {
    const response = await api.get('mylearning/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching my profile:', error);
    throw error;
  }
}

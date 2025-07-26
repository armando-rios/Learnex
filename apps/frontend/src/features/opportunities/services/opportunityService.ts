import api from '../../../shared/lib/axios';

// Tipos para las diferentes respuestas de las APIs
export interface Course {
  id: number;
  title: string;
  description: string;
  tags: string[];
  difficultyLevel: string;
  hasCertification: boolean;
  // Agrega más campos según la respuesta real de la API
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  difficultyLevel: string;
  // Agrega más campos según la respuesta real de la API
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  tags: string[];
  difficultyLevel: string;
  // Agrega más campos según la respuesta real de la API
}

export interface Opportunity {
  id: number;
  title: string;
  description: string;
  tags: string[];
  difficultyLevel: string;
  hasCertification?: boolean;
  type: 'Curso' | 'Proyecto' | 'Desafío' | 'Oportunidad';
}

// Tipos para crear nuevas oportunidades
export interface CreateCourseData {
  id?: number;
  title: string;
  description: string;
  hasCertification: boolean;
  tagsName: string[];
}

export interface CreateChallengeData {
  title: string;
  description: string;
  difficultyLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  deadline: string; // formato YYYY-MM-DD
  tagsName: string[];
}

export interface CreateProjectData {
  title: string;
  description: string;
  difficultyLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  tagsName: string[];
}

// Tipo para la inscripción
export interface EnrollmentData {
  contentType: 'COURSE' | 'CHALLENGE' | 'PROJECT';
}

// Servicio para inscribirse a una oportunidad
export async function enrollInOpportunityService(
  opportunityId: number | string,
  contentType: 'COURSE' | 'CHALLENGE' | 'PROJECT'
): Promise<{ message: string }> {
  try {
    const enrollmentData: EnrollmentData = {
      contentType,
    };

    const response = await api.post(
      `/mylearning/${opportunityId}/enroll`,
      enrollmentData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error enrolling in opportunity:', error);
    throw error;
  }
}

// Servicio para obtener cursos
export async function getCoursesService(): Promise<Course[]> {
  try {
    const response = await api.get('/courses', {
      headers: {
        // token
        Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
}

// Servicio para obtener proyectos
export async function getProjectsService(): Promise<Project[]> {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Retornar array vacío en caso de error por ahora
    return [];
  }
}

// Servicio para obtener desafíos
export async function getChallengesService(): Promise<Challenge[]> {
  try {
    const response = await api.get('/challenges');
    return response.data;
  } catch (error) {
    console.error('Error fetching challenges:', error);
    // Retornar array vacío en caso de error por ahora
    return [];
  }
}

// Servicio principal que combina todas las oportunidades para ROLE_USER
export async function getAllOpportunitiesService(): Promise<Opportunity[]> {
  try {
    const [courses, projects, challenges] = await Promise.all([
      getCoursesService(),
      getProjectsService(),
      getChallengesService(),
    ]);

    const opportunities: Opportunity[] = [
      ...courses.map(
        (course): Opportunity => ({
          ...course,
          type: 'Curso' as const,
        })
      ),
      ...projects.map(
        (project): Opportunity => ({
          ...project,
          type: 'Proyecto' as const,
          hasCertification: false,
        })
      ),
      ...challenges.map(
        (challenge): Opportunity => ({
          ...challenge,
          type: 'Desafío' as const,
          hasCertification: false,
        })
      ),
    ];

    return opportunities;
  } catch (error) {
    console.error('Error fetching all opportunities:', error);
    throw error;
  }
}

// Servicio para obtener oportunidades de mentor (placeholder)
export async function getMentorOpportunitiesService(): Promise<Opportunity[]> {
  // Esta función podría hacer una petición a una API específica para mentores
  // Por ahora retorna datos de ejemplo
  return [
    {
      id: 1,
      title: 'Mentoría en Desarrollo Web',
      description: 'Ofrece tu experiencia en desarrollo web a estudiantes',
      tags: ['Mentoría', 'Desarrollo Web', 'Frontend'],
      difficultyLevel: 'Intermedio',
      hasCertification: true,
      type: 'Oportunidad',
    },
  ];
}

// Servicios para crear nuevas oportunidades
export async function createCourseService(
  courseData: CreateCourseData
): Promise<Course> {
  try {
    const response = await api.post('/courses/mentor', courseData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
}

export async function createChallengeService(
  challengeData: CreateChallengeData
): Promise<Challenge> {
  try {
    const response = await api.post('/challenge/mentor', challengeData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating challenge:', error);
    throw error;
  }
}

export async function createProjectService(
  projectData: CreateProjectData
): Promise<Project> {
  try {
    const response = await api.post('/projects/mentor', projectData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

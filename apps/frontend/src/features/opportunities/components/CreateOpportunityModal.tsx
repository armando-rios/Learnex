import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import {
  createCourseService,
  createChallengeService,
  createProjectService,
  type CreateCourseData,
  type CreateChallengeData,
  type CreateProjectData,
} from '../services/opportunityService';

interface CreateOpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type OpportunityType = 'course' | 'challenge' | 'project';
type DifficultyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

const CreateOpportunityModal: React.FC<CreateOpportunityModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [opportunityType, setOpportunityType] =
    useState<OpportunityType>('course');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para los formularios
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>(['']);
  const [difficultyLevel, setDifficultyLevel] =
    useState<DifficultyLevel>('BEGINNER');
  const [hasCertification, setHasCertification] = useState(false);
  const [deadline, setDeadline] = useState('');

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTags(['']);
    setDifficultyLevel('BEGINNER');
    setHasCertification(false);
    setDeadline('');
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const addTag = () => {
    setTags([...tags, '']);
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const updateTag = (index: number, value: string) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const validateForm = () => {
    if (!title.trim()) return 'El título es requerido';
    if (!description.trim()) return 'La descripción es requerida';
    const validTags = tags.filter((tag) => tag.trim());
    if (validTags.length === 0) return 'Al menos un tag es requerido';
    if (opportunityType === 'challenge' && !deadline)
      return 'La fecha límite es requerida';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const validTags = tags.filter((tag) => tag.trim());

      switch (opportunityType) {
        case 'course': {
          const courseData: CreateCourseData = {
            title,
            description,
            hasCertification,
            tagsName: validTags,
          };
          await createCourseService(courseData);
          break;
        }
        case 'challenge': {
          const challengeData: CreateChallengeData = {
            title,
            description,
            difficultyLevel,
            deadline,
            tagsName: validTags,
          };
          await createChallengeService(challengeData);
          break;
        }
        case 'project': {
          const projectData: CreateProjectData = {
            title,
            description,
            difficultyLevel,
            tagsName: validTags,
          };
          await createProjectService(projectData);
          break;
        }
      }

      onSuccess();
      handleClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al crear la oportunidad'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Crear Nueva Oportunidad
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* Tipo de oportunidad */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Oportunidad
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setOpportunityType('course')}
                className={`px-4 py-2 rounded-lg border ${
                  opportunityType === 'course'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Curso
              </button>
              <button
                type="button"
                onClick={() => setOpportunityType('challenge')}
                className={`px-4 py-2 rounded-lg border ${
                  opportunityType === 'challenge'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Desafío
              </button>
              <button
                type="button"
                onClick={() => setOpportunityType('project')}
                className={`px-4 py-2 rounded-lg border ${
                  opportunityType === 'project'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Proyecto
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Título */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-theme-text-dark w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ingresa el título"
              />
            </div>

            {/* Descripción */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="text-theme-text-dark w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Describe la oportunidad"
              />
            </div>

            {/* Nivel de dificultad (para challenges y projects) */}
            {(opportunityType === 'challenge' ||
              opportunityType === 'project') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nivel de Dificultad *
                </label>
                <select
                  value={difficultyLevel}
                  onChange={(e) =>
                    setDifficultyLevel(e.target.value as DifficultyLevel)
                  }
                  className="text-theme-text-dark w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="BEGINNER">Principiante</option>
                  <option value="INTERMEDIATE">Intermedio</option>
                  <option value="ADVANCED">Avanzado</option>
                </select>
              </div>
            )}

            {/* Certificación (solo para courses) */}
            {opportunityType === 'course' && (
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={hasCertification}
                    onChange={(e) => setHasCertification(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Tiene certificación
                  </span>
                </label>
              </div>
            )}

            {/* Fecha límite (solo para challenges) */}
            {opportunityType === 'challenge' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha Límite *
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="text-theme-text-dark w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            )}

            {/* Tags */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags *
              </label>
              {tags.map((tag, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => updateTag(index, e.target.value)}
                    className="text-theme-text-dark flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Ingresa un tag"
                  />
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    disabled={tags.length === 1}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addTag}
                className="flex items-center gap-2 text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg"
              >
                <Plus size={16} />
                Agregar tag
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Botones */}
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Creando...' : 'Crear Oportunidad'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOpportunityModal;

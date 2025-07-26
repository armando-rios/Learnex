import { ButtonPrimary } from './Button';

const OpportunityCard = ({
  id,
  type,
  title,
  description,
  tagsName,
  difficultyLevel,
  deadline,
  hasCertification,
  image = 'https://images4.alphacoders.com/136/thumb-1920-1369866.png',
  buttonTitle,
  onClick,
}: {
  id: number;
  type: string;
  title: string;
  description?: string;
  tagsName: string[];
  difficultyLevel?: string;
  deadline?: string;
  hasCertification?: boolean;
  image?: string;
  buttonTitle?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      key={id}
      className="flex flex-col gap-4 p-4 border border-black w-80 rounded-xl h-90 justify-between"
    >
      <div className="flex gap-2 items-start w-full">
        <img
          src={image}
          alt="hola"
          className="border-2 border-black w-28 h-28 rounded-lg"
        />
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col">
            <p className="text-rose-400 font-extrabold text-md">{type}</p>
            <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          </div>
          {difficultyLevel && (
            <p className="text-sm text-gray-500 px-2 py-1 bg-amber-400 w-fit rounded-lg">
              {difficultyLevel}
            </p>
          )}
        </div>
      </div>
      {/* tags */}
      <div className="flex gap-2">
        {tagsName.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-300 text-gray-800 px-2 py-1 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
      {/* Descipcion */}
      <div className="flex flex-col gap-1">
        {hasCertification && (
          <p className="text-sm text-green-600">
            Este curso incluye certificación al finalizar
          </p>
        )}
        <div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        {deadline && (
          <p className="text-sm text-gray-500">
            Fecha límite: {new Date(deadline).toLocaleDateString()}
          </p>
        )}
      </div>
      {/* boton gestionar */}
      {buttonTitle && <ButtonPrimary title={buttonTitle} onClick={onClick} />}
    </div>
  );
};

export default OpportunityCard;

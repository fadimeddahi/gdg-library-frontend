const FOLDER_COLORS = {
  blue: 'bg-blue-500 hover:bg-blue-600',
  yellow: 'bg-yellow-500 hover:bg-yellow-600',
  green: 'bg-green-500 hover:bg-green-600',
  red: 'bg-red-500 hover:bg-red-600',
};

export const FolderCard = ({ 
  name, 
  resourceCount = 0, 
  color = 'blue',
  onClick 
}) => {
  const colorClass = FOLDER_COLORS[color] || FOLDER_COLORS.blue;

  return (
    <div 
      className="cursor-pointer transition-all hover:shadow-2xl group"
      style={{
        width: '390px',
        height: '270px',
      }}
      onClick={onClick}
    >
      {/* Folder Shape */}
      <div className="relative h-full">
        {/* Folder Tab */}
        <div className={`absolute top-0 left-0 w-32 h-10 ${colorClass} rounded-t-lg transition-colors`}></div>
        
        {/* Main Folder Body */}
        <div className={`absolute top-8 left-0 right-0 bottom-0 ${colorClass} rounded-tr-lg rounded-b-lg shadow-lg transition-all flex flex-col items-center justify-center p-8`}>
          <h3 className="text-2xl font-semibold text-white">{name}</h3>
          <p className="text-sm text-white/90 mt-2">
            {resourceCount} {resourceCount === 1 ? 'resource' : 'resources'}
          </p>
        </div>
      </div>
    </div>
  );
};

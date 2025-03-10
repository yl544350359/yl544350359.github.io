import React, {FC} from 'react';

export interface PanelProps {
    stats: {
        total: Map<number, number>,
        collectedCount: Map<number, number>
    },
    isOpen: boolean
    toggleOpen: () => void
}
const InfoPanel: FC<PanelProps> = ({ stats, isOpen, toggleOpen }) => {
  if (!isOpen) {
    return (
      <button 
        onClick={toggleOpen}
        className="bg-blue-500 text-white p-2 rounded-l"
      >
        展开
      </button>
    );
  }

  return (
    <div className="bg-white p-4 shadow-lg w-64">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">物资统计</h2>
        <button 
          onClick={toggleOpen}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      {[1, 2, 3, 4, 5, 6, 7].map(level => (
        <div key={level} className="mb-2">
          <div className="flex justify-between">
            <span>等级 {level}:</span>
            <span>
              {stats.collectedCount.get(level) || 0} / {stats.total.get(level) || 0}
            </span>
          </div>
          <div className="h-1 bg-gray-200 rounded">
            <div 
              className="h-full bg-blue-500 rounded"
              style={{ width: `${(stats.collectedCount.get(level)! / stats.total.get(level)!) * 100 || 0}%` }}
            />
          </div>
        </div>
      ))}

      <a
        href="https://your-google-form-link"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block w-full bg-green-500 text-white text-center py-2 rounded hover:bg-green-600"
      >
        报告新坐标
      </a>
    </div>
  );
};

export default InfoPanel;
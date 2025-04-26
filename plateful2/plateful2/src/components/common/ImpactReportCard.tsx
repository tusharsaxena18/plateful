import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Utensils } from 'lucide-react';
import { ImpactReport } from '../../types';

interface ImpactReportCardProps {
  report: ImpactReport;
}

const ImpactReportCard: React.FC<ImpactReportCardProps> = ({ report }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card hover:shadow-lg transition-shadow overflow-hidden"
    >
      {report.imageUrls.length > 0 && (
        <div className="h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
          <img
            src={report.imageUrls[0]}
            alt={report.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-3">{report.title}</h3>
      
      <p className="text-gray-600 mb-4 line-clamp-3">{report.description}</p>
      
      <div className="flex flex-col space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Utensils size={16} className="mr-2 text-primary-500" />
          <span>Meals served: {report.mealsServed}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Users size={16} className="mr-2 text-primary-500" />
          <span>People impacted: {report.peopleImpacted}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-2 text-primary-500" />
          <span>Date: {formatDate(report.createdAt)}</span>
        </div>
      </div>
      
      {report.imageUrls.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {report.imageUrls.slice(1).map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Impact photo ${index + 2}`}
              className="h-16 w-16 object-cover rounded"
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ImpactReportCard;
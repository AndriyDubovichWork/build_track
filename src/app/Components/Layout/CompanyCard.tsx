import { Company } from '@/app/types';

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <a href={`/rooms?companyId=${company.id}`}>
      <div className='bg-white p-6 rounded-xl shadow-md border border-gray-200'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-bold text-orange-500'>{company.name}</h2>
          <span className='text-sm text-gray-500'>ID: {company.id}</span>
        </div>
        <p className='text-gray-600 mt-2'>
          Телефон: {company.telephone_number}
        </p>
        <p className='text-gray-600'>Унікальний ID: {company.unique_id}</p>
      </div>
    </a>
  );
};

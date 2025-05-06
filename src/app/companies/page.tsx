'use client';
import { useEffect, useState } from 'react';
import companiesList from '../APIRequests/companiesList';
import { NavButtons } from '../Components/Layout/NavButtons';
import { CompanyCard } from '../Components/Layout/CompanyCard';
import CompanyCardSkeleton from '../Components/SkeletonLoaders/CompanyCardSkeleton';

interface Company {
  id: number;
  name: string;
  telephone_number: string;
  unique_id: string;
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    companiesList()
      .then(({ data }) => {
        setCompanies(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <NavButtons activeTab='companies' />
      <h1 className='text-3xl font-bold text-gray-800 mb-6'>Companies List:</h1>

      {isLoading ? (
        <div className='space-y-4'>
          {[...Array(3)].map((_, index) => (
            <CompanyCardSkeleton key={index} />
          ))}
        </div>
      ) : companies.length === 0 ? (
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>
          No companies found
        </h1>
      ) : (
        <div className='space-y-4'>
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </>
  );
}

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { departmentService } from '../services/departmentService';
import { LandingNav } from '../components/landing/LandingNav';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { SearchSection } from '../components/landing/SearchSection';
import { DepartmentGrid } from '../components/landing/DepartmentGrid';
import { CTASection } from '../components/landing/CTASection';
import { Footer } from '../components/landing/Footer';

export const LandingPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const data = await departmentService.getAllDepartments();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
      toast.error('Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <LandingNav />
      <HeroSection />
      <FeaturesSection />
      <SearchSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <DepartmentGrid departments={filteredDepartments} loading={loading} />
      <CTASection />
      <Footer departments={departments} />
    </div>
  );
};

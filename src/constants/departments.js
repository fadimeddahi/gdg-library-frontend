// Department navigation routes for GDG Resource Hub
export const DEPARTMENTS = [
  { id: 'design', name: 'Design' },
  { id: 'dev', name: 'Development' },
  { id: 'comm', name: 'Communication' },
  { id: 'hr', name: 'Human Resources' },
  { id: 'logistics', name: 'Logistics' },
  { id: 'multimedia', name: 'Multimedia' },
  { id: 'external', name: 'External Relations' },
];

// Helper to get department by id
export const getDepartmentById = (id) => {
  return DEPARTMENTS.find(dept => dept.id === id);
};

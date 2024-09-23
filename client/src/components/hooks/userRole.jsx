import { useState, useEffect } from 'react';

const userRole = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('Users'));
    if (storedUser) {
      setUser(storedUser);
      setRole(storedUser.role);
    } else {
      setUser(null);
      setRole(null);
    }
    setLoading(false);
  }, []);

  return { user, role, loading, setUser };
};

export default userRole;

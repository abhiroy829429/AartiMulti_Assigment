const tryLogin = () => {
    try {
        const endpoint = isRegister ? '/register' : '/login';
        const body = isRegister ? { name, email, password } : { email, password };
        const res = await fetch(`${API_URL}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Error');
        if (isRegister) {
          setSuccess('Registration successful! You can now log in.');
          setIsRegister(false);
        } else {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));
          setSuccess('Login successful!');
          window.location.href = '/';
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
}
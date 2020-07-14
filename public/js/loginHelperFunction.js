import { handleErrors, api } from './utils.js';

export const handleLogin = async (body, authorization) => {
  try {
    const res = await fetch(`${api}${authorization}s/token`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw res;
    }
    const {
      token,
      role,
      user: { id },
      name,
    } = await res.json();
    // storage access_token in localStorage:
    localStorage.setItem('PAWS_AND_CLAWS_ACCESS_TOKEN', token);
    localStorage.setItem('PAWS_AND_CLAWS_CURRENT_USER_ID', id);
    localStorage.setItem('PAWS_AND_CLAWS_ROLE', role);
    localStorage.setItem('PAWS_AND_CLAWS_NAME', name);

    window.location.href = `/${authorization}-profile`;
  } catch (err) {
    handleErrors(err);
  }
};


export function getAuthHeader() {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      return null;
    }
  
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(accessToken)}`
    };
  }
  
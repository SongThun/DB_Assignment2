const loginAlert = () => {
  if (!sessionStorage.getItem('username')) {
    alert('Please login.')
    window.location.href = '/login';
  }
};

export default loginAlert;
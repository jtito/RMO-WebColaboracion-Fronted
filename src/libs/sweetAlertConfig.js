import Swal from 'sweetalert2';

const themeConfigs = {
  light: {
    background: '#fff',
    iconColor: '#000',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
  },
  dark: {
    background: '#333',
    iconColor: '#fff',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
  },
  system: (isDarkMode) => ({
    background: isDarkMode ? '#333' : '#fff',
    iconColor: isDarkMode ? '#fff' : '#000',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
  }),
};

const getSweetAlertConfig = (theme, isSystemDark) => {
  if (theme === 'system') {
    return themeConfigs.system(isSystemDark);
  }
	
  return themeConfigs[theme];
};

export const showAlert = (options, theme, isSystemDark) => {
  const config = getSweetAlertConfig(theme, isSystemDark);

  Swal.fire({
    ...config,
    ...options,
  });
};

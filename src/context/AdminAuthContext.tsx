import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ADMIN_STORAGE_KEYS = {
  IS_LOGGED_IN: 'osis_spensa_admin_logged_in',
  PASSWORD_HASH: 'osis_spensa_admin_secret_pin',
  SESSION_EXPIRY: 'osis_spensa_admin_session_expiry'
} as const;

// Default admin password for OSIS Spensa
const DEFAULT_ADMIN_PASSWORD = 'admin123';

interface AdminAuthContextValue {
  isAdmin: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (passwordInput: string) => { success: boolean; message: string };
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => { success: boolean; message: string };
  isUsingDefaultPassword: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      // Check session storage first, then local storage with expiry check
      const sessionActive = sessionStorage.getItem(ADMIN_STORAGE_KEYS.IS_LOGGED_IN);
      if (sessionActive === 'true') return true;

      const localActive = localStorage.getItem(ADMIN_STORAGE_KEYS.IS_LOGGED_IN);
      const expiry = localStorage.getItem(ADMIN_STORAGE_KEYS.SESSION_EXPIRY);
      if (localActive === 'true' && expiry) {
        if (Date.now() < parseInt(expiry, 10)) {
          return true;
        } else {
          // expired
          localStorage.removeItem(ADMIN_STORAGE_KEYS.IS_LOGGED_IN);
          localStorage.removeItem(ADMIN_STORAGE_KEYS.SESSION_EXPIRY);
        }
      }
    } catch {
      // ignore
    }
    return false;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isUsingDefaultPassword, setIsUsingDefaultPassword] = useState<boolean>(() => {
    try {
      return !localStorage.getItem(ADMIN_STORAGE_KEYS.PASSWORD_HASH);
    } catch {
      return true;
    }
  });

  const openLoginModal = useCallback(() => setIsLoginModalOpen(true), []);
  const closeLoginModal = useCallback(() => setIsLoginModalOpen(false), []);

  const getStoredPassword = (): string => {
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEYS.PASSWORD_HASH);
      return stored || DEFAULT_ADMIN_PASSWORD;
    } catch {
      return DEFAULT_ADMIN_PASSWORD;
    }
  };

  const login = (passwordInput: string): { success: boolean; message: string } => {
    const validPassword = getStoredPassword();
    if (passwordInput.trim() === validPassword) {
      setIsAdmin(true);
      try {
        sessionStorage.setItem(ADMIN_STORAGE_KEYS.IS_LOGGED_IN, 'true');
        // Persist for 7 days
        const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
        localStorage.setItem(ADMIN_STORAGE_KEYS.IS_LOGGED_IN, 'true');
        localStorage.setItem(ADMIN_STORAGE_KEYS.SESSION_EXPIRY, (Date.now() + sevenDaysMs).toString());
      } catch (e) {
        console.error('Session write error:', e);
      }
      setIsLoginModalOpen(false);
      return { success: true, message: 'Autentikasi Administrator Berhasil!' };
    } else {
      return {
        success: false,
        message: 'Kata sandi / PIN yang Anda masukkan salah. Silakan coba lagi.'
      };
    }
  };

  const logout = () => {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem(ADMIN_STORAGE_KEYS.IS_LOGGED_IN);
      localStorage.removeItem(ADMIN_STORAGE_KEYS.IS_LOGGED_IN);
      localStorage.removeItem(ADMIN_STORAGE_KEYS.SESSION_EXPIRY);
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const changePassword = (oldPass: string, newPass: string): { success: boolean; message: string } => {
    const currentPass = getStoredPassword();
    if (oldPass.trim() !== currentPass) {
      return { success: false, message: 'Kata sandi lama yang Anda masukkan tidak sesuai.' };
    }
    if (newPass.trim().length < 5) {
      return { success: false, message: 'Kata sandi baru minimal harus 5 karakter.' };
    }

    try {
      localStorage.setItem(ADMIN_STORAGE_KEYS.PASSWORD_HASH, newPass.trim());
      setIsUsingDefaultPassword(false);
      return { success: true, message: 'Kata sandi administrator berhasil diperbarui!' };
    } catch {
      return { success: false, message: 'Gagal menyimpan kata sandi baru ke penyimpanan lokal.' };
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAdmin,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        logout,
        changePassword,
        isUsingDefaultPassword
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextValue => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

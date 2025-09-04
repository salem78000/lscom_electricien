import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, Shield, AlertTriangle, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginAttempts, isBlocked, blockTimeRemaining } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (isBlocked) {
      setError(`Compte bloqué. Réessayez dans ${Math.ceil(blockTimeRemaining / 60)} minutes.`);
      return;
    }
    
    setIsLoading(true);

    const success = await login(username, password);
    
    if (!success) {
      if (isBlocked) {
        setError(`Trop de tentatives. Compte bloqué pour 15 minutes.`);
      } else {
        const remaining = 3 - loginAttempts - 1;
        setError(`Identifiants incorrects. ${remaining > 0 ? `${remaining} tentative(s) restante(s)` : 'Compte bloqué'}`);
      }
    }
    
    setIsLoading(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
            isBlocked ? 'bg-red-600' : 'bg-blue-600'
          }`}>
            {isBlocked ? (
              <Shield className="h-8 w-8 text-white" />
            ) : (
              <Lock className="h-8 w-8 text-white" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isBlocked ? 'Accès Bloqué' : 'Administration Sécurisée'}
          </h2>
          <p className="mt-2 text-gray-600">
            {isBlocked 
              ? 'Trop de tentatives de connexion détectées' 
              : 'Connectez-vous pour accéder au dashboard'
            }
          </p>
        </div>

        {/* Blocage actif */}
        {isBlocked && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="font-medium text-red-800">Compte temporairement bloqué</h3>
                <p className="text-red-700 text-sm mt-1">
                  Déblocage automatique dans : <span className="font-mono font-bold">{formatTime(blockTimeRemaining)}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Avertissement tentatives */}
        {!isBlocked && loginAttempts > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <p className="text-orange-800 text-sm">
                <strong>{loginAttempts}/3</strong> tentatives utilisées. 
                Blocage automatique après 3 échecs.
              </p>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Nom d'utilisateur
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  disabled={isBlocked}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Entrez votre nom d'utilisateur"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={isBlocked}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Entrez votre mot de passe"
                />
                <button
                  type="button"
                  disabled={isBlocked}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:cursor-not-allowed"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || isBlocked}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Vérification...</span>
              </div>
            ) : isBlocked ? (
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Bloqué ({formatTime(blockTimeRemaining)})</span>
              </div>
            ) : (
              'Se connecter'
            )}
          </button>

          {/* Informations de sécurité */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Sécurité renforcée</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Maximum 3 tentatives de connexion</li>
                  <li>• Blocage automatique de 15 minutes</li>
                  <li>• Session expirée après 24h</li>
                  <li>• Logs de sécurité activés</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Aide connexion (uniquement en dev) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-800 text-sm font-medium mb-2">Mode développement :</p>
              <p className="text-gray-700 text-sm">
                <strong>admin</strong> / <strong>lscom2025!</strong><br />
                <strong>lscom</strong> / <strong>hello</strong>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
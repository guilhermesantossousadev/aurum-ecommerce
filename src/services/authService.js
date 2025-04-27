const API_BASE_URL = 'https://localhost:7081/api';

export const requestPasswordReset = async (email) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/Suport/RequestToken?email=${email}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            }
        );

        if (!response.ok) {
            throw new Error('Erro ao solicitar redefinição de senha');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Erro ao solicitar redefinição de senha');
    }
};

export const authenticateToken = async (token) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/Suport/AuthenticateToken?codigoToken=${token}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );

        if (!response.ok) {
            throw new Error('Erro ao autenticar token');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Erro ao autenticar token');
    }
};

export const resetPassword = async (email, password) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/Usuario/ResetPassword?email=${email}&password=${password}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            }
        );

        if (!response.ok) {
            throw new Error('Erro ao redefinir senha');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Erro ao redefinir senha');
    }
}; 
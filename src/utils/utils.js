const parseJWT = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        
        const binaryString = window.atob(base64);
        
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        
        const decoder = new TextDecoder('utf-8');
        const jsonPayload = decoder.decode(bytes);
        
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error during parsing JWT:", error);
        return null;
    }
}

export const getUsernameFromJWT = () => {
    const token = localStorage.getItem("token");
    const parsedJWT = parseJWT(token);
    return parsedJWT.userName;
}

export const checkAuth = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return false;
    }

    if (isTokenExpired(token))  {
        localStorage.removeItem("token");
        return false;
    }

    return true;
}

export const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const { exp } = JSON.parse(jsonPayload);

        const currentTime = Math.floor(Date.now() / 1000);

        return exp < currentTime;
    } catch (error) {
        console.error("Error during token check:", error);
        return true;
    }
}

export const formatDate = (dateValue) => {
    if (dateValue === null) {
        return "-"
    };

    const date = new Date(dateValue);

    const formatter = new Intl.DateTimeFormat('en-EN', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
    });

    return formatter.format(date);
}
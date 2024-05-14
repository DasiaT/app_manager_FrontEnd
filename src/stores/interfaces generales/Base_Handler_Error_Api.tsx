import { BaseApiErrorResponse } from "./Base_API_Error_Response";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Handler_error_api(errorRegister: any): string[] {

    const errorResponse: string[] = [];

    if (errorRegister && 'data' in errorRegister && Array.isArray(errorRegister.data) && errorRegister.data.length > 0) {

        errorRegister.data.map((result: BaseApiErrorResponse) => {
            errorResponse.push(result.message);
        });

    }
    else if (errorRegister.data.error_code === 403) {
        localStorage.removeItem('loginData');
        window.location.href = '/'; 
    }
    else {
        errorResponse.push('Hubo un error al realizar la solicitud. Por favor, contacte con el soporte técnico.');
    }

    
    return errorResponse;
}
export class ResponseMessage{
    static readonly ENTITY_NOT_FOUND: string ='Entity not found';
    static readonly DUPLICATE_ENTITY: string = 'Entity already exists';
    static readonly ENTITY_CREATED: string = 'Entity created';
    static readonly LOGIN_FAILED: string = 'Invalid credentials';
    static readonly LOGIN_SUCCESS: string = 'Login successful';
    static readonly ACCESS_DENIED: string = 'Access denied! Unauthorized user. Please login to continue';
    static readonly INVALID_TOKEN: string = 'Token is invalid';
}
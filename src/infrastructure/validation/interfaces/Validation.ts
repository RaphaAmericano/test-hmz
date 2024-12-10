export interface ValidationResult { 
    success: boolean;
    error?: Error | string | null;
    data?: any;
}
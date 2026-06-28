export const DB_NAME="Ayursutra"



export const UserRoles = {
  PATIENT: "patient",
  PRACTITIONER: "practitioner", 
  ADMIN: "admin"
};



export const AuditActions = {
  CREATE: "create",
  READ: "read",
  UPDATE: "update", 
  DELETE: "delete",
  LOGIN: "login",
  LOGOUT: "logout",
  PASSWORD_CHANGE: "password_change",
  RESCHEDULE: "reschedule",
  CANCEL: "cancel"
};

export const TherapyTypes = {
  ABHYANGA: "Abhyanga",
  SHIRODHARA: "Shirodhara",
  PIZHICHIL: "Pizhichil",
  NASYA: "Nasya",
  BASTI: "Basti",
  VAMANA: "Vamana",
  VIRECHANA: "Virechana",
  RAKTAMOKSHANA: "Raktamokshana"
};

export const Gender = {
  MALE: "male",
  FEMALE: "female", 
  OTHER: "other"
};

export const Severity = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high"
};

export const ProficiencyLevel = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate", 
  ADVANCED: "advanced"
};
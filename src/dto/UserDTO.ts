import { Role } from "../entities/Role";

// Request DTO
export class RegisterUserRequestDTO {
  name: string;
  email: string;
  password: string;
  role?: number;
}

export class LoginUserRequestDTO {
  email: string;
  password: string;
}

export class UpdateUserRequestDTO {
  name?: string;
  email?: string;
  password?: string;
  role?: number;
}

// Response DTO
export class UserResponseDTO {
  id: number;
  name: string;
  email: string;
  role: Role;
}

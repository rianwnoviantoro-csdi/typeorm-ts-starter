// Request DTO
export class CreateRoleRequestDTO {
  name: string;
}

export class UpdateRoleRequestDTO {
  name?: string;
}

// Response DTO
export class RoleResponseDTO {
  id: number;
  name: string;
}

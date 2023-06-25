// Request DTO
export class CreateRoleRequestDTO {
  name: string;
  permission?: number[];
}

export class UpdateRoleRequestDTO {
  name?: string;
  permission?: number[];
}

// Response DTO
export class RoleResponseDTO {
  id: number;
  name: string;
  permission?: number[];
}

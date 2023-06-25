// Request DTO
export class CreatePermissionRequestDTO {
  name: string;
}

export class UpdatePermissionRequestDTO {
  name?: string;
}

// Response DTO
export class PermissionResponseDTO {
  id: number;
  name: string;
}

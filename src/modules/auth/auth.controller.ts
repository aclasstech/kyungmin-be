import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
}

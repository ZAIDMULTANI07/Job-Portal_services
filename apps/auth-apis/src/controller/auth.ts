import { RestController, Request, Response } from '@libs/boat';
import { Controller, Post, Req, Res } from '@nestjs/common';
import { AuthApisService } from '../service/auth';
import { UserTransformer } from '@libs/common';

@Controller('/auth')
export class AuthApisController extends RestController {
  constructor(
    private authService: AuthApisService) {
    super();
  }

  @Post('/signup')
  async signUp(
    @Req() req: Request, 
    @Res() res: Response)
  : Promise<Response> {
    const user = await this.authService.signup(req.all());
    return res.success(
      await this.transform(user, new UserTransformer(), { req }),
    );
  }

  @Post('/login')
  async login(
    @Req() req: Request, 
    @Res() res: Response)
  : Promise<Response> {
    const user = await this.authService.login(req.all());
    return res.success(
      await this.transform(user, new UserTransformer(), { req }),
    );
  }

  @Post('/forgot-password')
  async forgot(
    @Req() req: Request, 
    @Res() res: Response)
  : Promise<Response> {
    const user = await this.authService.forgot(req.all());
    return res.noContent();
  }

  @Post('/reset-password')
  async reset(
    @Req() req: Request, 
    @Res() res: Response)
  : Promise<Response> {
    const user = await this.authService.reset(req.all(), req.user);
    return res.noContent();
  }

  @Post('/admin/login')
  async adminLogin(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.authService.adminLogin(req.all());
    return res.success(
      await this.transform(user, new UserTransformer(), { req }),
    );
  }
}

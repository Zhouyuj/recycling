/**
 * Created by wujiahui on 2018/12/19.
 */

import { JwtHelperService } from '@auth0/angular-jwt';

export class JwtUtils {
    static helper = new JwtHelperService();

    public static decode(token: string) {
        const decodedToken = JwtUtils.helper.decodeToken(token);
        return decodedToken;
    }
}

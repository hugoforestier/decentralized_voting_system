import cookieParser from "cookie-parser";
import { User_info } from "models/user.model";
import passport from "passport";
import passportJWT from "passport-jwt";
import LocalStrategy from "passport-local";
import KEYS from "../../config/keys";
import UserService from "../../services/user.service";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default function passportInit(app: any): void {
    app.use(cookieParser());

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(
        new LocalStrategy.Strategy(
            {
                usernameField: "username",
                passwordField: "password",
                session: false,
            },
            (username, password, done) => {
                UserService.findUserByUsername(username).then((User) => {
                    if (!User) {
                        return done(null, false);
                    }

                    if (!User.password) {
                        return done(null, false);
                    }

                    const isValid = UserService.validatePassword(
                        User.password,
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        User.salt,
                        password
                    );

                    if (isValid) {
                        return done(null, User);
                    }
                    return done(null, false);
                });
            }
        )
    );

    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([
                    ExtractJWT.fromAuthHeaderAsBearerToken(),
                    ExtractJWT.fromUrlQueryParameter("bearer"),
                ]),
                secretOrKey: KEYS.JWT_TOKEN_SECRET,
            },
            function (jwtPayload, cb) {
                return UserService.findUserByUuid(jwtPayload.uuid)
                    .then((user: User_info | null) => {
                        return cb(null, user);
                    })
                    .catch((err: any) => {
                        return cb(err);
                    });
            }
        )
    );

    app.use(passport.initialize());
    app.use(passport.session());
}

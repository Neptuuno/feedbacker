import {CaslAbilityFactory} from "./casl-ability.factory";
import {Action} from "./action.enum";
import {ForbiddenException} from "@nestjs/common";

export function checkAbility(
    factory: CaslAbilityFactory,
    userJwt: any,
    action: Action,
    target: any,
) {
    const ability = factory.createForUser(userJwt);
    if (!ability.can(action, target)) {
        throw new ForbiddenException('Access denied');
    }
}

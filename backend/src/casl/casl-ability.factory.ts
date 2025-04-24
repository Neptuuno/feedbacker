import { Injectable } from '@nestjs/common';
import {
  createMongoAbility,
  InferSubjects,
  AbilityBuilder,
  ExtractSubjectType,
  MongoQuery,
  MongoAbility,
} from '@casl/ability';
import { User } from '../users/entities/user.entity';
import { Action } from './action.enum';
import {Project} from "../projects/entities/project.entity";

type Subjects =
  | InferSubjects<
       typeof User | typeof Project
    >
  | 'all';
type PossibleAbilities = [Action, Subjects];
type Conditions = MongoQuery;

export type AppAbility = MongoAbility<PossibleAbilities, Conditions>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: any) {
    const { can, cannot, build } = new AbilityBuilder(
      createMongoAbility<PossibleAbilities, Conditions>,
    );
    const userId = user.sub;
    can(Action.Read, User, { id: userId});
    can(Action.Update, Project, { user: { id: userId } });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

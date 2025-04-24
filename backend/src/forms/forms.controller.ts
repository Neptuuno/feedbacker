import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Request} from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import {checkAbility} from "../casl/checkAbility";
import {Action} from "../casl/action.enum";
import {CaslAbilityFactory} from "../casl/casl-ability.factory";

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService,
              private readonly caslAbilityFactory: CaslAbilityFactory) {}

  @Post()
  create(@Body() createFormDto: CreateFormDto,
         @Request() req) {
    return this.formsService.create(createFormDto, req.user.sub);
  }

  @Get()
  findAll(@Request() req) {
    return this.formsService.findAllByUser(req.user.sub);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const form = await this.formsService.findOne(+id);
    checkAbility(this.caslAbilityFactory, req.user, Action.Read, form);
    return form;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formsService.update(+id, updateFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formsService.remove(+id);
  }
}

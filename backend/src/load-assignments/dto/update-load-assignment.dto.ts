import { PartialType } from "@nestjs/mapped-types";
import { CreateLoadAssignmentDto } from "./create-load-assignment.dto";

export class UpdateLoadAssignmentDto extends PartialType(CreateLoadAssignmentDto) {}

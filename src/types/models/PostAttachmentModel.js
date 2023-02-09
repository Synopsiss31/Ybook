"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostAttachmentModel = void 0;
const schema_1 = require("@tsed/schema");
const PostModel_1 = require("./PostModel");
const enums_1 = require("../enums");
class PostAttachmentModel {
}
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], PostAttachmentModel.prototype, "id", void 0);
__decorate([
    (0, schema_1.Property)(() => PostModel_1.PostModel),
    (0, schema_1.Required)(),
    __metadata("design:type", PostModel_1.PostModel)
], PostAttachmentModel.prototype, "post", void 0);
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], PostAttachmentModel.prototype, "postId", void 0);
__decorate([
    (0, schema_1.Required)(),
    (0, schema_1.Enum)(enums_1.DocumentType),
    __metadata("design:type", String)
], PostAttachmentModel.prototype, "type", void 0);
__decorate([
    (0, schema_1.Property)(String),
    (0, schema_1.Required)(),
    __metadata("design:type", String)
], PostAttachmentModel.prototype, "s3Key", void 0);
exports.PostAttachmentModel = PostAttachmentModel;

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
exports.PostModel = void 0;
const schema_1 = require("@tsed/schema");
const UserModel_1 = require("./UserModel");
const PostLikeModel_1 = require("./PostLikeModel");
const PostCommentModel_1 = require("./PostCommentModel");
const PostAttachmentModel_1 = require("./PostAttachmentModel");
class PostModel {
}
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], PostModel.prototype, "id", void 0);
__decorate([
    (0, schema_1.Property)(Date),
    (0, schema_1.Format)("date-time"),
    (0, schema_1.Required)(),
    __metadata("design:type", Date)
], PostModel.prototype, "createdAt", void 0);
__decorate([
    (0, schema_1.Property)(Date),
    (0, schema_1.Format)("date-time"),
    (0, schema_1.Required)(),
    __metadata("design:type", Date)
], PostModel.prototype, "updatedAt", void 0);
__decorate([
    (0, schema_1.Property)(String),
    (0, schema_1.Required)(),
    __metadata("design:type", String)
], PostModel.prototype, "htmlContent", void 0);
__decorate([
    (0, schema_1.Property)(() => UserModel_1.UserModel),
    (0, schema_1.Required)(),
    __metadata("design:type", UserModel_1.UserModel)
], PostModel.prototype, "user", void 0);
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], PostModel.prototype, "userId", void 0);
__decorate([
    (0, schema_1.CollectionOf)(() => PostLikeModel_1.PostLikeModel),
    (0, schema_1.Required)(),
    __metadata("design:type", Array)
], PostModel.prototype, "postLikes", void 0);
__decorate([
    (0, schema_1.CollectionOf)(() => PostCommentModel_1.PostCommentModel),
    (0, schema_1.Required)(),
    __metadata("design:type", Array)
], PostModel.prototype, "postComments", void 0);
__decorate([
    (0, schema_1.CollectionOf)(() => PostAttachmentModel_1.PostAttachmentModel),
    (0, schema_1.Required)(),
    __metadata("design:type", Array)
], PostModel.prototype, "postAttachments", void 0);
exports.PostModel = PostModel;

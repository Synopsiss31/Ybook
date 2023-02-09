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
exports.PostLikeModel = void 0;
const schema_1 = require("@tsed/schema");
const UserModel_1 = require("./UserModel");
const PostModel_1 = require("./PostModel");
class PostLikeModel {
}
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], PostLikeModel.prototype, "id", void 0);
__decorate([
    (0, schema_1.Property)(Date),
    (0, schema_1.Format)("date-time"),
    (0, schema_1.Required)(),
    __metadata("design:type", Date)
], PostLikeModel.prototype, "createdAt", void 0);
__decorate([
    (0, schema_1.Property)(Date),
    (0, schema_1.Format)("date-time"),
    (0, schema_1.Required)(),
    __metadata("design:type", Date)
], PostLikeModel.prototype, "updatedAt", void 0);
__decorate([
    (0, schema_1.Property)(() => UserModel_1.UserModel),
    (0, schema_1.Required)(),
    __metadata("design:type", UserModel_1.UserModel)
], PostLikeModel.prototype, "user", void 0);
__decorate([
    (0, schema_1.Property)(() => PostModel_1.PostModel),
    (0, schema_1.Required)(),
    __metadata("design:type", PostModel_1.PostModel)
], PostLikeModel.prototype, "post", void 0);
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], PostLikeModel.prototype, "userId", void 0);
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], PostLikeModel.prototype, "postId", void 0);
exports.PostLikeModel = PostLikeModel;

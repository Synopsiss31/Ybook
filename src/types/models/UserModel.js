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
exports.UserModel = void 0;
const schema_1 = require("@tsed/schema");
const PostModel_1 = require("./PostModel");
const PostLikeModel_1 = require("./PostLikeModel");
const PostCommentModel_1 = require("./PostCommentModel");
const FriendshipModel_1 = require("./FriendshipModel");
const ConversationModel_1 = require("./ConversationModel");
const ConversationMessageModel_1 = require("./ConversationMessageModel");
class UserModel {
}
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], UserModel.prototype, "id", void 0);
__decorate([
    (0, schema_1.Property)(Date),
    (0, schema_1.Format)("date-time"),
    (0, schema_1.Required)(),
    __metadata("design:type", Date)
], UserModel.prototype, "createdAt", void 0);
__decorate([
    (0, schema_1.Property)(Date),
    (0, schema_1.Format)("date-time"),
    (0, schema_1.Required)(),
    __metadata("design:type", Date)
], UserModel.prototype, "updatedAt", void 0);
__decorate([
    (0, schema_1.Property)(String),
    (0, schema_1.Required)(),
    __metadata("design:type", String)
], UserModel.prototype, "firstname", void 0);
__decorate([
    (0, schema_1.Property)(String),
    (0, schema_1.Required)(),
    __metadata("design:type", String)
], UserModel.prototype, "lastname", void 0);
__decorate([
    (0, schema_1.Property)(String),
    (0, schema_1.Required)(),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    (0, schema_1.Property)(String),
    (0, schema_1.Allow)(null),
    __metadata("design:type", String)
], UserModel.prototype, "avatarS3Key", void 0);
__decorate([
    (0, schema_1.Property)(String),
    (0, schema_1.Allow)(null),
    __metadata("design:type", String)
], UserModel.prototype, "coverPicS3Key", void 0);
__decorate([
    (0, schema_1.CollectionOf)(() => PostModel_1.PostModel),
    (0, schema_1.Required)(),
    __metadata("design:type", Array)
], UserModel.prototype, "posts", void 0);
__decorate([
    (0, schema_1.CollectionOf)(() => PostLikeModel_1.PostLikeModel),
    (0, schema_1.Required)(),
    __metadata("design:type", Array)
], UserModel.prototype, "postLikes", void 0);
__decorate([
    (0, schema_1.CollectionOf)(() => PostCommentModel_1.PostCommentModel),
    (0, schema_1.Required)(),
    __metadata("design:type", Array)
], UserModel.prototype, "postComment", void 0);
__decorate([
    (0, schema_1.CollectionOf)(() => FriendshipModel_1.FriendshipModel),
    (0, schema_1.Required)(),
    __metadata("design:type", Array)
], UserModel.prototype, "fromFriendship", void 0);
__decorate([
    (0, schema_1.CollectionOf)(() => FriendshipModel_1.FriendshipModel),
    (0, schema_1.Required)(),
    __metadata("design:type", Array)
], UserModel.prototype, "toFrienship", void 0);
__decorate([
    (0, schema_1.CollectionOf)(() => UserModel),
    (0, schema_1.Required)(),
    __metadata("design:type", Array)
], UserModel.prototype, "blockedUsers", void 0);
__decorate([
    (0, schema_1.CollectionOf)(() => UserModel),
    (0, schema_1.Required)(),
    __metadata("design:type", Array)
], UserModel.prototype, "blockedByUsers", void 0);
__decorate([
    (0, schema_1.CollectionOf)(() => ConversationModel_1.ConversationModel),
    (0, schema_1.Required)(),
    __metadata("design:type", Array)
], UserModel.prototype, "conversationsSent", void 0);
__decorate([
    (0, schema_1.CollectionOf)(() => ConversationModel_1.ConversationModel),
    (0, schema_1.Required)(),
    __metadata("design:type", Array)
], UserModel.prototype, "conversationsReceived", void 0);
__decorate([
    (0, schema_1.CollectionOf)(() => ConversationMessageModel_1.ConversationMessageModel),
    (0, schema_1.Required)(),
    __metadata("design:type", Array)
], UserModel.prototype, "conversationMessages", void 0);
__decorate([
    (0, schema_1.Property)(Object),
    (0, schema_1.Allow)(null),
    __metadata("design:type", Object)
], UserModel.prototype, "config", void 0);
exports.UserModel = UserModel;

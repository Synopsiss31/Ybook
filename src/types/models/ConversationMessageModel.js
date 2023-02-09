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
exports.ConversationMessageModel = void 0;
const schema_1 = require("@tsed/schema");
const ConversationModel_1 = require("./ConversationModel");
const UserModel_1 = require("./UserModel");
const NotificationModel_1 = require("./NotificationModel");
class ConversationMessageModel {
}
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], ConversationMessageModel.prototype, "id", void 0);
__decorate([
    (0, schema_1.Property)(Date),
    (0, schema_1.Format)("date-time"),
    (0, schema_1.Required)(),
    __metadata("design:type", Date)
], ConversationMessageModel.prototype, "createdAt", void 0);
__decorate([
    (0, schema_1.Property)(Date),
    (0, schema_1.Format)("date-time"),
    (0, schema_1.Required)(),
    __metadata("design:type", Date)
], ConversationMessageModel.prototype, "updatedAt", void 0);
__decorate([
    (0, schema_1.Property)(() => ConversationModel_1.ConversationModel),
    (0, schema_1.Allow)(null),
    __metadata("design:type", ConversationModel_1.ConversationModel)
], ConversationMessageModel.prototype, "conversation", void 0);
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Allow)(null),
    __metadata("design:type", Number)
], ConversationMessageModel.prototype, "conversationId", void 0);
__decorate([
    (0, schema_1.Property)(() => UserModel_1.UserModel),
    (0, schema_1.Required)(),
    __metadata("design:type", UserModel_1.UserModel)
], ConversationMessageModel.prototype, "from", void 0);
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], ConversationMessageModel.prototype, "userId", void 0);
__decorate([
    (0, schema_1.CollectionOf)(() => NotificationModel_1.NotificationModel),
    (0, schema_1.Required)(),
    __metadata("design:type", Array)
], ConversationMessageModel.prototype, "notification", void 0);
__decorate([
    (0, schema_1.Property)(String),
    (0, schema_1.Required)(),
    __metadata("design:type", String)
], ConversationMessageModel.prototype, "content", void 0);
exports.ConversationMessageModel = ConversationMessageModel;

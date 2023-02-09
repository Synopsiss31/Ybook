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
exports.NotificationModel = void 0;
const schema_1 = require("@tsed/schema");
const FriendshipModel_1 = require("./FriendshipModel");
const ConversationMessageModel_1 = require("./ConversationMessageModel");
class NotificationModel {
}
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], NotificationModel.prototype, "id", void 0);
__decorate([
    (0, schema_1.Property)(Date),
    (0, schema_1.Format)("date-time"),
    (0, schema_1.Required)(),
    __metadata("design:type", Date)
], NotificationModel.prototype, "createdAt", void 0);
__decorate([
    (0, schema_1.Property)(Date),
    (0, schema_1.Format)("date-time"),
    (0, schema_1.Required)(),
    __metadata("design:type", Date)
], NotificationModel.prototype, "updatedAt", void 0);
__decorate([
    (0, schema_1.Property)(Boolean),
    (0, schema_1.Required)(),
    __metadata("design:type", Boolean)
], NotificationModel.prototype, "read", void 0);
__decorate([
    (0, schema_1.Property)(() => FriendshipModel_1.FriendshipModel),
    (0, schema_1.Allow)(null),
    __metadata("design:type", FriendshipModel_1.FriendshipModel)
], NotificationModel.prototype, "friendship", void 0);
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Allow)(null),
    __metadata("design:type", Number)
], NotificationModel.prototype, "friendshipId", void 0);
__decorate([
    (0, schema_1.Property)(() => ConversationMessageModel_1.ConversationMessageModel),
    (0, schema_1.Allow)(null),
    __metadata("design:type", ConversationMessageModel_1.ConversationMessageModel)
], NotificationModel.prototype, "message", void 0);
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Allow)(null),
    __metadata("design:type", Number)
], NotificationModel.prototype, "conversationMessageId", void 0);
exports.NotificationModel = NotificationModel;

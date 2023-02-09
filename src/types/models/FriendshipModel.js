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
exports.FriendshipModel = void 0;
const schema_1 = require("@tsed/schema");
const UserModel_1 = require("./UserModel");
const enums_1 = require("../enums");
const NotificationModel_1 = require("./NotificationModel");
class FriendshipModel {
}
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], FriendshipModel.prototype, "id", void 0);
__decorate([
    (0, schema_1.Property)(Date),
    (0, schema_1.Format)("date-time"),
    (0, schema_1.Required)(),
    __metadata("design:type", Date)
], FriendshipModel.prototype, "createdAt", void 0);
__decorate([
    (0, schema_1.Property)(Date),
    (0, schema_1.Format)("date-time"),
    (0, schema_1.Required)(),
    __metadata("design:type", Date)
], FriendshipModel.prototype, "updatedAt", void 0);
__decorate([
    (0, schema_1.Property)(() => UserModel_1.UserModel),
    (0, schema_1.Required)(),
    __metadata("design:type", UserModel_1.UserModel)
], FriendshipModel.prototype, "from", void 0);
__decorate([
    (0, schema_1.Property)(() => UserModel_1.UserModel),
    (0, schema_1.Required)(),
    __metadata("design:type", UserModel_1.UserModel)
], FriendshipModel.prototype, "to", void 0);
__decorate([
    (0, schema_1.Required)(),
    (0, schema_1.Enum)(enums_1.FriendshipStatus),
    __metadata("design:type", String)
], FriendshipModel.prototype, "status", void 0);
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], FriendshipModel.prototype, "fromId", void 0);
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], FriendshipModel.prototype, "toId", void 0);
__decorate([
    (0, schema_1.CollectionOf)(() => NotificationModel_1.NotificationModel),
    (0, schema_1.Required)(),
    __metadata("design:type", Array)
], FriendshipModel.prototype, "notification", void 0);
exports.FriendshipModel = FriendshipModel;

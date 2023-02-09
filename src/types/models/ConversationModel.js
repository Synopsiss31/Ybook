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
exports.ConversationModel = void 0;
const schema_1 = require("@tsed/schema");
const UserModel_1 = require("./UserModel");
const ConversationMessageModel_1 = require("./ConversationMessageModel");
class ConversationModel {
}
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], ConversationModel.prototype, "id", void 0);
__decorate([
    (0, schema_1.Property)(Date),
    (0, schema_1.Format)("date-time"),
    (0, schema_1.Required)(),
    __metadata("design:type", Date)
], ConversationModel.prototype, "createdAt", void 0);
__decorate([
    (0, schema_1.Property)(Date),
    (0, schema_1.Format)("date-time"),
    (0, schema_1.Required)(),
    __metadata("design:type", Date)
], ConversationModel.prototype, "updatedAt", void 0);
__decorate([
    (0, schema_1.Property)(() => UserModel_1.UserModel),
    (0, schema_1.Required)(),
    __metadata("design:type", UserModel_1.UserModel)
], ConversationModel.prototype, "from", void 0);
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Required)(),
    __metadata("design:type", Number)
], ConversationModel.prototype, "fromId", void 0);
__decorate([
    (0, schema_1.Property)(() => UserModel_1.UserModel),
    (0, schema_1.Allow)(null),
    __metadata("design:type", UserModel_1.UserModel)
], ConversationModel.prototype, "to", void 0);
__decorate([
    (0, schema_1.Property)(Number),
    (0, schema_1.Integer)(),
    (0, schema_1.Allow)(null),
    __metadata("design:type", Number)
], ConversationModel.prototype, "toId", void 0);
__decorate([
    (0, schema_1.CollectionOf)(() => ConversationMessageModel_1.ConversationMessageModel),
    (0, schema_1.Required)(),
    __metadata("design:type", Array)
], ConversationModel.prototype, "messages", void 0);
exports.ConversationModel = ConversationModel;

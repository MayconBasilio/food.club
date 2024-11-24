"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessages = exports.OrderStatus = exports.UserType = void 0;
var UserType;
(function (UserType) {
    UserType["COMPANY"] = "company";
    UserType["RESTAURANT"] = "restaurant";
    UserType["EMPLOYEE"] = "employee";
})(UserType || (exports.UserType = UserType = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["CONFIRMED"] = "confirmed";
    OrderStatus["PREPARING"] = "preparing";
    OrderStatus["DELIVERED"] = "delivered";
    OrderStatus["CANCELLED"] = "cancelled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["EMPTY_EMAIL"] = "Email \u00E9 um campo obrigat\u00F3rio.";
    ErrorMessages["EMPTY_PASSWORD"] = "Senha \u00E9 um campo obrigat\u00F3rio.";
    ErrorMessages["EMPTY_NAME"] = "O nome \u00E9 um campo obrigat\u00F3rio.";
    ErrorMessages["EMPTY_CEP"] = "O CEP \u00E9 um campo obrigat\u00F3rio.";
    ErrorMessages["EMPTY_NUMBER"] = "O n\u00FAmero \u00E9 um campo obrigat\u00F3rio.";
    ErrorMessages["EMPTY_CPF"] = "CPF \u00E9 um campo obrigat\u00F3rio.";
    ErrorMessages["EMPTY_PRICE"] = "O pre\u00E7o \u00E9 um campo obrigat\u00F3rio.";
    ErrorMessages["EMPTY_DESCRIPTION"] = "A descri\u00E7\u00E3o \u00E9 um campo obrigat\u00F3rio.";
    ErrorMessages["EMPTY_CNPJ"] = "O CNPJ \u00E9 um campo obrigat\u00F3rio.";
    ErrorMessages["TOO_SHORT_NAME"] = "O nome precisa ter pelo menos 3 caracteres";
    ErrorMessages["EMAIL_NOT_VALID"] = "O email \u00E9 inv\u00E1lido.";
    ErrorMessages["INVALID_PASSWORD"] = "senha inv\u00E1lida. Deve ter pelo menos 6 caracteres.";
    ErrorMessages["INVALID_CEP"] = "CEP inv\u00E1lido. Deve ter 8 d\u00EDgitos.";
    ErrorMessages["INVALID_NUMBER"] = "Nu\u0301mero inv\u00E1lido. Deve ser maior que zero.";
    ErrorMessages["INVALID_CPF"] = "CPF inv\u00E1lido. Deve ter 11 d\u00EDgitos.";
    ErrorMessages["INVALID_DESCRIPTION"] = "Descri\u00E7\u00E3o inv\u00E1lida. Deve ter pelo menos 20 letras.";
    ErrorMessages["INVALID_PRICE"] = "Pre\u00E7o inv\u00E1lido. Deve ser maior que zero.";
    ErrorMessages["EMAIL_ALREADY_USED"] = "O email informado j\u00E1 est\u00E1 em uso.";
    ErrorMessages["INVALID_CNPJ"] = "CNPJ inv\u00E1lido. Deve ter 14 d\u00EDgitos.";
})(ErrorMessages || (exports.ErrorMessages = ErrorMessages = {}));
